'use strict';

// Translate English into Polish - main
function fmain(data) {
	var wynik = '';
	// console.log('pogoda: '+ data);
	switch(data) {
		// Thunderstorm
		case 'Thunderstorm' : wynik = 'Burzowo';    break;  // nr - 1
		// Drizzle
		case 'Drizzle'      : wynik = 'Mżawka';     break;  // nr - 2
		// Rain
		case 'Rain'         : wynik = 'Deszczowo';  break;  // nr - 3
		// Snow
		case 'Snow'         : wynik = 'Śnieg';      break;  // nr - 4
		// Atmosphere
		case 'Mist'         : wynik = 'Zamglenie';  break;  // nr - 5
		case 'Smoke'        : wynik = 'Zadymienie'; break;  // nr - 6
		case 'Haze'         : wynik = 'Mgiełka';    break;  // nr - 7
		case 'Fog'          : wynik = 'Mgliście';   break;  // nr - 8
		case 'Sand'         : wynik = 'Piaszczyście'; break;  // nr - 9
		case 'Dust'         : wynik = 'Zapylenie';  break;  // nr - 10
		case 'Ash'          : wynik = 'Popiół';     break;  // nr - 11
		case 'Squall'       : wynik = 'Szkwał';     break;  // nr - 12		
		case 'Tornado'      : wynik = 'Tornado';    break;  // nr - 13	
		// Clear	
		case 'Clear'        : wynik = 'Bezchmurnie'; break; // nr - 14	
		// Clouds
		case 'Clouds'       : wynik = 'Pochmurnie'; break;  // nr - 15
		default: wynik = data; 
	}
	return wynik;
}

// Country code to Polish name, witryna z kodami - https://www.iban.com/country-codes
function fcountry(data) {
	var wynik = '';
	// console.log(data);
	switch(data) {
		// from list
		case 'AF': wynik = 'Afghanistan'; break;
		case 'AL': wynik = 'Albania'; break;
		case 'DZ': wynik = 'Algeria'; break;
		case 'AS': wynik = 'American Samoa'; break;
		case 'AD': wynik = 'Andorra'; break;
		case 'AO': wynik = 'Angola'; break;
		case 'AI': wynik = 'Anguilla'; break;
		case 'AQ': wynik = 'Antarctica'; break;
		case 'AG': wynik = 'Antigua and Barbuda'; break;
		case 'AR': wynik = 'Argentina'; break;
		case 'AM': wynik = 'Armenia'; break;
		case 'AW': wynik = 'Aruba'; break;
		case 'AU': wynik = 'Australia'; break;
		case 'AT': wynik = 'Austria'; break;
		case 'AZ': wynik = 'Azerbaijan'; break;

		// owen
		case 'ES': wynik = 'Hiszpania'; break;
		case 'PL': wynik = 'Polska';   break;
		case 'DE': wynik = 'Niemcy';   break;
		case 'FR': wynik = 'Francja';  break;
		case 'SE': wynik = 'Szwecja';  break;
		case 'CH': wynik = 'Szwajcaria'; break;
		case 'US': wynik = 'USA'; break;
		default: wynik = data; 
	}
	return wynik;
}

// zmieniono tutaj 
function getResultEmpty() {
	var result = document.getElementById('result');
	var html = '\n <h3><p>Pogoda dla:  </p><em>Brak takiego miasta</em></h3>\n           ';
	result.innerHTML = html;
}

// Remove class
function removeCleass() {
	document.body.classList.remove('Thunderstorm');
	document.body.classList.remove('Drizzle');
	document.body.classList.remove('Rain');
	document.body.classList.remove('Snow');
	document.body.classList.remove('Mist');
	document.body.classList.remove('Smoke');
	document.body.classList.remove('Haze');
	document.body.classList.remove('Fog');
	document.body.classList.remove('Sand');
	document.body.classList.remove('Dust');
	document.body.classList.remove('Ash');
	document.body.classList.remove('Squall');
	document.body.classList.remove('Tornado');
	document.body.classList.remove('Clear');
	document.body.classList.remove('Clouds');	
}

