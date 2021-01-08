const dwellHours = 72;
const UserService = require('./users').Users;
// The main submodule:
var add = require('date-fns/add')

module.exports.AutoSchedule = class AutoSchedule {
    constructor(database) {
        this.db=database;
        this.userService = new UserService(this.db);
    }
    async autoschedule2week(startDate) {
      try {
         let users = await this.userService.getUsers();
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
             FROM positions  WHERE minimum > 0;`)).map(e=>e.json);
         let curDate = startDate;
         let endDate = add(startDate,{days:14});
         let format = [2,3,2,2,3,2]
         let schedule = [];
             let formatIdx = 0;
             let schEntries = [];
             let dayCount = 0;
             for (let formatIdx = 0; formatIdx < format.length; formatIdx+=2) {
                positions.forEach(pos => {
                        for(let pos_count = 0; pos_count < pos.minimum; pos_count++) {
                            let schEntriesBlock=[];
                            for (let d = 0; d<format[formatIdx];d++) {                            
                                schEntriesBlock.push({start_time:add(curDate,{days:d+dayCount}),stop_time:add(curDate,{days:d+dayCount,hours:12}),position_id:pos.position_id});
                            }
                            if (schEntriesBlock.length > 0) {
                                schEntries.push(schEntriesBlock)
                            }
                        }
                    });
                    dayCount+=format[formatIdx]+format[formatIdx+1]
            }
            //console.log(schEntries);
            console.log(this.trySchedule(positions,users,schEntries,[]));
         
      } catch(error) {
          console.log(error)
        return undefined;
      }
    }
    canScheduleEach(positions, user, scheduleEntries, existingSchedule) {
        return scheduleEntries.filter(e=>this.canSchedule(positions, user,e,existingSchedule)).length == scheduleEntries.length;
    }
    canSchedule(positions, user, scheduleEntry, existingSchedule) {
        console.log(positions)
            let pos = positions.find(p=>p.position_id==scheduleEntry.position_id);
            let user_certs = (user && user.certifications)?user.certifications.map(c=>c.cert_id):undefined;
            let user_quals = (user && user.qualifications)?user.qualifications.map(q=>q.qual_id):undefined;
            let pos_certs = (pos!=null && pos.certifications)?pos.certifications.map(c=>c.cert_id):undefined;
            let pos_quals = (pos!=null)?pos.qualifications.map(q=>q.qual_id):undefined;
            let qualified = pos && 
                (pos_quals && user_quals && pos_quals.filter(q=>!user_quals.includes(q)).length===0) &&  
                (pos_certs && user_certs && pos_certs.filter(q=>!user_certs.includes(q)).length===0);
            let available = existingSchedule.filter(se=>se.start_time != scheduleEntry.start_time).find(se=>se.user_id == user.user_id) == undefined;
            // add logic for scheduled time already exists for user
            // add logic for last sched % 24 hours == 0 || this sched -> last sched >= dwell
            // add check for conflicts
            return qualified && available;
    }

    trySchedule(positions,users,schEntries, scheduled) {
        if (!scheduled)
            scheduled=[];
        let valid_user = users.find(u=>this.canScheduleEach(positions,u,schEntries[0],scheduled));
        if (valid_user) {
            schEntries[0].forEach(entry=>scheduled.push({...entry,user_id:valid_user.user_id}))
            if (schEntries.length > 1) {
                let cur_scheduled=[...scheduled]
                return this.trySchedule(positions,users, schEntries.slice(1), cur_scheduled);
            }else{
                return scheduled;
            }
        }
        throw("Cannot find supported schedule during autoschedule");
    }
}
