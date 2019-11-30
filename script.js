//searchCity = $("#savedSearch").val();

//var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=melbourne&units=imperial&APPID=" + APIKEY;
$("#cityHistory").empty();
displayCity();
function displayCity() {
  var cityFromLocalStorage = JSON.parse(localStorage.getItem("storedCity"));
  if (cityFromLocalStorage != null) {
    for (var i = 0; i < cityFromLocalStorage.length; i++) {
      var city = cityFromLocalStorage[i];
      $("#cityHistory").append('<li>' + city + '</li>');

    }
  }
}
$("#searchBtnId").click(function () {

  var city = $("#savedSearch").val();
  console.log(city);
  var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=" + APIKEY;


  if (city) {
    var savedCityAry = [];
    savedCityAry.push(city);
    console.log(savedCityAry);

    var storedCity = localStorage.getItem("storedCity");

    if (storedCity == null) {
      localStorage.setItem("storedCity", JSON.stringify(savedCityAry));
      $("#savedSearch").val("");
    } else {
      storedCity = JSON.parse(storedCity);
      storedCity.push(city);
      localStorage.setItem("storedCity", JSON.stringify(storedCity));
      $("savedSearch").val("");
    }
    //makes sure same text is not repeated when displayed
    $("#cityHistory").append('<li>' + city + '</li>');
    
  } else {
    alert("enter something")
  }

  


  //use AJAX to call weather api
  $.ajax({
    url: queryURL, method: "Get"
  })
    .then(function (response) {

      console.log(queryURL);

      console.log(response);

      //will the date using the api
      var dt = response.list[1].dt_txt;
      //will shorten the string in the array in the api
      dT = dt.substring(0, dt.length - 8);

      var dayDate1 = response.list[9].dt_txt;
      var dd1 = dayDate1.substring(0, dt.length - 8); //for next day after current day

      var dayDate2 = response.list[17].dt_txt;
      var dd2 = dayDate2.substring(0, dt.length - 8);

      var dayDate3 = response.list[25].dt_txt;
      var dd3 = dayDate3.substring(0, dt.length - 8);

      var dayDate4 = response.list[33].dt_txt;
      var dd4 = dayDate4.substring(0, dt.length - 8);

      var dayDate5 = response.list[39].dt_txt;
      var dd5 = dayDate5.substring(0, dt.length - 8);


      var iconCode = response.list[1].weather[0].icon;

      //var iconCode = "09d";
      console.log(iconCode);
      var iconImg = "http:openweathermap.org/img/wn/" + iconCode + ".png";

      //console.log(response.city.list[1].weather[0].icon); //console log this and get 504 error


      //main data for the main city
      //$(".cityName").html("<h1>" + response.city.name + " Weather Details (" + dd + "/" + mm + "/" + yyyy + ")</h1>");
      $(".cityName").html("<h1>" + response.city.name + " " + dT + "<img src =" + iconImg + ">");

      $(".cityTemp").html("<p> Temperature (F): " + response.list[1].main.temp + "°")
      $(".cityHumid").html("<p> Humidity: " + response.list[1].main.humidity + "%");
      $(".cityWind").html("<p> Wind Speed: " + response.list[1].wind.speed + " MPH</p>")

      //dates for the five day forecase
      //each list array is for the different days as this api does the weather for every 3 hours
      //in this case every day is for every 12pm
      var iconCode1 = response.list[9].weather[0].icon;
      var iconImg1 = "http:openweathermap.org/img/wn/" + iconCode1 + ".png";
      $("#day1").html("<h5>" + dd1 )
      $("#firstDayIcon").html("<img src =" + iconImg1 + ">");
      $("#firstDayTemp").html("<p>Temperature (F): " + response.list[9].main.temp + "° </p>");
      $("#firstDayHumid").html("<p>Humidity: " + response.list[9].main.humidity + "%");

      var iconCode2 = response.list[17].weather[0].icon;
      var iconImg2 = "http:openweathermap.org/img/wn/" + iconCode2 + ".png";
      $("#day2").html("<h5>" + dd2);
      $("#secondDayIcon").html("<img src =" + iconImg2 + ">");
      $("#secondDayTemp").html("<p>Temperature (F): " + response.list[17].main.temp + "° </p>");
      $("#secondDayHumid").html("<p>Humidity: " + response.list[17].main.humidity + "%");

      var iconCode3 = response.list[25].weather[0].icon;
      var iconImg3 = "http:openweathermap.org/img/wn/" + iconCode3 + ".png";
      $("#day3").html("<h5>" + dd3);
      $("#thirdDayIcon").html("<img src =" + iconImg3 + ">");
      $("#thirdDayTemp").html("<p>Temperature (F): " + response.list[25].main.temp + "° </p>");
      $("#thirdDayHumid").html("<p>Humidity: " + response.list[25].main.humidity + "%");

      var iconCode4 = response.list[33].weather[0].icon;
      var iconImg4 = "http:openweathermap.org/img/wn/" + iconCode4 + ".png";
      $("#day4").html("<h5>" + dd4);
      $("#fourthDayIcon").html("<img src =" + iconImg4 + ">");
      $("#fourthDayTemp").html("<p>Temperature (F): " + response.list[33].main.temp + "° </p>");
      $("#fourthDayHumid").html("<p>Humid: " + response.list[33].main.humidity + "%");

      var iconCode5 = response.list[39].weather[0].icon;
      var iconImg5 = "http:openweathermap.org/img/wn/" + iconCode5 + ".png";
      $("#day5").html("<h5>" + dd5);
      $("#fifthDayIcon").html("<img src =" + iconImg5 + ">");
      $("#fifthDayTemp").html("<p>Temperature (F): " + response.list[39].main.temp + "° </p>");
      $("#fifthDayHumid").html("<p>Humid: " + response.list[39].main.humidity + "%");


    });
});

var APIKEY = "b15f97422ba66d215ee17499ebc5b83b";


var queryURL_UV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY + "&lat=-37.8143&lon=144.9632";

$.ajax({
  url: queryURL_UV, method: "Get"
})
  .then(function (response) {
    console.log(queryURL);

    console.log(response);

    $(".cityUV").html("<p>UV Index: " + response.value);
  });

