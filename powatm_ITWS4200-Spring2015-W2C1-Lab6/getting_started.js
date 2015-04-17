//see package.json for dependencies/node modules
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

var urlencodedParser2 = bodyParser.urlencoded({ extended: false })
app.post('/getCSV',urlencodedParser2, function (req, res) { //get csv form data
  if (!req.body) return res.sendStatus(400)
  var data2=fs.readFileSync(__dirname + "/public/tweets.json");
  data2=JSON.parse(data2);
  var str = '';
  var line = '';
  var header=[];
  var min_i=0;
  var min=50; //never more than 50 keys
  for(var n=0;n<data2.length;n++){ //get shortest entry (fewest keys)
      var count=0;
    for(var index in data2[n]){
        count+=1;
    }
      if(count<min){
          min=count;
          min_i=n;
      }
  }
    
  for (var index in data2[min_i]) { //get indices of shortest to set as header
      if(index=='entities'){ //rename entities to hashtags
          line+='"hashtags",';
          header.push(index);
       }
       else if(index !='user'){ //user data is ignored
          line+='"'+index+'",';
          header.push(index);
      }
  }
  line.slice(0,line.Length-1);
  str += line + '\r\n';
        
   for(var i=0;i<data2.length;i++){
       var line = '';
        for(var index in data2[i]){
            if(header.indexOf(index)!=-1){//check that index is listed in the header
               var val=data2[i][index];
               if(typeof val=='string'||val instanceof String){
                  val=val.replace(',',''); //replace commas in the strings
                }
                if(index=='entities'){ //get hashtags (none of the other values)
                   for(var index2 in data2[i][index]){
                       if(index2=='hashtags'){
                          val=data2[i][index][index2]; //check if there are any hashtags
                          if(data2[i][index][index2][0]!=undefined && data2[i][index][index2][0]!=null){
                             val='';
                             var more=false;
                              for(var index3 in data2[i][index][index2]){
                                  if(more==true){
                                     val+=' & '+data2[i][index][index2][index3].text;
                                  }
                                  else{
                                     val+='"'+data2[i][index][index2][index3].text;//hashtags delimited by &
                                  }
                                  more=true;
                              }
                              val+='"';
                            }
                        }
                    }
                }
                else{
                    val='"'+val+'"';
                }
                line+=val+',';
            }
        }
        line.slice(0,line.Length-1);
        str += line + '\r\n';
    }
    fs.writeFile(__dirname +"/public/"+ req.body.filename+".csv",str,function (err){
        if (err) {
            return console.log(err);
        }
    });  

});

var server = app.listen(3000);
    
