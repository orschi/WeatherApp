let now = new Date();
console.log(new Date());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response);
  document.querySelector("#your-city").innerHTML = response.data.name;
  let temperature = document.querySelector("#current-temperature");
  let roundedTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${roundedTemp} °C`;
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "36b8c47c794332f84c9befaa300e35a7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "36b8c47c794332f84c9befaa300e35a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let yourCityForm = document.querySelector("#city-search-form");
yourCityForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Berlin");
