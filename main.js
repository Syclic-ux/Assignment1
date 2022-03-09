/******************************************************************************
***
* BTI425 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Suhail Sameer Student ID: 165744186 Date:30/01/2022
*
*
******************************************************************************
**/ 



$("#searchButton").click(function(){
    var city = document.getElementById("CityName").value;
      console.log(city);
    
      $("#demo").html("");
      if(city == ""){
                $("#demo").html("<b>Input not entered</b>");
                $("#theBody").empty();
      }
      else{
           var jsonURL = "http://api.openweathermap.org/data/2.5/find?callback=?&q="+ city +"&units=metric&appid=ba80a10d5ebe0553d701517bac5c6253";
           $.getJSON(jsonURL, displayData)
      }
      function displayData(JSONobject){
        //var city = JSONobject.list;
        var city = JSONobject.list;
        console.log(city);
        if(city.length == 0){
          $("#demo").html("<b>No City Found</b>");
          $("#theBody").empty();
        }
        else{
          var html = '';
            //let unix = JSONobject.sys.sunset;
            //let date = new Date(unix*1000);
            //console.log(date);   // 2017-10-08T14:35:44.000Z
            for(let i = 0; i < city.length; ++i){
              var current_name = city[i].name;
              var current_cnt = city[i].sys.country;
              var current_temp = city[i].main.temp;
              var iconVar = "http://openweathermap.org/img/w/"+ city[i].weather[0].icon +".png";
              var countryVar = "https://openweathermap.org/images/flags/"+ city[i].sys.country.toLowerCase() + ".png ";
              var max_temp = city[i].main.temp_max;
              var min_temp = city[i].main.temp_min;
              var wind_speed = city[i].wind.speed;
              var humid = city[i].main.humidity;
              var  pressure = city[i].main.pressure;
              var coord_lat = city[i].coord.lat;
              var coord_long = city[i].coord.lon;
              var sunrise = '';
              var sunset = '';
              console.log("id: " + city[i].id)
             $.ajax({
               url:"http://api.openweathermap.org/data/2.5/weather?id=" + city[i].id + "&units=metric&appid=ba80a10d5ebe0553d701517bac5c6253",
               dataType: "json",
               async: false,
               success : function(data){
                console.log(data);
                sunrise = data.sys.sunrise;
                sunset = data.sys.sunset;
               }
             });
              //displaying data
              //console.log(sunrise);
              //console.log(sunset);
              var sunriseTime = new Date(sunrise * 1000);
              var sunsetTime = new Date(sunset * 1000);
              var row = '<tr><td><img src ="' + iconVar + '"</td><td><b><p>'+ current_name +', '+ current_cnt 
                +'<img src ="'+ countryVar +'"</p></b><p class = "lead text-muted">Current Temperature '+ current_temp +
                  '°С, Temp from '+max_temp+' to '+min_temp+'°С, wind '+ wind_speed +' m/s. clouds '+ humid +' %, '+ pressure 
                  +' hpa</p><p>The Coordinates are ['+ coord_lat +', '+ coord_long +']</p><p>Sunrise: '+ sunriseTime +
                    '</p><p>Sunset: '+ sunsetTime +'</p></p></td></tr>';
        
              html = html + row;
            }
            $("#theBody").html(html);
    
        }
      }
  });