import { getIcons } from "./weatherApi";
import { temperatureUnits } from "./webpage";

class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData.current);
    this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherDay(day)
    );
  }

  getDay0() {
    return this.todayWeather;
  }

  getDay1() {
    return this.forecastWeather[0];
  }
}

class WeatherDay {
  constructor(data) {
    this.units = temperatureUnits;
    this.todayTemp = null;
    this.feelsLike = null;
    this.wind = data.wind_kph;
    this.windDir = data.wind_dir;
    this.humidity = data.humidity;
    this.pressure = data.pressure_mb;
    this.uvLevele = data.uv;
    this.weatherUnits(data);
  }

  weatherUnits(data) {
    if (temperatureUnits === "Celsius") {
      this.todayTemp = data.temp_c;
      this.feelsLike = data.feelslike_c;
      console.log("c to f");
    } else {
      this.todayTemp = data.temp_f;
      this.feelsLike = data.feelslike_f;
      console.log("f to c");
    }
  }
}

const updateData = (weatherData) => {
  updateTodayCard(weatherData);
};

const updateTodayCard = (weatherData) => {
  const weather = weatherData.getDay0();

  const iconBox = document.getElementById("today-weather-icon-box");
  const icon = document.createElement("img");
  icon.id = "today-weather-icon";
  //icon.src = getIcons();
  iconBox.appendChild(icon);

  const todayTemp = document.getElementById("today-weather-temp");
  todayTemp.textContent = `${weather.todayTemp}°C`;

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

export { WeatherDataHandler, WeatherDay, updateData };
