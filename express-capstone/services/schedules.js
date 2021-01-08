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


    

    

}