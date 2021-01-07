
module.exports.Users = class Users {
    constructor(database) {
        this.db=database;
    }
    async getUser (userId) {
      try {
          return await this.db.one('select * from users where user_id = $1',userId)
      } catch(error) {
        //console.log(error);
        return undefined;
      }
    }
}
