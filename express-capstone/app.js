var express = require('express')
var app = express()

var bodyParser =require('body-parser');

const listen_port = 3001;

const {db,initDB} = require('./database.js');

//var exampleRouter = require('./routes/example')
var userRouter = require('./routes/user')

// Set up json parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up routes using routers
//app.use(exampleRouter)
app.use('/user', userRouter(db))

//Define request response in root URL (/)
app.get('/', function (req, res) {
    res.send('Hello World')
  })

// Method to initialize the database if needed 
app.get('/initdb',async(req,res)=>{
  initDB().then(()=>res.send("success"),(err)=>res.send(err));
})

app.listen(listen_port, function () {
  console.log('App listening on port '+listen_port+"!")
})


module.exports = app; // to allow importing for test