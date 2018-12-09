
var weatherData = [""];

$(document).on("click", "submit", function() {
  event.preventDefault()

  // lat&lng api link: Other link is just for testing
  // var queryURL = "https://api.weatherbit.io/v2.0/lat=&lon=&key=d242172e1f4b4afbb2d2c815f4043f71" 
  var queryURL = "https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=d242172e1f4b4afbb2d2c815f4043f71" 


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#weather-info").text(JSON.stringify(response));
    console.log(response);
    
  });

  var temp = "temp"
  var icons = "weather"
  var results = response.data

  for(var i = 0; i < weatherData; i++)
  console.log(weatherData);
  

});


