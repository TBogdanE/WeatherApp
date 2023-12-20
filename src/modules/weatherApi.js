import {
  WeatherDataHandler,
  updateData,
  weatherLocationList,
} from "./handleData";
import { locationNav } from "./webpage";
import { updateLocalStorage } from "./localStorage";

const API_KEY = "6c1dab62db374a8ca86125637231412";
let weatherData = null;

const getWeatherData = async (address, update) => {
  if (weatherLocationList.includes(address) && update == true) {
    return;
  }
  try {
    const responseForecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${address}&days=7`,
      { mode: "cors" }
    );

    const dataForecast = await responseForecast.json();
    weatherData = new WeatherDataHandler(dataForecast);
    updateData(weatherData);
    console.log(dataForecast);

    if (update) {
      updateLocalStorage(address);
      locationNav();
    }
  } catch (error) {
    console.error(error);
  }
};

export { weatherData, getWeatherData };
