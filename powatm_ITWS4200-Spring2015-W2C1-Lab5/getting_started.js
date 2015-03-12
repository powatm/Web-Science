//npm install body-parser
//npm install express
//npm install twitter

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    Twitter = require('twitter'),
    bodyParser = require('body-parser'),
    express = require('express');

var client = new Twitter({
    consumer_key: 'ToqtnsKvWB2XVWaLs83ZXCOCt',
    consumer_secret: 'JNJfUbIMFk1QZYd8IgZvlklmmOEvbtv1nVXr5MZFswCTYz4Jbh',
    access_token_key: '3064043583-wSgJ03JiNFoH8bZzqBmRjJLWrdFW2wzLwx3lMYZ',
    access_token_secret: 'JeuV499qJuEUdM1CQI6UI1VdpluW01h3uTnav5HsXHjBm'
});

var app = express();
app.get('/',function(req,res){ //get first html file with form
   res.sendFile(__dirname + '/views/lab5.html');
});
app.use(express.static(__dirname + '/public')); //set static folder to /public

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/getNum', urlencodedParser, function (req, res) { //get data from form
  if (!req.body) return res.sendStatus(400)
  console.log('Num requested:' + req.body.numTweets); 
  client.get('statuses/user_timeline', {screen_name:"whatstrending", count:req.body.numTweets}, function(error, tweets, response){
    if(error) throw error;
    fs.writeFile(__dirname + "/public/tweets.json", JSON.stringify(tweets) , function (err)     {
        if (err) return console.log(err);
    });      
  });
});

var server = app.listen(3000);
    
