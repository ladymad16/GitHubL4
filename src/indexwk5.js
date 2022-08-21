let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekdays[now.getDay()];

let dateToday = document.querySelector("h6");
dateToday.innerHTML = `${day} ${hours}:${minutes}`;

function newSearch(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input").value;
  searchOutput(citySearch);
}

function searchOutput() {
  let api = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "&units=imperial";
  let citySearch = document.querySelector("#search-input").value;
  let apiKey = "c712fd6c9b6c54df922e74bdafe74264";
  let url = `${api}${citySearch}&appid=${apiKey}${units}`;
  axios.get(url).then(tempOutput);
}

function tempOutput(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function locationButton(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "&units=imperial";
  let apiKey = "c712fd6c9b6c54df922e74bdafe74264";
  let url = `${api}lat=${lat}&lon=${lon}&appid=${apiKey}${units}`;
  axios.get(`${url}`).then(tempOutput);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationButton);
}

let currentButton = document.querySelector(".current-loc");
currentButton.addEventListener("click", showLocation);

let formCity = document.querySelector("#city-button");
formCity.addEventListener("submit", newSearch);

let newCity = document.querySelector(".search-bar");
newCity.addEventListener("submit", newSearch);
