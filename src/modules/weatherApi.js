const API_KEY = "4ca2a973e04f4f71815125523233011";

const getWeatherData = async (address) => {
  try {
    const responseCurrent = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${address}`,
      { mode: "cors" }
    );
    const responseForecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${address}`,
      { mode: "cors" }
    );
    console.log(responseCurrent, responseForecast);
  } catch (error) {
    console.error(error);
    console.log("eroare");
  }
};

export { getWeatherData };
