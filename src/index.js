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
if (mins < 10) {
    mins = `0${mins}`;
    
}
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
    
}
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
    let mainCloud = document.querySelector("#mainCloud");
     celsius = response.data.main.temp;
  h1.innerHTML = response.data.name;
  h2.innerHTML = `${Math.round(celsius)}°`;
  min.innerHTML = `Min:${Math.round(response.data.main.temp_min)}°`;
  max.innerHTML = `Max:${Math.round(response.data.main.temp_max)}°`;
  wind.innerHTML = `Wind Speed:${Math.round(response.data.wind.speed)}km/h`;
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  pressure.innerHTML = `Pressure:${response.data.main.pressure} mb`;
  description.innerHTML = `${response.data.weather[0].description}`;
mainCloud.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  mainCloud.setAttribute("alt", response.data.weather[0].description )
   
}

function getPosition(position) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(geoURL).then(showWeather);
    fTemp.classList.remove("c-temp");
    cTemp.classList.add("c-temp");
}

function seachCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityName = city.value;
    Getcity(cityName);
    fTemp.classList.remove("c-temp");
    cTemp.classList.add("c-temp");
}

function Getcity(Cityname) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);
}

function getFahren(event) {
    event.preventDefault();
    let h2 = document.querySelector("h2")
h2.innerHTML = ` ${Math.round((celsius * 9) / 5 + 32)}°`;
    fTemp.classList.add("c-temp")
    cTemp.classList.remove("c-temp");
}
function getCelsius(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = ` ${Math.round(celsius)}°`;
 fTemp.classList.remove("c-temp");
 cTemp.classList.add("c-temp");
}

let forecastHTML = document.querySelector("#forecastHTML");
let forecastElement = `<div class = row>`
let javaDays = [`fri`, `sat`, `sun` , `mon`, `tue`, `wed`];
javaDays.forEach((day) => {
  forecastElement =
    forecastElement +
    ` <div class="col-2"><h5>${day}</h5>
        <img src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png" alt="">
        <p>22*</p></div>`;
});
forecastElement = forecastElement + `</div>`;
forecastHTML.innerHTML = forecastElement;

let celsius = null;
let geoButton = document.querySelector("#geoButton");
geoButton.addEventListener("click", navigate);
function navigate() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", seachCity);

let fTemp = document.querySelector(".f-temp")
fTemp.addEventListener("click", getFahren);

let cTemp = document.querySelector(".c-temp");
cTemp.addEventListener("click", getCelsius);
Getcity("paris")