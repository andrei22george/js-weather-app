const apiKey = '174fb26710e15da9151f806fe1146ed1'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const searchBox = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + ' km/h';

    if(data.weather[0].main === 'Clouds') {
        weatherIcon.src = 'images/clouds.png';
    } else if(data.weather[0].main === 'Clear') {
        weatherIcon.src = 'images/clear.png';
    } else if(data.weather[0].main === 'Rain') {
        weatherIcon.src = 'images/rain.png';
    } else if(data.weather[0].main === 'Drizzle') {
        weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main === 'Mist') {
        weatherIcon.src = 'images/mist.png';
    }
    
}

searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
});