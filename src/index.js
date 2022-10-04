import './styles.css'
import { format } from 'date-fns';

function weatherBalloon(city) {
    const key = 'ac2373632ada2ab860f80267dd225122';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
        .then(function (response) { return response.json() })
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {
            console.log('Error: Needs location')
        });
}

// get the coords
function geoFinder(city) {
    const key = 'ac2373632ada2ab860f80267dd225122';
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + key)
        .then(function (response) { return response.json() })
        .then(function (data) {
            foreCaster(data[0].lat, data[0].lon);
        })
        .catch(function () {
            console.log('Error: Needs location')
        })
}

// use the coords to get the forecast
function foreCaster(lat,lon) {
    const key = 'ac2373632ada2ab860f80267dd225122';

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + "&appid=" + key)
        .then(function (response) { return response.json() })
        .then(function (data) {
            console.log(data)
            return data;
        })
        .catch(function() {
            console.log('Error in forecaster');
        })
}

function drawWeather(d) {
    const celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    const fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

    let tempasF = fahrenheit + '&deg;';
    let tempasC = celcius + '&deg;';

    let humidity = `Current Humidity: ${d.main.humidity}<br>`;
    let windspeed = `Windspeed: ${d.wind.speed}<br>`;
    let pressure = `Air Pressure: ${d.main.pressure}<br>`;

    document.getElementById('weatherdetails').innerHTML = humidity + windspeed + pressure;
    document.getElementById('basicweather').innerHTML = d.weather[0].description;
    document.getElementById('tempC').innerHTML = tempasC;
    document.getElementById('tempF').innerHTML = tempasF;
    document.getElementById('city').innerHTML = d.name;
    document.getElementById('timedatedisplay').innerHTML = format(new Date(), 'MMM. dd, yyyy');

    if ( d.weather[0].description.indexOf('rain') > 0) {
        document.body.className = 'rainy';
    } else if (d.weather[0].description.indexOf('cloud') > 0){
        document.body.className = 'cloudy';
    } else {
        document.body.className = 'sunny';
    }
}

const fahrentheitbutton = document.getElementById('fahrenheit');
const celsiusbutton = document.getElementById('celsius');

fahrentheitbutton.onclick = function(){
    document.getElementById('tempC').style.display = "none";
    document.getElementById('tempF').style.display = "block";
}

celsiusbutton.onclick = function(){
    document.getElementById('tempF').style.display = "none";
    document.getElementById('tempC').style.display = "block";
}


const searchbutton = document.getElementById('searchbutton');
let searchfield = document.getElementById('locationsearch');
searchbutton.onclick = function () {
    weatherBalloon(searchfield.value);
}
window.onload = function () {
    weatherBalloon('Singapore')
    geoFinder('Singapore')
}