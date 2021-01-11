const dwellHours = 72;
const UserService = require('./users').Users;
// The main submodule:
var add = require('date-fns/add')
var isEqual = require('date-fns/isEqual')
module.exports.AutoSchedule = class AutoSchedule {
    constructor(database) {
        this.db=database;
        this.userService = new UserService(this.db);
    }
    async autoschedule2week(startDate) {
      try {
         let users = await this.userService.getUsers();
         // TODO: REPLACE WITH POSITIONS SERVICE
         let positions = (await this.db.any(`
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
                            schEntriesBlock.push({start_time:startDate,stop_time:endDate,position:pos});
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
               let sch= this.trySchedule(positions,users,schEntries,[]);
               // create schedule object
               sch = sch.map(s=>{return {start_time:s.start_time,stop_time:s.stop_time,user_id:s.user_id,position_id:s.position.position_id}})
               // TODO replace with schedule handler
               // input all schedule entries. schedule handler should handle creating notifications for scheduling
               await Promise.all(sch.map(async(entry)=>{
                   //console.log(entry);
                   this.db.none('INSERT INTO schedule (start_time,stop_time,position_id,user_id) VALUES ($1::timestamptz,$2::timestamptz,$3,$4)',[entry.start_time,entry.stop_time,entry.position_id,entry.user_id]);
               }));
            }catch(err) {
                console.log(err);
            }
      } catch(error) {
          console.log(error)
        return undefined;
      }
    }
    canScheduleEach(user, scheduleEntries, existingSchedule, logging) {
        // can this user be assigned to every day in the block
        return scheduleEntries.every(e=>this.canSchedule(user,e,existingSchedule,logging));
    }
    canSchedule(user, scheduleEntry, existingSchedule,logging) {
            let qualified = this.canUserFillRole(scheduleEntry.position,user);
            let existingUserSched = existingSchedule.filter(se=>isEqual(se.start_time,scheduleEntry.start_time) && se.user_id== user.user_id);
            let available = existingUserSched.length == 0;
            // add logic for scheduled time already exists for user. 
            // TODO get scheduled times from existing schedule
            // add logic for last sched % 24 hours == 0 || this sched -> last sched >= dwell
            // add check for conflicts
            return qualified && available;
    }

    trySchedule(positions,users,schEntries, scheduled) {
        if (!scheduled)
            scheduled=[];

        let valid_users = users.filter(u=>this.canScheduleEach(u,schEntries[0],scheduled));

        for (let idx=0;idx < valid_users.length; idx++) {
            let nextEntries = schEntries.slice(1);
            try {
                let cantScheduleEntries = nextEntries.filter(sche=>this.canUserFillRole(sche[0].position, valid_users[idx]) &&
                isEqual(sche[0].start_time,schEntries[0][0].start_time) &&  // if the scheduled entry time is the same as the current first entry
                users.filter(u=>u.user_id !== valid_users[idx].user_id).every(u=>!this.canSchedule(u,sche,scheduled)));// is nobody else able to fill the other role
                if (cantScheduleEntries > 0) {
                        //console.log ("sole trained user: ",valid_users[idx],schEntries[1][0].position.position_name)
                        continue; // skip this user and move on to the next
                        }
                schEntries[0].forEach(entry=>scheduled.push({...entry,user_id:valid_users[idx].user_id}))
                if (schEntries.length > 1) {
                    let cur_scheduled=[...scheduled]
                    return this.trySchedule(positions,users, nextEntries, cur_scheduled);
                }else{
                    return scheduled;
                }
            } catch(error) {
                console.log(error)
            }
        }
        throw("Cannot find supported schedule during autoschedule");
    }
    canUserFillRole(pos, user) {
        //let pos = scheduleEntry.position
        let user_certs = (user && user.certifications)?user.certifications.map(c=>c.cert_id):undefined;
        let user_quals = (user && user.qualifications)?user.qualifications.map(q=>q.qual_id):undefined;
        let pos_certs = (pos!=null && pos.certifications)?pos.certifications.map(c=>c.cert_id):undefined;
        let pos_quals = (pos!=null)?pos.qualifications.map(q=>q.qual_id):undefined;
        let qualified = pos && 
            (!pos_quals || (user_quals && pos_quals.filter(q=>!user_quals.includes(q)).length===0)) &&  
            (!pos_certs || (user_certs && pos_certs.filter(q=>!user_certs.includes(q)).length===0));
        //console.log(user_quals,pos_quals)
            return qualified;
    }
}
