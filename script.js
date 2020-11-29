//  Search Button
$(document).ready(function () {
  $("#searchBtn").on("click", function () {
    var search = $("#searchInput").val();
    weatherData(search);
  });

    // local storage
  var citiesPreviouslySearched =
    JSON.parse(localStorage.getItem("cities")) || [];
  function createCitiesList(cities) {
    $(".search-history").empty();
    for (var i = 0; i < cities.length; i++) {
      var listItem = $("<li>").text(cities[i]);
      $(".search-history").append(listItem);
    }
  }
  // Present Day section
  function weatherData(search) {
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        search +
        "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
      type: "GET",
    }).then(function (response) {
      console.log(response);
      // add to local storage
      if (!citiesPreviouslySearched.includes(search)) {
        citiesPreviouslySearched.push(search);
        localStorage.setItem(
          "cities",
          JSON.stringify(citiesPreviouslySearched)
        );
      }
      $(".search-history").empty();
      createCitiesList(citiesPreviouslySearched);
      // Append the name of city and icon
      
      var cityName = $("<h3>").text(response.name);
      var iconHtml = $("<img>").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      
     var card = $("<div>").addClass("card");
     var wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");
     var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");
     var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + " °C");
     var cardBody = $("<div>").addClass("card-body");
      
     
     cardBody.append(temp, humid, wind);
     card.append(cardBody);
     $("#present-day").append(card);
     $("#present-day").append(cityName, iconHtml);
      
      
      // Forecast API section
      weatherForecast(search);
      weatherUV(response.coord.lat, response.coord.lon);
    });
  }
  function weatherForecast(search) {
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        search +
        "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
      type: "GET",
    }).then(function (response) {
      console.log("sdfsf");
      console.log('this is forecast response', response)
      for (var i = 0; i < response.list.length; i++) {
        var date = response.list[i].dt_txt;
        console.log(date);
        if (date.endsWith("15:00:00")) {

        var title = $("<h4>").addClass("title").text(new Date(response.list[i].dt_txt));  
        
        var col = $("<div>").addClass("col-md-3");
        var card = $("<div>").addClass("card-sm-primary text-black");
        var body = $("<div>").addClass("card-body p-3");
        
        var temperature = response.list[i].main.temp_max;
        temperature = parseFloat(temperature) - 273.15;
        
        var p1 = $("<p>").addClass("card-text").text("TEMPERATURE: " + temperature + " C");
        var p2 = $("<p>").addClass("card-text").text("HUMIDITY: " + response.list[i].main.humidity + "%"); 

        body.append(title, p1, p2);
        card.append(body);

        col.append(card);
        $("#forecast ").append(col);}
      };
    });
  }
  // UV API section
  function weatherUV(lat, lon) {
    $.ajax({
      dataType: "json",
      url:
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=15a9f0e5a6e44b139bceaeb431391c1b",
      type: "GET",
    }).then(function (response) {
        console.log('this is uv response', response)
        var uvBtn = $("<div>").addClass("btn btn-sm").text(response.value);
        var uv = $("<p>").text("UV INDEX: "); 
        if (response.value < 3) {
        uvBtn.addClass("good");
      }  
        else if (response.value < 7) {
        uvBtn.addClass("warning");
      }
        else {
        uvBtn.addClass("danger");
      }
      uvBtn.append(uv);
      $("#forecast").append(uvBtn);
     });
    
  }
  createCitiesList(citiesPreviouslySearched);
});
