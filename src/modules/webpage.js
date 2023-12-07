import { weatherData, getWeatherData } from "./weatherApi";
import { updateData } from "./handleData";

let temperatureUnits = "Celsius";
let locationSearch = "";

const startApp = () => {
  leftMenu();
  inputLocation();
};

const inputLocation = () => {
  const location = document.getElementById("input-location");
  location.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      locationSearch = location.value;
      event.preventDefault();
      getWeatherData(locationSearch);
    }
  });
};

const leftMenu = () => {
  const body = document.querySelector("body");
  const btn = document.getElementById("menu-btn");

  btn.addEventListener("click", () => {
    const handleEscapeKey = (event) => {
      if ((menu && event.key === "Escape") || event.key === 27) {
        hideLeftMenu();
      }
    };

    const hideLeftMenu = () => {
      if (body.contains(menu)) {
        body.removeChild(menu);
        body.removeEventListener("keydown", handleEscapeKey);
      }
    };

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
    //toggleUnitsBtn.addEventListener("click", deleteLocalStorageBtn);

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

const handleUnitsChange = () => {
  temperatureUnits = temperatureUnits === "Celsius" ? "Fahrenheit" : "Celsius";
  getWeatherData(locationSearch);

  return temperatureUnits;
};

export { startApp, temperatureUnits };