// get hour of sunset
function getTimeSeunSet(sunset) {
	if(sunset) {
	var timeSun = new Date(sunset * 1000);
	timeSun = timeSun.getHours();
	}	
}

// odebrane dane JSON
function getResult(dane) {
	var city = dane.city;
	var lat  = dane.lat;
	var lon  = dane.lon;
	var date = dane.date;
	var temp = dane.temp;
	var wind = dane.wind;
	var sunrise  = dane.sunrise;
	var sunset   = dane.sunset;
	var pressure = dane.pressure;
	var main        = dane.main;       // Clear
	var description = dane.description; 
	var icon        = dane.icon;
	var humidity    = dane.humidity;   // 92    humidity - wilgotność
	var all         = dane.all;        // 0
	var country     = dane.country;    // PL

	var wind_kh = (wind * (36/10)).toFixed(2);

	var sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
	var sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

	// temp - temperatura - color
	// temp = 0;    
	var kolor = temp > 0 ? 'kolor1' : 'kolor2';
	temp = temp < 0 ? '-'+temp : temp;

	var result = document.getElementById('result');
	var html = (
	'<table>' + 
	'<tr><td> Pogoda dla:  </td><td>'+ city        +'</td></tr>' +
	'<tr><td> Koordynaty:  </td><td>'+ lat         + ', ' + lon + '</td></tr>' +
	'<tr><td> Data:        </td><td>'+ date        +'</td></tr>' +
	'<tr><td> Temperatura: </td><td class='+ kolor +'>'  + temp + '&#176;C</td></tr>' +
	'<tr><td> Wiatr:       </td><td>'+ wind        +' m/s ('+wind_kh+' km/h)</td></tr>' +
	'<tr><td> Pogoda:      </td><td>'+ fmain(main) +'</td></tr>' +       // function
	'<tr><td>              </td><td><img src="http://openweathermap.org/img/wn/'+icon+'@2x.png" alt="icon"/></td></tr>' +
	'<tr><td> Opis:        </td><td>'+ description +'</td></tr>' +
	'<tr><td> Zachmurzenie:</td><td>'+ all         +'%</td></tr>' +
	'<tr><td> Wilgotność:  </td><td>'+ humidity    +'%</td></tr>' +	
	'<tr><td> Wschód:      </td><td>'+ sunriseTime +'</td></tr>' +
	'<tr><td> Zachód:      </td><td>'+ sunsetTime  +'</td></tr>' +
	'<tr><td> Ciśnienie:   </td><td>'+ pressure    +' hPa</td></tr>' +
	'<tr><td> Kraj:        </td><td>'+ fcountry(country) +'</td></tr>' + // function
	'</table>'
	);	

	result.innerHTML = html;
	getTimeSeunSet(sunset);
	changeImg(main);
}

function ajax(miasto) {

	// Klucz do API
	const APIkey = 'your API key';
	const API = 'https://api.openweathermap.org/data/2.5/weather?q=' + miasto + '&APPID=' + APIkey + '&units=metric&lang=pl';

	// if you have key - delete it below
	if(APIkey === 'your API key') {
		const resultKey = document.getElementById('result')
		resultKey.style.fontSize = "30px"
		resultKey.innerText = 'before using it, you need to enter API key in the file - script.js, info in README';
		return;
	}

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status === 200) 
			{
				var res = this.responseText;
				var data = JSON.parse(res);
				// console.warn('data JSON: ' + data);

				var dataJSON = {};

				// dataJSON z danymi pogodowymi z data - JSON
				var time          = new Date().toLocaleString();
				dataJSON.date     = time;
				dataJSON.sunrise  = data.sys.sunrise;
				dataJSON.sunset   = data.sys.sunset;
				dataJSON.temp     = data.main.temp;
				dataJSON.pressure = data.main.pressure;
				dataJSON.wind     = data.wind.speed;
				dataJSON.lon      = data.coord.lon;
				dataJSON.lat      = data.coord.lat;
				dataJSON.city     = miasto[0].toUpperCase() + miasto.toLowerCase().substring(1);
				// new data added
				dataJSON.main        = data.weather[0].main;  // Clear
				dataJSON.description = data.weather[0].description;
				dataJSON.icon        = data.weather[0].icon;
				dataJSON.humidity    = data.main.humidity; // 92    humidity - wilgotność
				dataJSON.all         = data.clouds.all;    // 0
				dataJSON.country     = data.sys.country;   // PL

				getResult(dataJSON);
			} else if (xhr.status === 404) {
				// nie znaleziono miasta
				getResultEmpty();
				removeCleass();
				checkHour();
			} else if (xhr.status === 400) {
				// brak podanego miasta do geocode
				var result = document.getElementById('result');
				result.innerHTML = "";
				checkHour();
			}
		}
	xhr.open('GET', API, true);
	xhr.send();
}

