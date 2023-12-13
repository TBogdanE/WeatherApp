import {
  WeatherDataHandler,
  updateData,
  weatherLocationList,
} from "./handleData";
import { locationNav } from "./webpage";
import { updateLocalStorage } from "./localStorage";

const API_KEY = "4ca2a973e04f4f71815125523233011";
let weatherData = null;

const getWeatherData = async (address) => {
  if (weatherLocationList.includes(address)) {
    console.error("Address already exists!");
    return;
  }
  try {
    const responseForecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${address}&days=7`,
      { mode: "cors" }
    );
    const dataForecast = await responseForecast.json();
    console.log(dataForecast);
    weatherData = new WeatherDataHandler(dataForecast);
    updateData(weatherData);
    updateLocalStorage(address);
    locationNav();
  } catch (error) {
    console.error(error);
  }
};

const getIcons = async (weatherCode) => {
  try {
    const iconResponse = await fetch(
      `http://openweathermap.org/img/wn/${weatherCode}.png`
    );
    console.log(iconResponse);
  } catch (error) {
    console.error("Error fetching icons", error);
  }
};

export { weatherData, getWeatherData, getIcons };
