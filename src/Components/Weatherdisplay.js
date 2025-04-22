
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = () => {
  const [weather, setWeather] = useState({ icon: "", temp: "--°C", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "b582b0bd5174f92b10a923dbbcbcb18f"; 
  const CITY = "chennai"; 
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );

        const weatherData = response.data;
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description; 
        let icon = "";

      
        if (temp < 0) {
          icon = "❄️"; // Snowy Icon for freezing temperatures
        } else if (temp < 15) {
          icon = "🌧️"; // Rainy Icon for cool temperatures
        } else if (temp < 25) {
          icon = "🌤️"; // Partly Sunny Icon for moderate temperatures
        } else {
          icon = "☀️"; // Sunny Icon for warm temperatures
        }

        
        if (description.includes("rain")) {
          icon = "🌧️"; // Rainy Icon
        } else if (description.includes("snow")) {
          icon = "❄️"; // Snowy Icon
        } else if (description.includes("clear")) {
          icon = icon; // Use the already set icon
        } else if (description.includes("cloud")) {
          icon = "☁️"; // Cloudy Icon
        }

       
        setWeather({ icon, temp: `${temp}°C`, description });
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch weather data.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); 

  if (loading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="weather-display">
      <span style={{ fontSize: "2em" }}>{weather.icon}</span>
      <span id="weather-temp">{weather.temp}</span>
      <div>{weather.description}</div>
    </div>
  );
};

export default WeatherDisplay;
