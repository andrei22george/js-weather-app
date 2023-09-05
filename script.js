const apiKey = "174fb26710e15da9151f806fe1146ed1";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";

    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";
    document.querySelector(".realfeel").innerHTML =
      Math.round(data.main.feels_like) + "°C";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " atm";
    
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunriseTime = sunriseDate.getHours() + ':' + sunriseDate.getMinutes();
    document.querySelector(".sunrise").innerHTML = sunriseTime;

    const sunsetDate = new Date(data.sys.sunset * 1000);
    const sunsetTime = sunsetDate.getHours() + ':' + sunsetDate.getMinutes();
    document.querySelector(".sunset").innerHTML = sunsetTime;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
