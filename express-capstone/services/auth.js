
module.exports.Auth = class Auth {
    constructor(database) {
        this.db=database;
    }
    async getLoginData (username) {
      try {
          return await this.db.one('SELECT * from user_auth where username = $1',username)
      } catch(error) {
        console.log(error);
        return undefined;
      }
    }
}
