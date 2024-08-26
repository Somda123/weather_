// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
// const apiKey = '7e1d467bf2914b51d47c0e460014b5bb';
const apiKey = '8994d0ba7c6e4900972b71f38d1ba4c0';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeather(city) {
    fetch(`${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function fetchForecast(city) {
    fetch(`${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '200') {
                displayForecast(data);
                // return data
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

// fetchForecast(city)
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    let currentDate = new Date();
    // console.log(currentDate); // e.g., Sat Aug 24 2024 12:34:56 GMT+0530 (India Standard Time)
    
    weatherInfo.innerHTML = `
        <div class="current-now">
            <h3>${data.name}, ${data.sys.country}</h3>
        
                <p>${currentDate}</p>
             <p>Longitude: ${data.coord.lat} Degrees, Minutes, and Seconds(N)</p>
             <p>Latitude: ${data.coord.lon} Degrees, Minutes, and Seconds(E)</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Pressure: ${data.main.pressure}hPa</p>
            <p>Sea-level: ${data.main.sea_level}h</p>
             <p>Wind Speed: ${data.wind.speed} m/s</p>
             <p>Wind direction: ${data.wind.deg} deg</p>
            

            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
        </div>
    `;
}

function displayForecast(data) {
    const forecastInfo = document.getElementById('forecast-info');
    forecastInfo.innerHTML = '';

    const forecastList = data.list.filter((item, index) => index % 8 === 0);
    forecastList.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', hour: "2-digit"});

        forecastInfo.innerHTML += `
            <div class="forecast-day">
                <p>${date}</p>
                
                <p>Temp: ${day.main.temp}°C</p>
                <p>Weather: ${day.weather[0].description}</p>
                <p>Speed: ${day.wind.speed} m/s</p>

                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;

       
    });
}






















// { <p> Date : ${day.dt_txt}</p> }

// <p>Sunrise: ${data.sys.sunrise} </p>
//             <p>Sunset: ${data.sys.sunset} </p>




