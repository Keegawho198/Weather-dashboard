//Api URL = http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//Api key = b15f97422ba66d215ee17499ebc5b83b
//api.openweathermap.org/data/2.5/weather?q=London

var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";

var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=melbourne&units=imperial&APPID=" + APIKEY;

var queryURL_UV = "http://api.openweathermap.org/data/2.5/uvi?appid="+ APIKEY +"&lat=-37.8143&lon=144.9632";

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

    var iconImg = "http:openweathermap.org/img/wn/10d.png";
    //var iconCode = "03d";

    // var iconcode = a.weather[0].icon;
    // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    // $('#wicon').attr('src', iconurl);
    // " + response.list[0].weather[0].icon +"

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

    $("#searchBtnId").click(function () {
    console.log("clicked");
    $(".buttonHistory").html("<p> hello");

    var savedInput = $(this).attr("data-saveInput");
    console.log(savedInput);
    var textInput = $("#" + savedInput).val();
    console.log(textInput);
   // var textItem = $("#" + todoItem).val();

   localStorage.setItem(savedInput, textInput);  

   //var storageInput = JSON.parse(localStorage.getItem('textInput'));
   $(".buttonHistory").append("<p>" + textInput);

  //  var value = [textInput];
  // localStorage.setItem("testKey", JSON.stringify(value));
  // var test = JSON.parse(localStorage.getItem("testKey"));
  // alert(test);

    
  });

    

  });


  $.ajax({
    url: queryURL_UV, method: "Get"
  })
  .then(function(response){
    console.log(queryURL);

    console.log(response);

    $(".cityUV").html("<p>UV Index: " + response.value);
  });

  

  //questions to ask
  // how do we get the date, cuz when i try to use the 5 day forecast, it does it for every 3 hours
  // do we still use that or do we need to use something else?
  //
  //is the way how I have done the dates okay?

  //how to add search history to html, After you enter input then press search, input should appear at the bottom.