const updateTodayCard = (weatherData) => {
  const weather = weatherData.getDay0();

  const iconBox = document.getElementById("today-weather-icon-box");
  const icon = document.createElement("img");
  icon.id = "today-weather-icon";
  //icon.src = getIcons();
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

  console.log(data);

  const box = document.getElementById("week-forecast-sct");

  const card = document.createElement("div");
  card.classList.add("week-forecast-sct-box");

  const icon = document.createElement("img");
  icon.classList.add("week-forecast-sct-icon");
  icon.src = "../src/assets/images/testicon.jpeg";

  const temperature = document.createElement("div");
  temperature.classList.add("week-forecast-sct-temp");
  temperature.textContent = `${data.temp}°`;

  const range = document.createElement("div");
  range.classList.add("week-forecast-sct-range");
  range.textContent = `${data.minTemp}° / ${data.maxTemp}°`;

  const rain = document.createElement("div");
  rain.classList.add("week-forecast-sct-chances-rain");
  rain.textContent = `${data.rain}%`;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
  card.appendChild(range);
  card.appendChild(rain);
};

const updateWeekSct = (weatherData) => {
  clearDisplay("week-forecast-sct");
  weekDay(weatherData.getWeekDay(0));
  weekDay(weatherData.getWeekDay(1));
  weekDay(weatherData.getWeekDay(2));
  weekDay(weatherData.getWeekDay(3));
  weekDay(weatherData.getWeekDay(4));
  weekDay(weatherData.getWeekDay(5));
  weekDay(weatherData.getWeekDay(6));
};

const hourlyForecast = (weatherData) => {
  const data = weatherData;

  const box = document.getElementById("week-forecast-sct");

  const card = document.createElement("div");
  card.classList.add("week-forecast-sct-box");

  const icon = document.createElement("img");
  icon.classList.add("week-forecast-sct-icon");
  icon.src = "../src/assets/images/testicon.jpeg";

  const temperature = document.createElement("div");
  temperature.classList.add("week-forecast-sct-temp");
  temperature.textContent = `${data.temp}°`;

  const rain = document.createElement("div");
  rain.classList.add("week-forecast-sct-chances-rain");
  rain.textContent = `${data.rain}%`;

  const uv = document.createElement("div");
  uv.classList.add("week-forecast-sct-uv");
  uv.textContent = `UV ${data.uv}`;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
  card.appendChild(rain);
  card.appendChild(uv);
};

const updateHourlySct = (weatherData) => {
  console.log("hourly", weatherData.getHourly());
};

const clearDisplay = (id) => {
  const box = document.getElementById(id);
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
};

export { updateHourlySct, updateTodayCard, updateWeekSct };
