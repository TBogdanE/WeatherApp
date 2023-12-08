import { temperatureUnits } from "./webpage";
import { updateHourlySct, updateTodayCard, updateWeekSct } from "./handleUi";

class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData);
    //console.log("class", weatherData.forecast.forecastday);
    this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherWeek(day)
    );
  }

  getHourly(day) {
    return this.todayWeather.hourly[day].hour;
  }

  getDay0() {
    return this.todayWeather;
  }

  getWeekDay(day) {
    return this.forecastWeather[day];
  }
}

class WeatherDay {
  constructor(data) {
    this.units = temperatureUnits;
    this.todayTemp = null;
    this.feelsLike = null;
    this.country = data.location.country;
    this.name = data.location.name;
    this.wind = data.current.wind_kph;
    this.windDir = data.current.wind_dir;
    this.humidity = data.current.humidity;
    this.pressure = data.current.pressure_mb;
    this.uvLevele = data.current.uv;
    this.hourly = data.forecast.forecastday;
    this.weatherUnits(data);
  }

  weatherUnits(data) {
    if (temperatureUnits === "Celsius") {
      this.todayTemp = data.current.temp_c;
      this.feelsLike = data.current.feelslike_c;
    } else {
      this.todayTemp = data.current.temp_f;
      this.feelsLike = data.current.feelslike_f;
    }
  }
}

class WeatherWeek {
  constructor(data) {
    this.temp = null;
    this.minTemp = null;
    this.maxTemp = null;
    this.rain = data.day.daily_chance_of_rain;
    this.hourly = null;
    this.weatherUnits(data);
  }

  weatherUnits(data) {
    if (temperatureUnits === "Celsius") {
      this.temp = data.day.avgtemp_c;
      this.minTemp = data.day.mintemp_c;
      this.maxTemp = data.day.maxtemp_c;
    } else {
      this.temp = data.day.avgtemp_f;
      this.minTemp = data.day.mintemp_f;
      this.maxTemp = data.day.maxtemp_f;
    }
  }
}

const updateData = (weatherData) => {
  updateTodayCard(weatherData);
  updateHourlySct(weatherData);
  updateWeekSct(weatherData);
};

export { WeatherDataHandler, WeatherDay, updateData };
