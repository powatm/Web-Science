function get_location() {
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(get_coord, display_err);
    } else {
       $("#alerts").append("<div class='alert alert-danger' role='alert'>Warning! Geolocation not supported in this browser</div>");
    }
};

function get_coord(position) {
  var temperature=0;
  var lat1 = position.coords.latitude;
  var long1 = position.coords.longitude;
                                
  var url = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat1+ "&lon="+ long1+ "&cnt=1&units=imperial";
 $.getJSON(url,function(result){
     $("#loc").append(result.name);
     $("#temp").append('<img src="http://openweathermap.org/img/w/'+result.weather[0].icon+'.png" class="img-responsive" alt="Responsive image">');
     $("#temp").append(result.main.temp+"°F with " +result.weather[0].description);
     $("#add_info").append("<tbody><tr><td>Wind Speed</td><td>"+result.wind.speed+"mph </td></tr><tr><td>Humidity</td><td>"+result.main.humidity+"% </td></tr><tr><td>Pressure</td><td>"+result.main.pressure+"psi</td></tr></tbody>");
    });
      var options = {
        zoom: 10,
          center: new google.maps.LatLng(lat1, long1),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),options);
        var wxoverlay=new WXTiles();
        wxoverlay.addToMap(map);
        wxoverlay.addColorBar("big","horiz");

        document.getElementById("tSelect").appendChild(wxoverlay.getTSelect());
        document.getElementById("wxSelect").appendChild(wxoverlay.getVSelect());
};

function display_err(err){
    if(err.code==1){
        $("#alerts").append("<div class='alert alert-info' role='alert'> Permission Denied</div>");
    }
    else if(err.code==2){
        $("#alerts").append("<div class='alert alert-info' role='alert'> Position Unavailable</div>");
    }
    else if(err.code==3){
        $("#alerts").append("<div class='alert alert-info' role='alert'> Request Timeout</div>");
    }
};

get_location();
