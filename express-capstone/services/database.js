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
      port: process.env.PGPORT || 8000,
      database: process.env.PG_DATABASE || "schedule",
      user: process.env.PG_RW_USER || "scheduler",
      password: process.env.APP_DB_RW_PASSWORD || "schedule"
    });
  }
}
