function getGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log(position.coords.latitude, position.coords.longitude);
			getTemperature(position.coords.latitude, position.coords.longitude);
		});
	} else {
		console.log('Browser does not supports Geolocation');
		return false;
	}

}

function getTemperature(latitude, longitude) {
	weatherAPIToken = '3c669408b3ac2062597dad8fe407ffb2';
	var weatherAPIUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + weatherAPIToken;

	$.ajax({
		dataType: 'json',
		url: weatherAPIUrl,
		success: function (response) {
			weatherMain = '';
			console.log(response['name']);
			console.log(response['main']['temp']);

			// Setting image depending on weather
			if (response['weather'][0]['main'] == 'Rain') {
				document.getElementById("weatherIcons").src = "http://simpleicon.com/wp-content/uploads/rain.png";
			} else if (response['weather'][0]['main'] == 'Clear') {
				document.getElementById("weatherIcons").src = "https://cdn1.iconfinder.com/data/icons/weather-glyphs-black/512/Weather_Glyphs_SunBlack.png";
			} else if (response['weather'][0]['main'] == 'Clouds') {
				document.getElementById("weatherIcons").src = "http://simpleicon.com/wp-content/uploads/cloud.png";
			} else if (response['weather'][0]['main'] == 'Mist') {
				document.getElementById("weatherIcons").src = "https://cdn4.iconfinder.com/data/icons/heavy-weather/100/Weather_Icons_09_fog-256.png";
			} else if (response['weather'][0]['main'] == 'Snow') {
				document.getElementById("weatherIcons").src = "https://d30y9cdsu7xlg0.cloudfront.net/png/64-200.png";
			} else {
				console.log('Error, weather not found.');
			}

			document.getElementById("weather").innerHTML = response['weather'][0]['main'];
			document.getElementById("temperature").innerHTML = response['main']['temp'] + " ºC";

		}
	});
}

function convertTemperature() {
	var unitMeasure = document.getElementById("temperature").innerHTML.split(' ')
	if (unitMeasure[1] === "ºC") {
		// Converting from Celcius to Fahrenheit
		unitMeasure[0] = unitMeasure[0] * 1.8 + 32;
		unitMeasure[1] = "ºF";
		unitMeasure = unitMeasure.join(' ').toString();
		document.getElementById("temperature").innerHTML = unitMeasure;
	} else if (unitMeasure[1] === "ºF") {
		// Converting from Fahrenheit to Celcius
		unitMeasure[0] = (unitMeasure[0] - 32) / 1.8;
		unitMeasure[1] = "ºC";
		unitMeasure = unitMeasure.join(' ').toString();
		document.getElementById("temperature").innerHTML = unitMeasure;
	} else {
		document.getElementById("temperature").innerHTML = "Error when trying to convert";
		console.log('Unable to convert.');
	}
}