/* Global Variables */
const genBtn = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");
let tempDiv = document.querySelector("#temp");
let dateDiv = document.querySelector("#date");
let contDiv = document.querySelector("#content");
let feelingsDiv = document.querySelector("#feelings");
const apiKey = ",us&units=metric&appid=63379c7d3c5c8af2eb33ded18fce4737";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Get the API data
async function getApiData(baseURL, zip, apiKey) {
  let res = await fetch(baseURL + zip + apiKey);
  let data = await res.json();
  return data;
}

// Creat a POST request and send the API date
async function postData(url, data) {
  let newRes = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    let newResponse = await newRes.json();
    return newResponse;
  } catch (error) {
    console.log("could not fetch the api " + error);
  }
}

// Update the DOM elements with the recieved data from the server
async function updateUi() {
  let req = await fetch("/add");
  try {
    let data = await req.json();
    // console.log(data);
    let country = document.querySelector("#countryName");
    let zip = document.querySelector("#zipNumber");
    let weatherDiv = document.querySelector("#weather");
    weatherDiv.innerHTML = `Today's Weather: ${data.weatherDes}`;
    zip.innerHTML = zipInput.value;
    country.innerHTML = data.name;
    dateDiv.innerHTML = `Taday's Date: ${data.date}`;
    tempDiv.innerHTML = `Temprature: ${Math.floor(data.temp)}°C`;
    contDiv.innerHTML = `You're Feeling: ${data.feelings}`;
    return data;
  } catch (error) {
    console.log("could not update the UI " + error);
  }
}
// Add an eventListener for the generate button
genBtn.addEventListener("click", gen);

function gen() {
  // check if the zip input is valid or not
  if (zipInput.value.trim() !== "") {
    let zipValue = zipInput.value;
    getApiData(baseURL, zipValue, apiKey)
      .then((apiData) => {
        postData("/add", {
          date: newDate,
          name: apiData.name,
          temp: apiData.main["temp"],
          weatherDes: apiData.weather[0].description,
          feelings: feelingsDiv.value,
        });
      })
      .then(() => {
        updateUi();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Please Enter Zip Code");
  }
}
