import { temperatureUnits } from "./webpage";
import { updateHourlySct, updateTodayCard, updateWeekSct } from "./handleUi";
import { weatherStatus } from "./weather_conditions";

//variables
let weatherLocationList = [];
const CELSIUS = "Celsius";
const FAHRENHEIT = "Fahrenheit";

//this class will take all the data from the server
//and based on that data, will create new classes that
//handles the hourly, today, and weekly forecast
class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData);
    this.hourlyWeather = new WeatherHourly(weatherData.forecast.forecastday);
    this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherWeek(day)
    );
  }

  //returns data for every hour, of specific day
  getHourly(day, hour) {
    return this.hourlyWeather.getData(day, hour);
  }

  //returns all data for today forecast
  getDay0() {
    return this.todayWeather;
  }

  //returns data for day of the week
  getWeekDay(day) {
    return this.forecastWeather[day];
  }
}

//manages the data for hourly forecast
class WeatherHourly {
  constructor(data) {
    this.hourlyData = data;
    this.icon = null;
    this.hourTemp = null;
    this.rain = null;
    this.uv = null;
  }

  //this method returns data for a specific hour, of a specific day
  getData(day, hour) {
    this.icon = getIcon(this.hourlyData[day].hour[hour].condition.code);
    this.hourTemp = this.weatherUnits(day, hour);
    this.rain = this.hourlyData[day].hour[hour].chance_of_rain;
    this.uv = this.hourlyData[day].hour[hour].uv;
    return {
      icon: this.icon,
      rain: this.rain,
      uv: this.uv,
      hourTemp: this.hourTemp,
    };
  }

  //returns the forecast in C and F
  weatherUnits(day, hour) {
    if (temperatureUnits === CELSIUS) {
      return this.hourlyData[day].hour[hour].temp_c;
    } else {
      return this.hourlyData[day].hour[hour].temp_f;
    }
  }
}

//handles the data for today forecast
class WeatherDay {
  constructor(data) {
    this.icon = getIcon(data.current.condition.code);
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

  //returns the forecast in C and F
  weatherUnits(data) {
    if (temperatureUnits === CELSIUS) {
      this.todayTemp = data.current.temp_c;
      this.feelsLike = data.current.feelslike_c;
    } else {
      this.todayTemp = data.current.temp_f;
      this.feelsLike = data.current.feelslike_f;
    }
  }
}

//handles the forecast data for every day of the week
class WeatherWeek {
  constructor(data) {
    this.icon = getIcon(data.day.condition.code);
    this.temp = null;
    this.minTemp = null;
    this.maxTemp = null;
    this.rain = data.day.daily_chance_of_rain;
    this.hourly = null;
    this.weatherUnits(data);
  }
  //returns the forecast in C and F
  weatherUnits(data) {
    if (temperatureUnits === CELSIUS) {
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

//returns the icon from the folder, based on a specific code from the API
const getIcon = (code) => {
  const iconObj = weatherStatus.find((obj) => obj.code === code);
  const hour = new Date().getHours();
  //checks if it's day/night and returns the data
  if (hour < 20 && hour > 6) {
    return `../src/assets/weather icons/day/${iconObj.icon}.png`;
  } else {
    return `../src/assets/weather icons/night/${iconObj.icon}.png`;
  }
};

//if data is fetched, this will update the data
const updateData = (weatherData) => {
  updateTodayCard(weatherData);
  updateHourlySct(weatherData);
  updateWeekSct(weatherData);
};

export { weatherLocationList, WeatherDataHandler, WeatherDay, updateData };
