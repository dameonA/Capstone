var express = require('express')
var app = express()
var bodyParser =require('body-parser');
const cors = require("cors")
let appStatus = {status:"loading",message:""};
const listen_port = 8080;

const Database = require('./services/database.js').database;
const db = new Database();
try {
db.connectdb();
appStatus={status:"connected",message:""}
}catch(error) {
  appStatus={status:"error",message:error}
}

const NotificationService = new (require('./services/notifications').Notifications)(db.db);
const UserService = new (require('./services/users').Users)(db.db);
const ConflictService = new (require('./services/conflicts').Conflicts)(db.db);
const ScheduleService = new (require('./services/schedules').Schedule)(db.db);
const AutoScheduleService = new (require('./services/autoschedule').AutoSchedule)(db.db);
const AuthService = new (require('./services/auth').Auth)(db.db);
//setup for cors
app.use(cors());
app.options('*', cors());

//var exampleRouter = require('./routes/example')
var userRouter = require('./routes/users')(UserService,NotificationService);
var notificationRouter = require('./routes/notifications')(NotificationService);
var conflictRouter = require('./routes/conflicts')(ConflictService,ScheduleService,NotificationService);
var scheduleRouter = require('./routes/schedules')(ScheduleService,AutoScheduleService);
var authRouter = require('./routes/auth')(UserService,AuthService)

// Set up json parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up routes using routers
//app.use(exampleRouter)
app.use('/users', userRouter)
app.use('/notifications', notificationRouter)
app.use('/conflicts', conflictRouter)
app.use('/schedule', scheduleRouter)
app.use('/auth',authRouter)

app.get('/status', function (req, res) {
  res.send(appStatus);

})
app.listen(listen_port, function () {
  console.log('App listening on port '+listen_port+"!")
})


module.exports = app; // to allow importing for test