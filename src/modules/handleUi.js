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

export { updateTodayCard };