function changeImg(weather) {
	document.body.classList.add('opacity');

	removeCleass();

	// Zdjęcie class dla - Brak miasta: dzien/noc
	document.body.classList.remove('showImgDay');
	document.body.classList.remove('showImgNight');

	if(weather == 'Thunderstorm') {
		document.body.classList.add('Thunderstorm');
	}
	if(weather == 'Drizzle') {
		document.body.classList.add('Drizzle');
	}
	if(weather == 'Rain') {
		document.body.classList.add('Rain');	
	}
	if(weather == 'Snow') {
		document.body.classList.add('Snow');	
	}			
	if(weather == 'Mist') {
		document.body.classList.add('Mist');	
	}
	if(weather == 'Smoke') {
		document.body.classList.add('Smoke');	
	}
	if(weather == 'Haze') {
		document.body.classList.add('Haze');	
	}
	if(weather == 'Fog') {
		document.body.classList.add('Fog');
	}
	if(weather == 'Sand') {
		document.body.classList.add('Sand');	
	}
	if(weather == 'Dust') {
		document.body.classList.add('Dust');	
	}
	if(weather == 'Ash') {
		document.body.classList.add('Ash');
	}
	if(weather == 'Squall') {
		document.body.classList.add('Squall');	
	}
	if(weather == 'Tornado') {
		document.body.classList.add('Tornado');	
	}
	if(weather == 'Clear') {
		document.body.classList.add('Clear');	
	}
	if(weather == 'Clouds') {
		document.body.classList.add('Clouds');
	}
		// Thunderstorm.jpg)'; // Burzowo		
		// Drizzle.jpg)';      // Mżawka
		// Rain.jpg)';         // Deszczowo
		// Snow.jpg)';         // Śnieg
		// Mist.jpg)';         // Zamglenie
		// Smoke.jpg)';        // Zadymienie
		// Haze.jpg)';         // Mgiełka
		// Fog.jpg)';          // Mgliście
		// Sand.jpg)';  	   // Pisczyście
		// Dust.jpg)';  	   // Zapylenie
		// Ash.jpg)';  	       // Popiół
		// Squall.jpg)';       // Szkwał
		// Tornado.jpg)';      // Tornado
		// Clear.jpg)';        // Bezchmurnie
		// Clouds.jpg)';       // Pochmurnie
}

function checkHour() {
	var day = new Date();
	var hour=day.getHours();
	// console.log('hour =' + hour);
	var dzien = document.querySelector('#wrapper h1');
	var dzien_noc = 19;

	if(hour >=0 && hour<7) {
		// document.body.style.backgroundColor = 'gray';			
		// document.body.style.backgroundImage = 'url(img/noc.jpg)';
		document.body.classList.add('showImgNight');
	} 
	else if(hour >= 7 && hour <= dzien_noc) {
		// document.body.style.backgroundColor = '#eee';
		// document.body.style.backgroundImage = 'url(img/dzien.jpg)';
		document.body.classList.add('showImgDay');
	}
	else if(hour > dzien_noc && hour <= 23) {
		// document.body.style.backgroundColor = 'red';			
		// document.body.style.backgroundImage = 'url(img/noc.jpg)';
		document.body.classList.add('showImgNight');
		// dzien.classList.add('noc');
	} else {
		document.body.style.backgroundColor = 'black';
	}
		
}

function init() {
	checkHour();
	var input = document.getElementById('input');

	// ajax(input.value);
	input.oninput = function () {
		var miasto = input.value;
		ajax(miasto);
	};	
}

window.onload = init;