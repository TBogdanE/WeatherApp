import { WeatherDataHandler, updateData } from "./handleData";

const API_KEY = "4ca2a973e04f4f71815125523233011";
let weatherData = null;

const getWeatherData = async (address) => {
  try {
    const responseForecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${address}&days=7`,
      { mode: "cors" }
    );
    const dataForecast = await responseForecast.json();

    console.log(dataForecast);

    weatherData = new WeatherDataHandler(dataForecast);

    updateData(weatherData);
  } catch (error) {
    console.error(error);
  }
};

export { weatherData, getWeatherData };
