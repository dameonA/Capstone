module.exports.Conflicts = class Conflicts {
    constructor(database) {
        this.db = database;
    }//end of constructor

    async getConflicts () {
        try {
            return await this.db.any ('select * from conflict')
        }
        catch(error) {
            return undefined;
        }
    }

    async getConflict (conflictTypeId) {
        try {
            return await this.db.any('select * from conflict where conflict_type_id = $1', conflictTypeId)
        }
        catch(error) {
            return undefined;
        }
    }

    async getConflictTypes () {
        try {
            return await this.db.any('select * from conflict_type')
        }
        catch(error) {
            return undefined;
        }
    }

    async postConflicts (conflict) {
        let conflictTypeId = conflict.conflict_type_id;
        let startTime = conflict.start_time;
        let stopTime = conflict.stop_time;
        let conflictComment = conflict.comment;
        let scheduleId = conflict.schedule_id;
        try {
            // return await this.db.any ('insert into conflict (conflict_type_id, start_time, stop_time, comment) values ($1, $2, $3, $4)', [conflictTypeId, startTime, stopTime, conflictComment])

            return await this.db.any ('insert into conflict (conflict_type_id, start_time, stop_time, comment, schedule_id) values ($1, $2, $3, $4, $5)', [conflictTypeId, startTime, stopTime, conflictComment, scheduleId])
        }
        catch(error) {
            console.log(error);
            return {};
        }
    }

}//end of module