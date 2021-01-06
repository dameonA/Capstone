var express = require('express')
var app = express()
const pgp = require('pg-promise')();
const {QueryFile} = require('pg-promise')
const fs = require('fs');
const path = require('path');
var bodyParser =require('body-parser');


// connect to the database uses environment variables or default to test environment
const db = pgp({
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  database: process.env.PG_DATABASE || "schedule",
  user: process.env.PG_RW_USER || "scheduler",
  password: process.env.APP_DB_RW_PASSWORD || "schedule"
});

// set default database file location, this will need to be changed in deployment!!
// TODO: FIX ME
const databaseDir = "../database/";

var exampleRouter = require('./routes/example')

// Set up json parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Example route usage
app.use(exampleRouter)

//Define request response in root URL (/)
app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
// Method to initialize the database if needed and then listen for api connections

const initAndRun = async () => {
  // waits this errors if users table doesnt exist
  await db.one("SELECT 'users'::regclass;")
  .catch(async(err)=>{
    let fileList = fs.readdirSync(databaseDir).filter(f=>f.endsWith(".sql"));
    for (let fileNum = 0;fileNum < fileList.length;fileNum++) {
      let file = fileList[fileNum];
      console.log(path.join(databaseDir,file));
      await db.none(new QueryFile(path.join(databaseDir,file), {minify: true})).catch(err=>console.log(err));
    }
  }) // If it exists or not fails or not, listen
  .finally(()=>{
    app.listen(8080, function () {
      console.log('App listening on port 8080!')
      })
  });
}

// initialize the database if needed and listen
initAndRun();
  //Launch listening server on port 8080


module.exports = app; // to allow importing for test