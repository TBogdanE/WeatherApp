import { temperatureUnits } from "./webpage";
import { updateTodayCard, updateWeekSct } from "./handleUi";

class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData);
    //console.log("class", weatherData.forecast.forecastday);
    this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherWeek(day)
    );
  }

  getDay0() {
    return this.todayWeather;
  }

  getWeekDay0() {
    return this.forecastWeather[0];
  }
  
  getWeekDay1() {
    return this.forecastWeather[1];
  }

  getWeekDay2() {
    return this.forecastWeather[2];
  }

  getWeekDay3() {
    return this.forecastWeather[3];
  }

  getWeekDay4() {
    return this.forecastWeather[4];
  }

  getWeekDay5() {
    return this.forecastWeather[5];
  }

  getWeekDay6() {
    return this.forecastWeather[6];
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
  updateWeekSct(weatherData);
};

export { WeatherDataHandler, WeatherDay, updateData };
