const dwellHours = 72;
const UserService = require('./users').Users;
const ScheduleService = require('./schedules').Schedule;
const ConflictService= require('./conflicts').Conflicts;
const NotificationService = require('./notifications').Notifications;
// The main submodule:
var add = require('date-fns/add')
const {isEqual, isAfter, isBefore} = require('date-fns')
const {dateRangeIntersects} = require('./utils')
module.exports.AutoSchedule = class AutoSchedule {
    constructor(database) {
        this.db=database;
        this.userService = new UserService(this.db);
        this.scheduleService = new ScheduleService(this.db)
        this.conflictService = new ConflictService(this.db)
        this.notificationService = new NotificationService(this.db);
    }
    async autoschedule2week(startDate) {
      try {
        //let schedule = (await this.scheduleService.getSchedule()).filter(se=>this.dateRangeIntersects(startDate,add(startDate,{days:14}),se.start_time,se.stop_time));
         let users = await this.userService.getUsers();
         //schedule = await Promise.all(schedule.filter(s=>!this.canSchedule(users.find(u=>u.user_id===s.user_id),s,[])));
         //console.log(schedule);
         let greenusers = users.filter(u=>u.usergroups === "Green")
         let blueusers = users.filter(u=>u.usergroups === "Blue")
         let staffusers = users.filter(u=>u.usergroups === "Day Staff")
         //let users = [greenusers,blueusers]; //greenusers.append(staffusers).append(blueusers)
         // TODO: REPLACE WITH POSITIONS SERVICE
         let positions = await this._getPositions();

             //TODO remove filter of null from this check
         let curDate = startDate;
         let days = 14;
         let format ="232"
         format = format.repeat(Math.ceil(days/format.split('').map(n=>Number.parseInt(n)).reduce((d,c)=>d+=c))).split('').map(n=>Number.parseInt(n));
         if (format.length % 2 !== 0)    
                format.push(format[0]);
         let schEntries = [];
             let dayCount = 0;
             // for each pattern entry, expect working days then off days
             for (let formatIdx = 0; formatIdx < format.length; formatIdx+=2) {
                // schedule for each position independently
                positions.forEach(pos => {
                    // iterate for each required minimum
                    for(let pos_count = 0; pos_count < pos.minimum; pos_count++) {
                        let schEntriesBlock=[];
                        // add start/end dates for each day in the pattern
                        for (let d = 0; d<format[formatIdx];d++) {                    
                            let startDate = add(curDate,{days:d+dayCount});
                            let endDate = add(startDate,{hours:12});
                            //if (!schedule.find(se=>isEqual(se.start_time,startDate) && isEqual(se.stop_time,endDate) && se.positions.position_id === pos.position_id))
                            schEntriesBlock.push({start_time:startDate,stop_time:endDate,position:pos,crew:formatIdx%2===0});
                        }
                        if (schEntriesBlock.length > 0) {
                            schEntries.push(schEntriesBlock)
                        }
                    }
                });
                dayCount+=format[formatIdx]+format[formatIdx+1]
            }
            // schedule dates per position are generated, now try to assign people to them
            try { 
                this.db.none('BEGIN;');
                let currentSchedule = (await this.scheduleService.getSchedule()).filter(se=>dateRangeIntersects(add(startDate,{days:-5}),startDate,se.start_time,se.stop_time));
                let conflicts = await this.conflictService.getConflicts();
                let sch= this.trySchedule(positions,users,schEntries,currentSchedule, conflicts);
               //console.log(sch);
               // create schedule object
               sch = sch.map(s=>{return {start_time:s.start_time,stop_time:s.stop_time,user_id:s.user_id,position_id:s.position.position_id}})
               // TODO replace with schedule handler
               // input all schedule entries. schedule handler should handle creating notifications for scheduling
               await Promise.all(sch.map(async(entry)=>{
                   this.db.none('INSERT INTO schedule (start_time,stop_time,position_id,user_id) VALUES ($1::timestamptz,$2::timestamptz,$3,$4)',[entry.start_time,entry.stop_time,entry.position_id,entry.user_id]);
               }));
               await this.db.none('COMMIT;');
               return;
            }catch(err) {
                await this.db.none('ROLLBACK');
                console.log(err);
            }
      } catch(error) {
          console.log(error)
      }
      return undefined;
    }
    canScheduleEach(user, scheduleEntries, existingSchedule, conflicts) {
        // can this user be assigned to every day in the block
        return scheduleEntries.every(s=>{
            //console.log(s);
            return this.canSchedule(user,s,existingSchedule,conflicts)});
    }
    canSchedule(user, scheduleEntry, existingSchedule, conflictArray) {
            let qualified = this.canUserFillRole(scheduleEntry.position,user);
            let existingUserSched = existingSchedule
                .filter(se=> 
                    se.user_id== user.user_id && 
                    dateRangeIntersects(scheduleEntry.start_time,scheduleEntry.stop_time,se.start_time,se.stop_time)
                );
            let conflicts = conflictArray//(await this.conflictService.getConflicts())
                .filter(c=>
                    c.user_id === user.user_id && 
                    dateRangeIntersects(scheduleEntry.start_time,scheduleEntry.stop_time,c.start_time,c.stop_time)
                );
            let userWorkedLessThan12 = 0
            let available = existingUserSched.length == 0 && conflicts.length === 0;

            // add logic for scheduled time already exists for user. - DONE
            // TODO get scheduled times from existing schedule - DONE
            // add logic for last sched % 24 hours == 0 || this sched -> last sched >= dwell
            // add check for conflicts
            return qualified && available;
    }

    trySchedule(positions,users,schEntries, scheduled, conflicts) {
        if (!scheduled)
            scheduled=[];

        let valid_users = users.filter(u=>this.canScheduleEach(u,schEntries[0],scheduled,conflicts));
        //console.log(users.map(u=>u.user_id),valid_users.map(u=>u.user_id));
        //console.log(schEntries[0][0].position.position_name)
        for (let idx=0;idx < valid_users.length; idx++) {
            let nextEntries = schEntries.slice(1);
            try {
                let cantScheduleEntries = nextEntries.filter(sche=>
                    this.canUserFillRole(sche[0].position, valid_users[idx]) &&
                    isEqual(sche[0].start_time,schEntries[0][0].start_time) &&  // if the scheduled entry time is the same as the current first entry
                    users.filter(u=>u.user_id !== valid_users[idx].user_id).every(u=>!this.canScheduleEach(u,sche,scheduled,conflicts))
                );// is nobody else able to fill the other role
                
                if (cantScheduleEntries.length > 0) {
                        console.log ("sole trained user: ",valid_users[idx].last_name,schEntries[1][0].position.position_name)
                        //console.log()
                        continue; // skip this user and move on to the next
                        }
                schEntries[0].forEach(entry=>scheduled.push({...entry,user_id:valid_users[idx].user_id}))
                //console.log("scheduled: ",schEntries[0])
                if (schEntries.length > 1) {
                    let cur_scheduled=[...scheduled]
                    return this.trySchedule(positions,users, nextEntries, cur_scheduled, conflicts);
                }else{
                    return scheduled;
                }
            } catch(error) {
                console.log(error)
            }
        }
        //console.log("failed to schedule")
        //console.log(schEntries)
        throw("Cannot find supported schedule during autoschedule of "+positions.find(p=>p.position_id===schEntries[0][0].position_id).position_name+" :: "+schEntries.length);
    }
    canUserFillRole(pos, user) {
        //let pos = scheduleEntry.position
        //console.log(pos.qualifications)
        let user_certs = (user && user.certifications)?user.certifications.map(c=>c.cert_id):undefined;
        let user_quals = (user && user.qualifications)?user.qualifications.map(q=>q.qual_id):undefined;
        let pos_certs = (pos!=null && pos.certifications)?pos.certifications.map(c=>c.cert_id):undefined;
        let pos_quals = (pos!=null)?pos.qualifications.map(q=>q.qual_id):undefined;
        let qualified = pos && 
            (!pos_quals || (user_quals && pos_quals.filter(q=>!user_quals.includes(q)).length===0)) &&  
            (!pos_certs || (user_certs && pos_certs.filter(q=>!user_certs.includes(q)).length===0));
        return qualified;
    }

    async _getPositions() {
        return (await this.db.any(`
            SELECT json_build_object( 
                'position_id', position_id,
                'position_name', position_name,
                'minimum', minimum,
                'qualifications',
                    (SELECT json_agg(position_qualifications) FROM position_qualifications where position_qualifications.position_id = positions.position_id),
                'certifications',
                    (SELECT json_agg(position_certifications) FROM position_certifications where position_certifications.position_id = positions.position_id)
                ) json
             FROM positions  WHERE minimum > 0;`)).map(e=>e.json).filter(p=>p.qualifications !== null);
    }
    async autoschedule1(scheduleEntry) {
        let positions = await this._getPositions();
        let users = await this.userService.getUsers();

        let user = users.find(user=>user.user_id===scheduleEntry.user_id);
        if (user) {
            let greenusers = users.filter(u=>u.usergroups === "Green")
            let blueusers = users.filter(u=>u.usergroups === "Blue")
            let staffusers = users.filter(u=>u.usergroups === "Day Staff")
            //users = users.filter(user=>user.user_id!==scheduleEntry.user_id);
            if (user.usergroup === 1) 
                users = blueusers.concat(staffusers).concat(greenusers);
            else if (user.usergroup === 2) 
                users = greenusers.concat(staffusers).concat(blueusers)
        }
        let current_schedule = (await this.scheduleService.getSchedule()).filter(se=>dateRangeIntersects(add(scheduleEntry.start_time,{days:-5}),add(scheduleEntry.start_time,{days:5}),se.start_time,se.stop_time));
        current_schedule=current_schedule.filter(s=>s.schedule_id !== scheduleEntry.schedule_id);
        let conflicts = await this.conflictService.getConflicts();
        try {
            //console.log(positions.find(p=>p.position_id===scheduleEntry.position_id),users.filter(u=>this.canUserFillRole(positions.find(p=>p.position_id===scheduleEntry.position_id),u)).length)
            let id = scheduleEntry.schedule_id;
            let entry = this.trySchedule(positions,users,[[scheduleEntry]],current_schedule,conflicts);
            if (entry) {
                entry=entry.find(s=>s.schedule_id===id);
                //console.log(entry);
                let u = await this.db.one('UPDATE schedule SET (start_time,stop_time,position_id,user_id) = ($1::timestamptz,$2::timestamptz,$3,$4) WHERE schedule_id = $5 RETURNING user_id',[entry.start_time,entry.stop_time,entry.position_id,entry.user_id,scheduleEntry.schedule_id]).user_id;
                return u;
            }
        }catch(err) {
            console.log(err);
        }
        return -1;
    }
    async resolve() {
        let positions = await this._getPositions();
        let conflicts = await this.conflictService.getConflicts();
        let schedule =  (await this.scheduleService.getSchedule());
        let scheduleEntries = schedule.filter(s=>conflicts.some(c=>s.user_id===c.user_id && dateRangeIntersects(s.start_time,s.stop_time,c.start_time,c.stop_time)));
        scheduleEntries=scheduleEntries.map(entry=>{return {...entry,position:positions.find(p=>entry.position_id===p.position_id)}})
        //console.log(scheduleEntries)
        await Promise.all(scheduleEntries.map(async entry=>{
            let oldu = entry.user_id;
            let u = await this.autoschedule1(entry);
            if (u!=-1) {
                try {
                this.notificationService.postNotification({role_id:null,userid:u,type_notify:1,comment:"Schedule was updated for "+entry.start_time});
                this.notificationService.postNotification({role_id:null,userid:oldu,type_notify:1,comment:"Schedule was updated for "+entry.start_time});
                }catch(error) {
                    console.log(error,"could not notify")
                }
                return true;
            }
            return false;
        }));
        return scheduleEntries.every(v=>v===true);
    }
}
