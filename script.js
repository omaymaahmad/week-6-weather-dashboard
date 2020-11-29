//  Search Button
$(document).ready(function () {
  $("#searchBtn").on("click", function () {
    var search = $("#searchInput").val();
    console.log(search);

    weatherData(search);
  });
});

// use API to gather the data
function weatherData(search) {
  $.ajax({
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      search +
      "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
    type: "GET",
  }).then(function (response) {
    console.log(response);

    weatherForecast(search);
    weatherUV(response.coord.lat, response.coord.lon);
  });
}
function weatherForecast(search) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
    type: "GET",
  }).then(function (response) {
      console.log("sdfsf")
    console.log(response);
  });
}

function weatherUV(lat, lon) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
    type: "GET",
  }).then(function (response) {
    console.log(response);
  });
}
