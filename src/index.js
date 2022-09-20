let now = new Date();
let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
let day = days[now.getDay()];
let mins = now.getMinutes();
let hours = now.getHours();
let fullDate = `${day} ${hours}:${mins}`;

let h3 = document.querySelector("h3");
h3.innerHTML = fullDate;


function showWeather(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let min = document.querySelector("#min");
  let max = document.querySelector("#max");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let pressure = document.querySelector("#pressure");
  let description = document.querySelector("#description");
  h1.innerHTML = response.data.name;
  h2.innerHTML = `${Math.round(response.data.main.temp)}°`;
  min.innerHTML = `Min:${Math.round(response.data.main.temp_min)}°`;
  max.innerHTML = `Max:${Math.round(response.data.main.temp_max)}°`;
  wind.innerHTML = `Wind Speed:${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  pressure.innerHTML = `Pressure:${response.data.main.pressure} mb`;
  description.innerHTML = `${response.data.weather[0].description}`;

  console.log(response.data);
}

function getPosition(position) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(geoURL).then(showWeather);
}

function seachCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityName = city.value;
  Getcity(cityName);
}

function Getcity(Cityname) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  console.log(Cityname);
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}
function navigate() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let geoButton = document.querySelector("#geoButton");
geoButton.addEventListener("click", navigate);

let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", seachCity);