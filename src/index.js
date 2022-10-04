import './styles.css'
import { format } from 'date-fns';

// finds basic information about the city
function weatherBalloon(city) {
    const key = 'ac2373632ada2ab860f80267dd225122';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
        .then(function (response) { return response.json() })
        .then(function (data) {
            drawCurrentWeather(data);
        })
        .catch(function () {
            console.log('Error in weatherBalloon')
        });
}

// finds detailed forecast information about the city
function forecastBalloon(city) {
    const key = 'ac2373632ada2ab860f80267dd225122';
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + key)
        .then(function (response) { return response.json() })
        .then(function (data) {
            console.log(data)
            drawForecast(data)
        })
        .catch(function () {
            console.log('Error in forecastBalloon')
        })
}

function drawCurrentWeather(data) {
    const celcius = Math.round(parseFloat(data.main.temp) - 273.15);
    const fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);

    let tempasF = fahrenheit + '&deg;';
    let tempasC = celcius + '&deg;';

    let humidity = `Current Humidity: ${data.main.humidity}<br>`;
    let windspeed = `Windspeed: ${data.wind.speed}<br>`;
    let pressure = `Air Pressure: ${data.main.pressure}<br>`;

    document.getElementById('weatherdetails').innerHTML = humidity + windspeed + pressure;
    document.getElementById('basicweather').innerHTML = data.weather[0].description;
    document.getElementById('tempC').innerHTML = tempasC;
    document.getElementById('tempF').innerHTML = tempasF;
    document.getElementById('city').innerHTML = data.name;
    document.getElementById('timedatedisplay').innerHTML = format(new Date(), 'MMM. dd, yyyy');

    // change the theme based on predominant weather
    if (data.weather[0].description.indexOf('rain') > 0) {
        document.body.className = 'rainy';
    } else if (data.weather[0].description.indexOf('cloud') > 0) {
        document.body.className = 'cloudy';
    } else {
        document.body.className = 'sunny';
    }
}

function drawForecast(data) {
    const forecastfield = document.getElementById('forecast');

    let datetime1 = data.list[0].dt_txt;
    forecastfield.innerHTML = datetime1;

}
const fahrentheitbutton = document.getElementById('fahrenheit');
const celsiusbutton = document.getElementById('celsius');

fahrentheitbutton.onclick = function () {
    document.getElementById('tempC').style.display = "none";
    document.getElementById('tempF').style.display = "block";
}

celsiusbutton.onclick = function () {
    document.getElementById('tempF').style.display = "none";
    document.getElementById('tempC').style.display = "block";
}


const searchbutton = document.getElementById('searchbutton');
let searchfield = document.getElementById('locationsearch');
searchbutton.onclick = function () {
    weatherBalloon(searchfield.value);
    forecastBalloon(searchfield.value)
}
window.onload = function () {
    weatherBalloon('Singapore')
    forecastBalloon('Singapore')
}