import { getWeatherData } from "./weatherApi";

let temperatureUnits = "Celsius";

const startApp = () => {
  getWeatherData("iasi");
  leftMenu();
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
    });

    const deleteLocalStorageBtn = document.createElement("button");
    deleteLocalStorageBtn.id = "menu-delete-lcs-btn";
    deleteLocalStorageBtn.textContent = "Delete data";
    deleteLocalStorageBtn.classList.add("menu-box-btns");
    deleteLocalStorageBtn.addEventListener("click", hideLeftMenu);
    //toggleUnitsBtn.addEventListener("click", deleteLocalStorageBtn);

    body.addEventListener("keydown", handleEscapeKey);
    menu.appendChild(toggleUnitsBtn);
    menu.appendChild(deleteLocalStorageBtn);
    body.appendChild(menu);
  });
};

const handleUnitsChange = () => {
  temperatureUnits = temperatureUnits === "Celsius" ? "Fahrenheit" : "Celsius";
  return temperatureUnits;
};

export { startApp, temperatureUnits };
