module.exports.Notifications = class Notifications {
    constructor(database) {
        this.db = database;
    }
    async postNotification (notification) {
        if ((notification.userid || notification.role_id) &&
        notification.type_notify &&
        notification.comment) {
                return await this.db.any('insert into notification(userid,role_id,type_notify,comment,is_read,archived) VALUES ($1,$2,$3,$4,false,false)',[notification.userid || null, notification.role_id || null, notification.type_notify,notification.comment]);
            }
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
            return await this.db.any('update notification set is_read=true where id = $1 RETURNING *;',[notificationId]);
        } catch(error) {
          //console.log(error);
          return [];
        }
    }
    async archive (notificationId) {
        try {
           return await this.db.any('update notification set is_read=true,archived=true where id = $1 RETURNING *;',[notificationId]);
        } catch(error) {
          //console.log(error);
            return [];
        }
    }
}
