module.exports.Schedule = class Schedule {
    constructor(database) {
        this.db = database;
    }

    async getSchedule () {
        try {
            return await this.db.any ('SELECT * FROM schedule')
        }
        catch(error) {
            return undefined;
        }
    }

    async getPositions () {
        try{
            return await this.db.any('SELECT * FROM positions')
        }
        catch(error) {
            return undefined;
        }
    }

    async clearSchedule() {
        return await this.db.none('DELETE FROM schedule');
    }
    

    

}