// App endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require("body-parser");
app.use(
   bodyParser.urlencoded({
      extended: false,
   })
);
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// POST route the handle the data sent by the clientSide
app.post('/add', (req, res) => {
   // console.log(req.body)
   projectData = {
      date: req.body.date,
      temp: req.body.temp,
      name: req.body.name,
      weatherDes: req.body.weatherDes,
      feelings: req.body.feelings,
   }
});

// GET route to handle the GET request by the clientSide
app.get('/add', (req, res) => {
   res.send(projectData);
});

const port = 8800;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
   console.log(`running on localhost: ${port}`);
};
