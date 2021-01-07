const pgp = require('pg-promise')();
const fs = require('fs');
const path = require('path');
const {QueryFile} = require('pg-promise')




// connect to the database uses environment variables or default to test environment
module.exports.database = class Database {
  contructor() {
  }

  connectdb () {
    this.db=pgp({
      host: process.env.PGHOST || "localhost",
      port: process.env.PGPORT || 5432,
      database: process.env.PG_DATABASE || "schedule",
      user: process.env.PG_RW_USER || "scheduler",
      password: process.env.APP_DB_RW_PASSWORD || "schedule"
    });
  }
  async initDB (databaseDir) {
    console.log("reading files from ",databaseDir);
    let fileList = fs.readdirSync(databaseDir).filter(f=>f.endsWith(".sql"));
    console.log("found files: ",fileList);
    for (let fileNum = 0;fileNum < fileList.length;fileNum++) {
      let file = fileList[fileNum];
      console.log(path.join(databaseDir,file));
      await this.db.any(new QueryFile(path.join(databaseDir,file), {minify: true})).catch(err=>console.log(err));
    }
  }
}
