var express = require('express')
var app = express()
var bodyParser =require('body-parser');

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
  
//Launch listening server on port 8080
app.listen(8080, function () {
console.log('App listening on port 8080!')
})

module.exports = app; // to allow importing for test