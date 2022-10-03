import './styles.css'
import {format } from 'date-fns';

// http://api.openweathermap.org/data/2.5/weather?q=Vietnam&APPID=ac2373632ada2ab860f80267dd225122

function weatherBalloon ( city ) {
    const key = 'ac2373632ada2ab860f80267dd225122';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
    .then(function(response) { return response.json() })
    .then(function(data) {
        drawWeather(data);
    })
    .catch(function() {
        // catch errors
    });
}

function drawWeather( d ) {
    
    function capitalizeWords(words) {
        return words.map(element => {
            return element.charAt(0).toUpperCase()
        })
    }

    const celcius = Math.round(parseFloat(d.main.temp)-273.15);
	const fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
	document.getElementById('basicweather').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('city').innerHTML = d.name;
    document.getElementById('timedatedisplay').innerHTML = format(new Date(), 'MMM. dd, yyyy');
}

const searchbutton = document.getElementById('searchbutton');
let searchfield = document.getElementById('locationsearch');
searchbutton.onclick = function() {
    weatherBalloon(searchfield.value);
}
window.onload = function() {
    weatherBalloon( 'Singapore' )
}