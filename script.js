function displayTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    timeElement.textContent = timeString;
}

function fetchWeatherByIP() {
    fetch("https://ipinfo.io/json")
        .then((response) => response.json())
        .then((data) => {
            const city = data.city;
            const countryCode = data.country;
            const weatherApiKey = "60342d3bd00b808b63e2a3217c8e1136";
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${weatherApiKey}&units=metric`;

            fetch(weatherApiUrl)
                .then((response) => response.json())
                .then((weatherData) => {
                    displayWeather(weatherData, city);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching IP data:", error);
        });
}

function displayWeather(weatherData, city) {
    const weatherIconElement = document.getElementById("weather-icon");
    const weatherTemperatureElement = document.getElementById("weather-temperature");
    const cityElement = document.getElementById("city");

    const iconId = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;

    const iconClass = getWeatherIconClass(iconId);

    weatherIconElement.className = `fas ${iconClass}`;
    weatherTemperatureElement.textContent = `${temperature}°C`;
    cityElement.textContent = `City: ${city}`;
}


function getWeatherIconClass(iconId) {
    const iconMappings = {
        '01d': 'fa-sun', // clear sky (day)
        '02d': 'fa-cloud-sun', // few clouds (day)
        '03d': 'fa-cloud', // scattered clouds (day)
        '04d': 'fa-cloud', // broken clouds (day)
        '09d': 'fa-cloud-showers-heavy', // showers (day)
        '10d': 'fa-cloud-rain', // rain (day)
        '11d': 'fa-bolt', // thunderstorm (day)
        '13d': 'fa-snowflake', // snow (day)
        '50d': 'fa-smog', // mist/fog (day)
        '01n': 'fa-moon', // clear sky (night)
        '02n': 'fa-cloud-moon', // few clouds (night)
        '03n': 'fa-cloud', // scattered clouds (night)
        '04n': 'fa-cloud', // broken clouds (night)
        '09n': 'fa-cloud-showers-heavy', // showers (night)
        '10n': 'fa-cloud-rain', // rain (night)
        '11n': 'fa-bolt', // thunderstorm (night)
        '13n': 'fa-snowflake', // snow (night)
        '50n': 'fa-smog', // mist/fog (night)
        '02d': 'fa-cloud', // clouds (day)
        '02n': 'fa-cloud', // clouds (night)
        '50d': 'fa-smog', // smog (day)
        '50n': 'fa-smog', // smog (night)
    };

    return iconMappings[iconId] || 'fa-question';
}

let isBackgroundSet = false;

function fetchRandomHighQualityBackground(query) {
    if (isBackgroundSet) {
        return;
    }

    const pexelsApiKey = "h6R3t297jH8RVUE99OpJAdcZx0qppqS5AFOPrJWGCoxnbS4vzSVx6XuK";
    const baseUrl = "https://api.pexels.com/v1/search";
    const perPage = 1;

    const randomQuery = query[Math.floor(Math.random() * query.length)];
    const pexelsApiUrl = `${baseUrl}?query=${randomQuery}&per_page=${perPage}`;

    fetch(pexelsApiUrl, {
        headers: {
            Authorization: pexelsApiKey,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.photos && data.photos.length > 0) {
            const photo = data.photos[0];
            const imageUrl = `${photo.src.original}`;
            document.body.style.backgroundImage = `url(${imageUrl})`;
            isBackgroundSet = true;
            displayPhotographerName(photo.photographer);
        } else {
            console.error("No photos found for the query:", randomQuery);
        }
    })
    .catch((error) => {
        console.error("Error fetching high-quality background image:", error);
    });
}
function displayPhotographerName(photographerName) {
    const photographerNameElement = document.getElementById("photographer-name");
    photographerNameElement.textContent = photographerName;
}


const queries = ["gradient", "landscape", "nature", "city", "abstract", "architecture", "water", "sky", "beach", "mountain", "forest", "sunset", "sunrise", "space", "winter", "summer", "spring", "autumn", "road", "bridge"];
fetchRandomHighQualityBackground(queries);



displayTime();
fetchWeatherByIP();
setInterval(displayTime, 1000);

app.use(express.static('public'))