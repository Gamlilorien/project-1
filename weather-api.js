
  
  var lat
  var lng 
  console.log("lat", lat, "lng", lng)

  //updated to treat as a function requireing two arguments or parameters (ie lat and lng).
  //This way, the function only gets called when ready (ie when we have the desired lat and lng coordiates)
  function getWeather (lat, lng) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=imperial&appid=9eabcaeeafc5beb1cdf26fdd62664be2";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (data) {
    var results = data    
      
    var temperature = Math.round(results.main.temp);
    var desc = results.weather[0].description;
    var iconCode = results.weather[0].icon;
    console.log(iconCode);

    var iconImg = "http://openweathermap.org/img/w/" + iconCode + ".png"
    console.log(iconImg);
    
    //Slight changes to visual purposes
    $("#temperature").html(temperature +" °F");
    //Removed this to include as the icon alt, and a title for when a user hovers over it
    // $("#weather-desc").html(desc);
    $("#weather-icon").attr({"src": iconImg, "alt": desc, "title": desc});

    // I wanted to organize these by condition but ran out of time, will do so at a later date
    switch(results.weather[0].icon) {

      // thunderstorm
      case "thunderstorm with light rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstorm with rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstorm with heavy rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "light thunderstorm":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstrom":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy thunderstorm":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "ragged thunderstorm":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstorm with light drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstorm with drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "thunderstorm with heavy drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;

      // snow
      case "light snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "sleet":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "shower sleet":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "light rain and snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "light shower snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "shower snow":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy shower snow":
      $("#weather-icon").attr("src", iconImg);
      break;

      // Drizzle
      case "light intensity drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy intensity drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "light intensity drizzle rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "drizzle rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy intensity drizzle rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "shower rain and drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy shower rain and drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "shower drizzle":
      $("#weather-icon").attr("src", iconImg);
      break;

      // rain
      case "light rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "moderate rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy intensity rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "very heavy rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "extreme rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "freezing rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "light intensity shower rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "shower rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "heavy intensity shower rain":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "ragged shower rain":
      $("#weather-icon").attr("src", iconImg);
      break;

      // atmosphere
      case "mist":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "smoke":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "haze":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "sand, dust whirls":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "fog":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "sand":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "dust":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "volcanic ash":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "squalls":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "tornado":
      $("#weather-icon").attr("src", iconImg);
      break;

      // clear & clouds
      case "clear sky":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "few clouds":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "scattered clouds":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "broken clouds":
      $("#weather-icon").attr("src", iconImg);
      break;
      case "overcast clouds":
      $("#weather-icon").attr("src", iconImg);
      break;
    }

  });
};

