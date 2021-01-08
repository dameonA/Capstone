module.exports.Conflicts = class Conflicts {
    constructor(database) {
        this.db = database;
    }//end of constructor

    async getConflict (conflictId) {
        try {
            return await this.db.one ('select * from conflict where conflict_id = $1', conflictId)
        }
        catch(error) {
            return undefined;
        }
        
    }

    async getConflicts () {
        try {
            return await this.db.any ('select * from conflict')
        }
        catch(error) {
            return undefined;
        }
    }

}//end of module