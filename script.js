//Api URL = http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//Api key = b15f97422ba66d215ee17499ebc5b83b
//api.openweathermap.org/data/2.5/weather?q=London

var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=melbourne&units=imperial&APPID=" + APIKEY;

//use AJAX to call weather api
$.ajax({
    url: queryURL, method: "Get"
  })
  .then(function(response){
    console.log(queryURL);

    console.log(response);

    var today = new Date();
    var dd = today.getDate();
    var dd1 = today.getDate()+1; //for next day after current day
    var dd2 = today.getDate()+2;
    var dd3 = today.getDate()+3;
    var dd4 = today.getDate()+4;
    var dd5 = today.getDate()+5;

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    // var iconcode = a.weather[0].icon;
    // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // $('#wicon').attr('src', iconurl);
    // " + response.list[0].weather[0].icon +"

    //main data for the main city
    //$(".cityName").html("<h1>" + response.city.name + " Weather Details (" + dd + "/" + mm + "/" + yyyy + ")</h1>");
    $(".cityName").html("<h1>" + response.city.name + response.list[0].dt_txt);

    $(".cityTemp").html("<p> Temperature (F): " + response.list[0].main.temp +"°")
    $(".cityHumid").html("<p> Humidity: " + response.list[0].main.humidity + "%");
    $(".cityWind").html("<p> Wind Speed: " + response.list[0].wind.speed + " MPH</p>")


    //dates for the five day forecase
    $("#day1").html("<h5>" + dd1 + "/" + mm + "/" + yyyy);
    $("#firstDayTemp").html("<p> Temperature (F): " + response.list[1].main.temp + "° <p/>");
    $("#firstDayHumid").html("<p> Humidity: " + response.list[1].main.temp + "%");

  });

  //questions to ask
  // how do we get the date, cuz when i try to use the 5 day forecast, it does it for every 3 hours
  // do we still use that or do we need to use something else?
  //