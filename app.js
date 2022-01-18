const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "ba2854f6d9a5f7922bb2d1ae246ce8ef#";
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + units +"&appid="+ apiKey;
  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in Kohima is " + temp + " degree Celcius.");
      res.write("<h2>The Weather is currently " + weatherDescription + "</h2>");
      res.write("<img src="+ imageURL +">");
      res.send();
    })
  })
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
