import { weatherData, getWeatherData } from "./weatherApi";
import { updateData, weatherLocationList } from "./handleData";
import {
  initialLocalStorageCheck,
  removeLocalStorage,
  updateLocalStorage,
} from "./localStorage";

const CELSIUS = "Celsius";
const FAHRENHEIT = "Fahrenheit";
let temperatureUnits = CELSIUS;
let locationSearch = "";

//initialise the UI and check if browser supports local storage
const startApp = () => {
  leftMenu();
  inputLocation();
  initialLocalStorageCheck("localStorage");
};

//handles the location input form
const inputLocation = () => {
  const location = document.getElementById("input-location");

  location.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      locationSearch = location.value;
      event.preventDefault();
      getWeatherData(locationSearch);
      location.value = "";
    }
  });
};

//initialise the pop up menu
const leftMenu = () => {
  const body = document.querySelector("body");
  const btn = document.getElementById("menu-btn");

  //make menu dissapear on escape btn click
  btn.addEventListener("click", () => {
    const handleEscapeKey = (event) => {
      if ((menu && event.key === "Escape") || event.key === 27) {
        hideLeftMenu();
      }
    };

    //handles the cancelation of the left menu
    const hideLeftMenu = () => {
      if (body.contains(menu)) {
        body.removeChild(menu);
        body.removeEventListener("keydown", handleEscapeKey);
      }
    };

    //creates the body of the pop up menu
    const menu = document.createElement("div");
    menu.id = "menu-box";

    const toggleUnitsBtn = document.createElement("button");
    toggleUnitsBtn.id = "menu-toggle-units-btn";
    toggleUnitsBtn.textContent = temperatureUnits;
    toggleUnitsBtn.classList.add("menu-box-btns");
    toggleUnitsBtn.addEventListener("click", () => {
      toggleUnitsBtn.textContent = handleUnitsChange();
      hideLeftMenu();
    });

    const deleteLocalStorageBtn = document.createElement("button");
    deleteLocalStorageBtn.id = "menu-delete-lcs-btn";
    deleteLocalStorageBtn.textContent = "Delete data";
    deleteLocalStorageBtn.classList.add("menu-box-btns");
    deleteLocalStorageBtn.addEventListener("click", hideLeftMenu);
    deleteLocalStorageBtn.addEventListener("click", () => {
      removeLocalStorage();
      location.reload();
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.classList.add("menu-box-btns");
    closeBtn.addEventListener("click", hideLeftMenu);

    body.addEventListener("keydown", handleEscapeKey);
    menu.appendChild(toggleUnitsBtn);
    menu.appendChild(deleteLocalStorageBtn);
    menu.appendChild(closeBtn);
    body.appendChild(menu);
  });
};

//handles the change of units from Celsius to Fahrenheit
const handleUnitsChange = () => {
  temperatureUnits = temperatureUnits === CELSIUS ? FAHRENHEIT : CELSIUS;
  getWeatherData(locationSearch);

  return temperatureUnits;
};

const locationNav = () => {
  const nav = document.getElementById("locationNav");
  nav.textContent = "";
  weatherLocationList.forEach((location) => {
    const btn = createNavBtns(location);
    nav.appendChild(btn);
  });
};

const createNavBtns = (location) => {
  const btn = document.createElement("button");
  btn.classList.add("navLocationBtn");
  btn.textContent = location.charAt(0).toUpperCase() + location.slice(1);
  btn.addEventListener("click", () => {
    getWeatherData(location);
  });
  return btn;
};

export { startApp, locationNav, temperatureUnits };
