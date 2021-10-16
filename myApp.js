var express = require('express');
var app = express();
var bodyParser = require("body-parser");

//here, we are mounting bodyParser for parsing post requests to view contents
app.use(bodyParser.urlencoded({ extended: false }));
//extended is a configuration option that tells body-parser which parsing needs to be used.
// When extended=false it uses the classic encoding querystring library. When extended=true it 
// uses qs library for parsing. When using extended=false, values can be only strings or arrays.
app.use(bodyParser.json());


console.log("Hello World");

app.use('/public', express.static(__dirname + '/public'));
//here, we mount our path
app.use(function myLogger(req, res, next) {
  var logInput = req.method + " " + req.path + " - " + req.ip;
  //the variable above gets the request's method used (post or get), the request's path they want
  //  and finally the requester's IP address. Below, we log it to console.
  console.log(logInput);
  next();
});


//here we chaining some middleware together
app.get(
  '/now', 
  (req, res, next) => {
  req.time = new Date().toString();
  next();
  },
  (req, res) => {
    res.json({
      'time': req.time
    });
  }
);

//here we define some route parameters for the route handler
app.get('/:word/echo', (req, res) => {
    res.json({
        'echo': req.params.word
    })
});

app.get('/', function (req, res) {
  let absolutePath = __dirname;
  res.sendFile(absolutePath + '/views/index.html');
});

app.get('/json', function (req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase")
     response = response.toUpperCase();
  res.json({
    "message": response
  });
});


//here we are exploring query strings
//this assumes a query of "?first=firstname&last=lastname" is requested by user at the end of the name route
app.get('/name', (req, res) => {
    var firstname = req.query.first;
    var lastname = req.query.last;
    res.json({
        "name": `${firstname}` + " " + `${lastname}`
    });
});

console.log(req.body);

























 module.exports = app;