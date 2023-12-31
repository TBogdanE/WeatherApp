import { weatherLocationList } from "./handleData";
import { locationNav, locationSearch } from "./webpage";
import { initialPage, initializeBtnState } from "./handleUi";
import { getWeatherData } from "./weatherApi";

//adds data to the local storage
const updateLocalStorage = (data) => {
  //checks if local storage is available
  if (storageAvailable) {
    weatherLocationList.push(data);
    localStorage.setItem(
      "weatherLocationList",
      JSON.stringify(weatherLocationList)
    );
  } else {
    console.error("Cannot add to local storage");
  }
};

//delete all the data contained in the local storage
const removeLocalStorage = () => {
  console.error("Data from local storage was succsesfull removed");
  localStorage.clear();
};

//check if there is data in the local storage
const checkLocalStorage = () => {
  //searches for the weather location lost
  if (localStorage.getItem("weatherLocationList")) {
    const data = JSON.parse(localStorage.getItem("weatherLocationList"));
    weatherLocationList.push(...data);
    locationNav();
    locationSearch(data[0]);
    //displays the data of the first location in the list once the page has been reloaded
    getWeatherData(locationSearch());
    //set's the btn of the first location as active
    initializeBtnState();
  } else {
    //if there is no data in the local storage, the initial page will show up
    initialPage();
    locationNav();
    console.log("Local storage data was not found!");
  }
};

//cheks to see if local storage is supported by the browser
const initialLocalStorageCheck = (storageType) => {
  if (!storageAvailable(storageType)) {
    console.error("No local storage available");
  } else {
    checkLocalStorage();
  }
};

const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};

export { initialLocalStorageCheck, updateLocalStorage, removeLocalStorage };
