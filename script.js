


//searchCity = $("#savedSearch").val();

//var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=melbourne&units=imperial&APPID=" + APIKEY;


$("#searchBtnId").click(function () {

  var city = $("#savedSearch").val();
  console.log(city);
  var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&APPID=" + APIKEY;


  if(city){
    var savedCityAry = [];
    savedCityAry.push(city);
    console.log(savedCityAry);

    var storedCity = localStorage.getItem("storedCity");

    if(storedCity == null){
      localStorage.setItem("storedCity", JSON.stringify(savedCityAry));
      $("#savedSearch").val("");
    } else{
      storedCity = JSON.parse(storedCity);
      storedCity.push(city);
      localStorage.setItem("storedCity", JSON.stringify(storedCity));
      $("savedSearch").val("");
    }
    //makes sure same text is not repeated when displayed
    $("#cityHistory").empty();
    displayCity();
  }

  function displayCity(){
    var cityFromLocalStorage = JSON.parse(localStorage.getItem("storedCity"));
    if(cityFromLocalStorage != null){
      for(var i=0; i<cityFromLocalStorage.length; i++){
        var city = cityFromLocalStorage[i];
        $("#cityHistory").append('<li>' +city+ '</li>');
      }
    }
  }


//use AJAX to call weather api
$.ajax({
    url: queryURL, method: "Get"
  })
  .then(function(response){
    displayCity();

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

    //var iconCode = response.city.list[1].weather[0].icon;
    //console.log(iconCode);//using the above code give 501 error timeout.

    var iconCode = "09d";
    console.log(iconCode);
    var iconImg = "http:openweathermap.org/img/wn/" + iconCode+ ".png";
    
    //console.log(response.city.list[1].weather[0].icon); //console log this and get 504 error
    

    //main data for the main city
    //$(".cityName").html("<h1>" + response.city.name + " Weather Details (" + dd + "/" + mm + "/" + yyyy + ")</h1>");
    $(".cityName").html("<h1>" + response.city.name + response.list[1].dt_txt + "<img src =" + iconImg + ">");

    $(".cityTemp").html("<p> Temperature (F): " + response.list[1].main.temp +"°")
    $(".cityHumid").html("<p> Humidity: " + response.list[1].main.humidity + "%");
    $(".cityWind").html("<p> Wind Speed: " + response.list[1].wind.speed + " MPH</p>")


    //dates for the five day forecase
    //each list array is for the different days as this api does the weather for every 3 hours
    //in this case every day is for every 12pm
    $("#day1").html("<h5>" + dd1 + "/" + mm + "/" + yyyy);
    $("#firstDayTemp").html("<p>Temperature (F): " + response.list[9].main.temp + "° </p>");
    $("#firstDayHumid").html("<p>Humidity: " + response.list[9].main.humidity + "%");

    $("#day2").html("<h5>" +dd2+ "/" +mm+ "/" + yyyy);
    $("#secondDayTemp").html("<p>Temperature (F): " + response.list[17].main.temp + "° </p>");
    $("#secondDayHumid").html("<p>Humidity: " + response.list[17].main.humidity+ "%");

    $("#day3").html("<h5>" +dd3+ "/" +mm+ "/" + yyyy);
    $("#thirdDayTemp").html("<p>Temperature (F): " + response.list[25].main.temp + "° </p>");
    $("#thirdDayHumid").html("<p>Humidity: " + response.list[25].main.humidity+ "%");

    $("#day4").html("<h5>" +dd4+ "/" +mm+ "/" + yyyy);
    $("#fourthDayTemp").html("<p>Temperature (F): " + response.list[33].main.temp + "° </p>");
    $("#fourthDayHumid").html("<p>Humid: " +response.list[33].main.humidity+ "%");

    $("#day5").html("<h5>" +dd5+ "/" +mm+ "/" + yyyy);
    $("#fifthDayTemp").html("<p>Temperature (F): " + response.list[39].main.temp + "° </p>");
    $("#fifthDayHumid").html("<p>Humid: " +response.list[39].main.humidity+ "%");


  });
});

var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";


var queryURL_UV = "https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKEY +"&lat=-37.8143&lon=144.9632";

  $.ajax({
    url: queryURL_UV, method: "Get"
  })
  .then(function(response){
    console.log(queryURL);

    console.log(response);

    $(".cityUV").html("<p>UV Index: " + response.value);
  });

