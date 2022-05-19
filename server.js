const express = require("express"); // Importing express module
const bodyParser = require("body-parser");
const async = require("async");
const app = express(); // Creating an express object
const axios = require("axios");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000; // Setting an port for this application
app.set("view engine", "ejs");

async function weather(x) {
  let apiKey = "97e6009abb9c074341667c91ec83935e";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${x}&units=metric&appid=${apiKey}`;
  return await axios.get(url);
}
// Starting server using listen function
app.listen(port, function (err) {
  if (err) {
    console.log("Error while starting server");
  } else {
    console.log("Server has been started at " + port);
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/getWeather", async function (req, res) {
  let list = req.body.cities;
  var city = list.split(",");
  dict = {};
  for (const element of city) {
    const { data } = await weather(element);
    dict[element] = data.main.temp;
  }
  var data = JSON.stringify(dict);
  console.log(data);
  res.render("out", { data: data });
});

app.post("/getWeatherapi", async function (req, res) {
  let city = req.body.cities;
  dict = {};
  for (const element of city) {
    const { data } = await weather(element);
    dict[element] = data.main.temp;
  }
  res.send(dict);
});
