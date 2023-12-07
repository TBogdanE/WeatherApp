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

const updateWeekSct = (weatherData) => {
  weekDay(weatherData.getWeekDay0());
  weekDay(weatherData.getWeekDay1());
  weekDay(weatherData.getWeekDay2());
  weekDay(weatherData.getWeekDay3());
  weekDay(weatherData.getWeekDay4());
  weekDay(weatherData.getWeekDay5());
  weekDay(weatherData.getWeekDay6());
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
  temperature.textContent = data.temp;

  box.appendChild(card);
  card.appendChild(icon);
  card.appendChild(temperature);
};

export { updateTodayCard, updateWeekSct };
