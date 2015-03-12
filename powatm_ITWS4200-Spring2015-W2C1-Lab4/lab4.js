$(document).ready(function () {
    $.get("tweets.json", function (result) {
        var hash_count=0;
        var t_count=0;
        var tweet_arr=[];
        var hash_arr=[];
    for (var i = 0; i < result.length; i++) {
        t_count+=1;
        tweet_arr.push(result[i].text); //push all tweets into array
        if(t_count<=5){ //display first five
            var t1= "<li id= 't"+i+"'>"+result[i].text+"</li>";
            $("#tweets").append(t1);
        }
        
        for(var x=0;x<result[i].entities.hashtags.length;x++){
            hash_count+=1
            hash_arr.push(result[i].entities.hashtags[x].text);
            if(hash_count<=5){
                var trend1="<li id= 'tr"+(hash_count-1)+"'>#"+result[i].entities.hashtags[x].text+"</li>";
                $("#trends").append(trend1);
                var tr_id= document.getElementById("tr"+(hash_count-1));
                
            }
        }
    }
        
        
    //tweet ticker

    var next_tweet=1;
    var next_count=1;
var timer1 = setInterval( loopTweets, 2000);
function loopTweets() {
    for(var index=0;index<5;index++){
            $("#t"+index).html(tweet_arr[next_tweet]);
            next_tweet++;
            if(next_tweet==tweet_arr.length-1){
                next_tweet=0;
            }
        }
        $("#t4").css("opacity",".5");
        next_tweet=next_count+1;
        next_count+=1;
        if(next_tweet==tweet_arr.length){
                next_tweet=0;
        }
        if(next_count==tweet_arr.length){
            next_count=0;
        }
    $("#t4").fadeTo("slow",1);
    }; 
    $("ul#tweets li").hover( function () {
        window.clearInterval(timer1)
    },
    function () {
        timer1 = setInterval(loopTweets, 2000);
    } );
        
        
        
    //trend ticker
    var next_trend=1;
    var next_c=1;
    var timer2 = setInterval( loopTrends, 2200);
function loopTrends() {
        for(var index=0;index<5;index++){
            $("#tr"+index).html("#"+hash_arr[next_trend]);
            next_trend++;
            if(next_trend==hash_arr.length){
                next_trend=0;
            }
        }
        $("#tr4").css("opacity",".5");
        next_trend=next_c+1;
        next_c+=1;
        if(next_trend==hash_arr.length){
            next_trend=0;
        }
        if(next_c==hash_arr.length){
            next_c=0;
        }
        $("#tr4").fadeTo("slow",1);
    };
        
    $("ul#trends li").hover( function () {
        window.clearInterval(timer2)
    },
    function () {
        timer2 = setInterval(loopTrends, 2200);
    } );
        
});
});