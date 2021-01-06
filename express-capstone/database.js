const pgp = require('pg-promise')();
const fs = require('fs');
const path = require('path');
const {QueryFile} = require('pg-promise')


// set default database file location, this will need to be changed in deployment!!
// TODO: FIX ME
const databaseDir = "../database/";

// connect to the database uses environment variables or default to test environment
const db = pgp({
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT || 5432,
    database: process.env.PG_DATABASE || "schedule",
    user: process.env.PG_RW_USER || "scheduler",
    password: process.env.APP_DB_RW_PASSWORD || "schedule"
  });

// initialize the DB using sql files
const initDB = async() => {
    let fileList = fs.readdirSync(databaseDir).filter(f=>f.endsWith(".sql"));
      for (let fileNum = 0;fileNum < fileList.length;fileNum++) {
        let file = fileList[fileNum];
        console.log(path.join(databaseDir,file));
        await db.none(new QueryFile(path.join(databaseDir,file), {minify: true})).catch(err=>console.log(err));
      }
  }

module.exports = {db, initDB};