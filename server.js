const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Serve the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Fetch weather based on city and render it on a separate page
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "69f4fccadc99a4534f24102f5abfacfd"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;

    const weatherData = {
      city: weather.name,
      temp: weather.main.temp,
      description: weather.weather[0].description,
    };

    res.render("weather", { weather: weatherData, error: null });
  } catch (error) {
    res.render("weather", {
      weather: null,
      error: "City not found, please try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
