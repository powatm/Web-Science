var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    express = require('express');

var app = express();
app.get('/',function(req,res){ //get first html file with form
   res.sendFile(__dirname + '/quiz1.html');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getGreeting', urlencodedParser, function (req, res) { //get data from form
  if (!req.body) return res.sendStatus(400)
  res.send('Hi ' + req.body.name + '!');
});

var server = app.listen(3000);
    
