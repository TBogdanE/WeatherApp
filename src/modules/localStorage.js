import { weatherLocationList } from "./handleData";
import { locationNav } from "./webpage";

const updateLocalStorage = (data) => {
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

const removeLocalStorage = () => {
  console.error("Data from local storage was succsesfull removed");
  localStorage.clear();
};

const checkLocalStorage = () => {
  if (localStorage.getItem("weatherLocationList")) {
    const data = JSON.parse(localStorage.getItem("weatherLocationList"));
    weatherLocationList.push(...data);
    locationNav();
  } else {
    console.error("Local storage data was not found!");
  }
};

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
