import "./styles.css";
import { format } from "date-fns";

// finds basic information about the city
function weatherBalloon(city) {
  const key = "ac2373632ada2ab860f80267dd225122";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      key
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drawCurrentWeather(data);
    })
    .catch(function () {
      console.log("Error in weatherBalloon");
    });
}

// finds detailed forecast information about the city
function forecastBalloon(city) {
  const key = "ac2373632ada2ab860f80267dd225122";
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      key
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // daily (5 days) forecast
      drawForecast(data, 7, 0);
      drawForecast(data, 15, 0);
      drawForecast(data, 23, 0);
      drawForecast(data, 31, 0);
      drawForecast(data, 39, 0);
      // hourly (3 hours) forecast
      drawForecast(data, 0, 1);
      drawForecast(data, 1, 1);
      drawForecast(data, 2, 1);
      drawForecast(data, 3, 1);
      drawForecast(data, 4, 1);
    })
    .catch(function () {
      console.log("Error in forecastBalloon");
    });
}

function drawCurrentWeather(data) {
  const celcius = Math.round(parseFloat(data.main.temp) - 273.15);
  const fahrenheit = Math.round(
    (parseFloat(data.main.temp) - 273.15) * 1.8 + 32
  );

  let tempasF = fahrenheit + "℉";
  let tempasC = celcius + "℃";

  let humidity = `Humidity: ${data.main.humidity}%<br>`;
  let windspeed = `Windspeed: ${data.wind.speed} Km/h<br>`;
  let pressure = `Air Pressure: ${data.main.pressure}<br>`;

  document.getElementById("humidity").innerHTML = humidity;
  document.getElementById("windspeed").innerHTML = windspeed;
  document.getElementById("airpressure").innerHTML = pressure;

  document.getElementById("basicweather").innerHTML =
    data.weather[0].description;
  document.getElementById("tempC").innerHTML = tempasC;
  document.getElementById("tempF").innerHTML = tempasF;
  document.getElementById("city").innerHTML = data.name;
  document.getElementById("timedatedisplay").innerHTML = format(
    new Date(),
    "MMM. dd, yyyy"
  );

  // change the theme based on predominant weather
  if (data.weather[0].description.includes("thunderstorm")) {
    document.getElementById("weatherwindow").className = "current-thunderstorm";
  } else if (data.weather[0].description.includes("heavy rain")) {
    document.getElementById("weatherwindow").className = "current-heavyrainy";
  } else if (
    data.weather[0].description.includes("rain") ||
    data.weather[0].description.includes("drizzle")
  ) {
    document.getElementById("weatherwindow").className = "current-lightrainy";
  } else if (data.weather[0].description.includes("snow")) {
    document.getElementById("weatherwindow").className = "current-snowy";
  } else if (
    data.weather[0].description.includes("mist") ||
    data.weather[0].description.includes("haze") ||
    data.weather[0].description.includes("fog")
  ) {
    document.getElementById("weatherwindow").className = "current-foggy";
  } else if (data.weather[0].description.includes("cloud")) {
    document.getElementById("weatherwindow").className = "current-cloudy";
  } else {
    // default is sunny/clear
    document.getElementById("weatherwindow").className = "current-sunny";
  }
}

