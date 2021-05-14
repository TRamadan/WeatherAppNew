// Setup empty JS object to act as endpoint for all routes
let projectData = {};

//declare a variable called ServerPort to intailize the listening port of the server
const ServerPort = 3000;

// Require Express to run server and routes
const express = require("express");

// Dependencies
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//Get Post needed routes

//here is the needed get route method
//Also , any express function take two parameters ,
//one is called request and the other is response ,
//these parameters must be assigned by the same order
app.get("/getall", (req, res) => {
  res.send(projectData);
});

//here is the needed post route method
app.post("/addWeatherData", (req, res) => {
  projectData = req.body;
  res.end();

  //another way for make sure that the data is sent successfully
  //   response.status(200);
  //another way for sending data
  //   projectData = request.body
});

//Server configuration
//this variable is used to call the listen function and call the callback function to make sure that the server is already running
const LocalHostServer = app.listen(ServerPort, ServerListening);

//this function is  used as a callback function needed to make sure that the server is running
function ServerListening() {
  console.log("Local host is running on port : ", ServerPort);
}

//here is also another way to make server configuration
// const port = 3000;
// app.listen(() => {
//   console.log("Server is running on port : ", port);
// });
