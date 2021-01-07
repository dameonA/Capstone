var express = require('express')
var app = express()
var bodyParser =require('body-parser');

const listen_port = 3001;

const Database = require('./services/database.js').database;
const db = new Database();
db.connectdb();


const NotificationService = new (require('./services/notifications').Notifications)(db.db);
const UserService = new (require('./services/users').Users)(db.db);

//var exampleRouter = require('./routes/example')
var userRouter = require('./routes/users')(UserService,NotificationService);
var notificationRouter = require('./routes/notifications')(NotificationService);

// Set up json parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up routes using routers
//app.use(exampleRouter)
app.use('/users', userRouter)
app.use('/notifications', notificationRouter)

// Method to initialize the database if needed 
app.get('/initdb',async(req,res)=>{
  db.initDB("../database/").then(()=>res.send("success")).catch((err)=>res.sendStatus(500).send());
})

app.listen(listen_port, function () {
  console.log('App listening on port '+listen_port+"!")
})


module.exports = app; // to allow importing for test