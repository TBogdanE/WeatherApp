import { temperatureUnits } from "./webpage";
import { updateTodayCard } from "./handleUi";
import { weatherData } from "./weatherApi";

class WeatherDataHandler {
  constructor(weatherData) {
    this.todayWeather = new WeatherDay(weatherData);
    console.log(weatherData.forecast.forecastday);
    /*this.forecastWeather = weatherData.forecast.forecastday.map(
      (day) => new WeatherDay(day)
    );*/
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
      console.log("c to f");
    } else {
      this.todayTemp = data.current.temp_f;
      this.feelsLike = data.current.feelslike_f;
      console.log("f to c");
    }
  }
}

const updateData = (weatherData) => {
  updateTodayCard(weatherData);
};

export { WeatherDataHandler, WeatherDay, updateData };