function drawForecast(data, fieldindicator, interval) {
  const celcius = Math.round(
    parseFloat(data.list[fieldindicator].main.temp - 273.15)
  );
  const fahrenheit = Math.round(
    (parseFloat(data.list[fieldindicator].main.temp) - 273.15) * 1.8 + 32
  );

  let tempasF = '<span class="tempasF">Temp: ' + fahrenheit + "℉<br></span>";
  let tempasC = '<span class="tempasC">Temp: ' + celcius + "℃<br></span>";

  let field = "forecast" + fieldindicator;
  const forecastfield = document.getElementById(field);
  let datetime;

  // interval designates whether to draw daily (0) or tri-hourly (1)
  if (interval === 0) {
    datetime =
      format(data.list[fieldindicator].dt * 1000, "eeee, MMM do") + "<br>";
  } else if (interval === 1) {
    datetime = format(data.list[fieldindicator].dt * 1000, "haaa (B)") + "<br>";
  }

  let weather = data.list[fieldindicator].weather[0].description + "<br>";

  forecastfield.innerHTML = datetime + tempasC + tempasF + weather;

  // change the theme based on predominant weather
  let forecastBubble = document.getElementById(
    "forecast" + fieldindicator + "-bubble"
  );

  if (
    data.list[fieldindicator].weather[0].description.includes("thunderstorm")
  ) {
    forecastBubble.className = "forecast-thunderstorm";
  } else if (
    data.list[fieldindicator].weather[0].description.includes("heavy rain")
  ) {
    forecastBubble.className = "forecast-heavyrainy";
  } else if (
    data.list[fieldindicator].weather[0].description.includes("rain") ||
    data.list[fieldindicator].weather[0].description.includes("drizzle")
  ) {
    forecastBubble.className = "forecast-lightrainy";
  } else if (
    data.list[fieldindicator].weather[0].description.includes("snow")
  ) {
    forecastBubble.className = "forecast-snowy";
  } else if (
    data.list[fieldindicator].weather[0].description.includes("mist") ||
    data.list[fieldindicator].weather[0].description.includes("haze") ||
    data.list[fieldindicator].weather[0].description.includes("fog")
  ) {
    forecastBubble.className = "forecast-foggy";
  } else if (
    data.list[fieldindicator].weather[0].description.includes("cloud")
  ) {
    forecastBubble.className = "forecast-cloudy";
  } else {
    // default is sunny/clear
    forecastBubble.className = "forecast-sunny";
  }

  //   if (data.list[fieldindicator].weather[0].description.indexOf("rain") > 0) {
  //     forecastBubble.className = "forecast-lightrainy";
  //   } else if (
  //     data.list[fieldindicator].weather[0].description.indexOf("cloud") > 0
  //   ) {
  //     forecastBubble.className = "forecast-cloudy";
  //   } else {
  //     forecastBubble.className = "forecast-sunny";
  //   }
}

// Temperature toggle
const temperatureToggle = document.getElementById("temperature-toggle");
temperatureToggle.addEventListener("change", (event) => {
  if (event.target.checked) {
    document.getElementById("tempC").style.display = "none";
    document.getElementById("tempF").style.display = "block";

    let tempClist = document.querySelectorAll(".tempasC");
    for (let i = 0; i < tempClist.length; i++) {
      tempClist[i].style.display = "none";
    }
    let tempFlist = document.querySelectorAll(".tempasF");
    for (let i = 0; i < tempFlist.length; i++) {
      tempFlist[i].style.display = "block";
    }
  } else {
    document.getElementById("tempF").style.display = "none";
    document.getElementById("tempC").style.display = "block";

    let tempFlist = document.querySelectorAll(".tempasF");
    for (let i = 0; i < tempFlist.length; i++) {
      tempFlist[i].style.display = "none";
    }
    let tempClist = document.querySelectorAll(".tempasC");
    for (let i = 0; i < tempClist.length; i++) {
      tempClist[i].style.display = "block";
    }
  }
});

// Finds and adds functionality to the search button
const searchbutton = document.getElementById("searchbutton");
searchbutton.onclick = function () {
  weatherBalloon(searchfield.value);
  forecastBalloon(searchfield.value);
};

// Finds and adds functionality to the input field
const searchfield = document.getElementById("locationsearch");
searchfield.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchbutton.click();
  }
});

// Finds and adds functionality to the daily forecast button
const dailytoggle = document.getElementById("dailyforecastbutton");
dailytoggle.onclick = function () {
  document.getElementById("hourlyforecast").style.display = "none";
  document.getElementById("dailyforecast").style.display = "flex";
};

// Finds and adds functionality to the hourly forecast button
const hourlytoggle = document.getElementById("hourlyforecastbutton");
hourlytoggle.onclick = function () {
  document.getElementById("hourlyforecast").style.display = "flex";
  document.getElementById("dailyforecast").style.display = "none";
};

// Renders placeholder location on window load
window.onload = function () {
  weatherBalloon("Ho Chi Minh City");
  forecastBalloon("Ho Chi Minh City");
};
