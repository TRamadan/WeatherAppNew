/* Global Variables */

let APIUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
let key = "661daa7377189bfe425b6af1f07ac279";

// Create a new date instance dynamically with JS
let d = new Date();
let currentNewDate =
  +d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", UserActioButton);

function UserActioButton(e) {
  const postCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(currentNewDate);
  getTemperature(APIUrl, postCode, key).then(function (data) {
    // Add data to POST request
    postData("http://localhost:3000/addWeatherData", {
      temperature: data.main.temp,
      date: currentNewDate,
      user_response: feelings,
    })
      // Function which updates UI
      .then(function () {
        UpdateUserGui();
      });
  });
}

// Async GET
const GetFetchedTemprature = async (APIUrl, code, key) => {
  // const getTemperatureDemo = async (url)=>{
  const response = await fetch(APIUrl + code + "&APPID=" + key);
  console.log(response);
  try {
    const fetchedData = await response.json();
    return fetchedData;
  } catch (err) {
    console.log("Fetch temprature function error", err);
  }
};

// Async POST
const AddData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const SentData = await postRequest.json();
    return SendData;
  } catch (err) {
    console.log("Send Data function error", err);
  }
};

// here is the function needed to update the user gui  by the following
//1- the current data
//2- the fetched temprature
//3- the added content
const UpdateUserGui = async () => {
  const request = await fetch("http://localhost:3000/getall");
  try {
    const UserGuiData = await request.json();
    document.getElementById("date").innerHTML = UserGuiData.date;
    document.getElementById("temp").innerHTML = UserGuiData.temperature;
    document.getElementById("content").innerHTML = UserGuiData.user_response;
  } catch (err) {
    console.log("Update ui function error", err);
  }
};
