const updateTodayCard = (weatherData) => {
  const weather = weatherData.getDay0();

  const iconBox = document.getElementById("today-weather-icon-box");
  const icon = document.createElement("img");
  icon.id = "today-weather-icon";
  icon.src = weather.icon;
  iconBox.appendChild(icon);

  const todayTemp = document.getElementById("today-weather-temp");
  todayTemp.textContent = `${weather.todayTemp}°C`;

  const locationName = document.getElementById("today-weather-name");
  locationName.textContent = weather.name;

  const country = document.getElementById("today-weather-country");
  country.textContent = weather.country;

  const tempFeel = document.getElementById("today-weather-feel");
  tempFeel.textContent = `Feels like ${weather.feelsLike}°C`;

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

const weekDay = (weatherData) => {
  const data = weatherData;

  const box = document.getElementById("week-forecast-sct");

  const card = document.createElement("div");
  card.classList.add("forecast-sct-box");

  const icon = document.createElement("img");
  icon.classList.add("forecast-sct-icon");
  icon.src = weatherData.icon;

  const temperature = document.createElement("div");
  temperature.classList.add("forecast-sct-temp");
  temperature.textContent = `${data.temp}°`;

  const range = document.createElement("div");
  range.classList.add("forecast-sct-range");
  range.textContent = `${data.minTemp}° / ${data.maxTemp}°`;

  const rain = document.createElement("div");
  rain.classList.add("forecast-sct-chances-rain");
  rain.textContent = `${data.rain}%`;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
  card.appendChild(range);
  card.appendChild(rain);
};

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

const updateHourlySct = (weatherData) => {
  clearDisplay(".slider");
  const data = weatherData;
  const currentHour = new Date().getHours();
  const today = 0;
  const tommorow = 1;

  for (let i = 0; i < 24; i++) {
    let hour = (currentHour + i) % 24;
    if (hour >= currentHour) {
      hourlyForecast(hour, data.getHourly(today, hour));
    } else {
      hourlyForecast(hour, data.getHourly(tommorow, hour));
    }
  }
};

const hourlyForecast = (hour, weatherData) => {
  const box = document.querySelector(".slider");

  const card = document.createElement("div");
  card.classList.add("hourly-forecast-sct-box");

  const icon = document.createElement("img");
  icon.classList.add("forecast-sct-icon");
  icon.src = weatherData.icon;

  const temperature = document.createElement("div");
  temperature.classList.add("forecast-sct-temp");
  temperature.textContent = `${weatherData.hourTemp}°`;

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

const clearDisplay = (element) => {
  const box = document.querySelector(element);
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

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
export { updateHourlySct, updateTodayCard, updateWeekSct };
