import { locationSearch } from "./webpage";
import { getWeatherData } from "./weatherApi";

//creates the page for first time users
const initialPage = () => {
  const body = document.querySelector("body");
  const initialPage = document.createElement("div");
  initialPage.id = "initial-page";

  const title = document.createElement("div");
  title.id = "initial-page-title";
  title.textContent = "TBWeather";

  const text = document.createElement("div");
  text.id = "initial-page-text";
  text.textContent =
    "First time here? Search for a country or city around the world :)";

  const form = document.createElement("form");
  form.id = "initial-page-form";

  const formInput = document.createElement("input");
  formInput.type = "text";
  formInput.id = "initial-page-input";

  const footer = document.createElement("div");
  footer.id = "initial-page-footer";
  footer.textContent = "Project made following TOP curriculum by TBogdanE";

  const handleSearchInput = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      getWeatherData(locationSearch(formInput.value), true);
      formInput.value = "";
      body.removeChild(initialPage);
    }
  };

  formInput.addEventListener("keydown", handleSearchInput);

  body.appendChild(initialPage);
  initialPage.appendChild(title);
  initialPage.appendChild(text);
  initialPage.appendChild(form);
  form.appendChild(formInput);
  initialPage.appendChild(footer);
};

//creates and handles the data on today forecast card
const updateTodayCard = (weatherData) => {
  const weather = weatherData.getDay0();

  const icon = document.getElementById("today-weather-icon");
  icon.id = "today-weather-icon";
  icon.src = weather.icon;

  const todayTemp = document.getElementById("today-weather-temp");
  todayTemp.textContent = weather.todayTemp;

  const locationName = document.getElementById("today-weather-name");
  locationName.textContent = weather.name;

  const country = document.getElementById("today-weather-country");
  country.textContent = weather.country;

  const tempFeel = document.getElementById("today-weather-feel");
  tempFeel.textContent = `Feels like ${weather.feelsLike}`;

  const windSpeed = document.getElementById("today-weather-sct-wind-value");
  windSpeed.textContent = weather.wind;

  const windDir = document.getElementById("today-weather-sct-wind-dir-value");
  windDir.textContent = weather.windDir;

  const humidity = document.getElementById("today-weather-sct-humidity-value");
  humidity.textContent = weather.humidity;

  const pressure = document.getElementById("today-weather-sct-pressure-value");
  pressure.textContent = weather.pressure;

  const uvLevel = document.getElementById("today-weather-sct-uv-value");
  uvLevel.textContent = weather.uvLevele;
};

//creates and handles the data on specific day of the actual week card
const weekDay = (weatherData) => {
  const data = weatherData;

  const box = document.getElementById("week-forecast-sct");

  const card = document.createElement("div");
  card.classList.add("forecast-sct-box");

  const icon = document.createElement("img");
  icon.id = "weekly-forecast-sct-icon";
  icon.src = weatherData.icon;

  const temperature = document.createElement("div");
  temperature.classList.add("forecast-sct-temp");
  temperature.textContent = data.temp;

  const range = document.createElement("div");
  range.classList.add("forecast-sct-range");
  range.textContent = `${data.minTemp} / ${data.maxTemp}`;

  const rain = document.createElement("div");
  rain.classList.add("forecast-sct-chances-rain");
  rain.textContent = `${data.rain}%`;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
  card.appendChild(range);
  card.appendChild(rain);
};

//updates the week forecast sct with the data for everyday
const updateWeekSct = (weatherData) => {
  clearDisplay("#week-forecast-sct");
  weekDay(weatherData.getWeekDay(0));
  weekDay(weatherData.getWeekDay(1));
  weekDay(weatherData.getWeekDay(2));
  weekDay(weatherData.getWeekDay(3));
  weekDay(weatherData.getWeekDay(4));
  weekDay(weatherData.getWeekDay(5));
  weekDay(weatherData.getWeekDay(6));
};

//updates the hourly forecast sct with data
const updateHourlySct = (weatherData) => {
  clearDisplay(".slider");
  const data = weatherData;
  const currentHour = new Date().getHours();
  const today = 0;
  const tommorow = 1;

  for (let i = 0; i < 24; i++) {
    //displays the hourly forecast, for the next 24 hours, for today and tommorow
    let hour = (currentHour + i) % 24;
    if (hour >= currentHour) {
      hourlyForecast(hour, data.getHourly(today, hour));
    } else {
      hourlyForecast(hour, data.getHourly(tommorow, hour));
    }
  }
};

//creates and handles the data for today hourly forecast
const hourlyForecast = (hour, weatherData) => {
  const box = document.querySelector(".slider");

  const card = document.createElement("div");
  card.classList.add("hourly-forecast-sct-box");

  const icon = document.createElement("img");
  icon.id = "hourly-forecast-sct-icon";
  icon.src = weatherData.icon;

  const temperature = document.createElement("div");
  temperature.classList.add("forecast-sct-temp");
  temperature.textContent = weatherData.hourTemp;

  const rain = document.createElement("div");
  rain.classList.add("forecast-sct-chances-rain");
  rain.textContent = `${weatherData.rain}%`;

  const uv = document.createElement("div");
  uv.classList.add("forecast-sct-uv");
  uv.textContent = `UV ${weatherData.uv}`;

  const time = document.createElement("div");
  time.classList.add("forecast-sct-time");
  time.textContent = `${hour}:00`;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
  card.appendChild(rain);
  card.appendChild(uv);
  card.appendChild(time);
};

//clears displayed data on specific sct
const clearDisplay = (element) => {
  const box = document.querySelector(element);
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

//makes the first btn of the location nav bar, active
const initializeBtnState = () => {
  const nav = document.getElementById("locationNav");
  if (nav.firstElementChild) {
    setBtnActive(nav.firstElementChild);
  }
};

//sets the btns of the location nav bar active
const setBtnActive = (btn) => {
  const nav = document.getElementById("locationNav");
  nav.querySelectorAll(".navLocationBtn").forEach((otherBtn) => {
    otherBtn.classList.remove("active");
  });

  btn.classList.add("active");
};

const invalidLocationUi = () => {
  const input = document.getElementById("input-location");
  input.classList.add("input-location-error");

  setTimeout(() => {
    input.classList.remove("input-location-error");
  }, 2000);
};

//slider for hourly forecast
const slider = document.querySelector(".slider");
let currentIndex = 0;

const scrollHourly = (direction) => {
  const elementWidth = document.querySelector(
    ".hourly-forecast-sct-box"
  ).offsetWidth;
  currentIndex = Math.max(
    0,
    Math.min(currentIndex + direction, slider.children.length - 1)
  );
  const newPosition = -currentIndex * elementWidth;

  slider.style.transform = `translateX(${newPosition}px)`;
};

document
  .getElementById("previous-btn")
  .addEventListener("click", () => scrollHourly(-1));
document
  .getElementById("next-btn")
  .addEventListener("click", () => scrollHourly(1));

export {
  initialPage,
  updateHourlySct,
  updateTodayCard,
  updateWeekSct,
  initializeBtnState,
  setBtnActive,
  invalidLocationUi,
};
