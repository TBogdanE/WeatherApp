import { temperatureUnits } from "./webpage";
import { updateHourlySct, updateTodayCard, updateWeekSct } from "./handleUi";

let weatherLocationList = [];

class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData);
    this.hourlyWeather = new WeatherHourly(weatherData.forecast.forecastday);
    this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherWeek(day)
    );
  }

  getHourly(day, hour) {
    return this.hourlyWeather.getData(day, hour);
  }

  getDay0() {
    return this.todayWeather;
  }

  getWeekDay(day) {
    return this.forecastWeather[day];
  }
}

class WeatherHourly {
  constructor(data) {
    this.hourlyData = data;
    this.hourTemp = null;
    this.rain = null;
    this.uv = null;
  }

  getData(day, hour) {
    this.hourTemp = this.weatherUnits(day, hour);
    this.rain = this.hourlyData[day].hour[hour].chance_of_rain;
    this.uv = this.hourlyData[day].hour[hour].uv;
    //this.weatherUnits(day, hour);
    return {
      rain: this.rain,
      uv: this.uv,
      hourTemp: this.hourTemp,
    };
  }

  weatherUnits(day, hour) {
    if (temperatureUnits === "Celsius") {
      return this.hourlyData[day].hour[hour].temp_c;
    } else {
      return this.hourlyData[day].hour[hour].temp_f;
    }
  }
}

class WeatherDay {
  constructor(data) {
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

export { weatherLocationList, WeatherDataHandler, WeatherDay, updateData };
