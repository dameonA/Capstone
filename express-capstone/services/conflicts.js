module.exports.Conflicts = class Conflicts {
    constructor(database) {
        this.db = database;
    }//end of constructor

    // async getConflict (conflictId) {
    //     try {
    //         return await this.db.one ('select * from conflict where conflict_id = $1', conflictId)
    //     }
    //     catch(error) {
    //         return undefined;
    //     }
        
    // }

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

    async postConflicts (conflict) {
        try {
            return await this.db.any ('insert into conflict (conflict_type_id, start_time, stop_time, comment, schedule_id) values ($1, $2, $3, $4, $5)', [conflict.conflict_type_id, conflict.start_time, conflict.stop_time, conflict.comment, conflict.schedule_id])
        }
        catch(error) {
            console.log(error);
            return undefined;
        }
    }

}//end of module