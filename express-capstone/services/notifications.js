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
    async markRead (notificationId) {
        try {
            return await this.db.any('update notification set is_read=true where id = $1;',[notificationId]);
        } catch(error) {
          //console.log(error);
          return [];
        }
    }
    async archive (notificationId) {
        try {
           return await this.db.any('update notification set is_read=true,archived=true where id = $1;',[notificationId]);
        } catch(error) {
          //console.log(error);
            return [];
        }
    }
}
