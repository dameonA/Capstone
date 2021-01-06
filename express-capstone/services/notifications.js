module.exports.Notifications = class Notifications {
    constructor(database) {
        this.db = database;
    }
    async getNotifications (userId, user_role) {
        try {
            return await this.db.any('select * from notification where userid = $1 or role_id = $2;',[userId,user_role]);
        } catch(error) {
          //console.log(error);
         
        }
        return [];
    }
    
}
