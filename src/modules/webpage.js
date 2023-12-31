import { getWeatherData } from "./weatherApi";
import { weatherLocationList } from "./handleData";
import { initialLocalStorageCheck, removeLocalStorage } from "./localStorage";
import { setBtnActive } from "./handleUi";

//variables
const CELSIUS = "Celsius";
const FAHRENHEIT = "Fahrenheit";
let temperatureUnits = CELSIUS;
let locationSearchValue = "";

const locationSearch = (value) => {
  if (value !== undefined) {
    locationSearchValue = value;
  }
  return locationSearchValue;
};

//initialise the UI and check if browser supports local storage
const startApp = () => {
  leftMenu();
  inputLocation();
  initialLocalStorageCheck("localStorage");
};

//handles the location search box
const inputLocation = () => {
  const location = document.getElementById("input-location");

  location.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      getWeatherData(locationSearch(location.value), true);
      event.preventDefault();
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

    //hides the left menu
    const hideLeftMenu = () => {
      if (body.contains(menu)) {
        body.removeChild(menu);
        body.removeEventListener("keydown", handleEscapeKey);
      }
    };

    //creates the body of the pop up menu
    const menu = document.createElement("div");
    menu.id = "menu-box";

    //adds btn for toggling the units type
    const toggleUnitsBtn = document.createElement("button");
    toggleUnitsBtn.id = "menu-toggle-units-btn";
    toggleUnitsBtn.textContent = temperatureUnits;
    toggleUnitsBtn.classList.add("menu-box-btns");
    toggleUnitsBtn.addEventListener("click", () => {
      toggleUnitsBtn.textContent = handleUnitsChange();
      hideLeftMenu();
    });

    //adds btn that deletes the local storage data
    const deleteLocalStorageBtn = document.createElement("button");
    deleteLocalStorageBtn.id = "menu-delete-lcs-btn";
    deleteLocalStorageBtn.textContent = "Delete data";
    deleteLocalStorageBtn.classList.add("menu-box-btns");
    deleteLocalStorageBtn.addEventListener("click", () => {
      hideLeftMenu();
      removeLocalStorage();
      location.reload();
    });

    //adds btn for closing the menu
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
  getWeatherData(locationSearch(), false);
  return temperatureUnits;
};

//adds the new cityes that users searches for in the nav menu
const locationNav = () => {
  const nav = document.getElementById("locationNav");
  nav.textContent = "";
  //for each location added in the local storage, a new btn will be created
  weatherLocationList.forEach((location) => {
    const btn = createNavBtns(location);
    nav.appendChild(btn);
  });
};

//handles the creation of the btns that will be added in the nav
const createNavBtns = (location) => {
  const btn = document.createElement("button");
  btn.classList.add("navLocationBtn");
  setBtnActive(btn);
  //makes the first letter uppercase
  btn.textContent = location.charAt(0).toUpperCase() + location.slice(1);
  btn.addEventListener("click", () => {
    getWeatherData(location, false);
    setBtnActive(btn);
  });
  return btn;
};

export { startApp, locationNav, locationSearch, temperatureUnits };
