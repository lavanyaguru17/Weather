// import React, { useState } from "react";

// const WeatherDisplay = () => {
//   const [weather, setWeather] = useState({ icon: "⛅", temp: "--°C" });

//   return (
//     <div className="weather-display">
//       <span id="weather-icon">{weather.icon}</span>
//       <span id="weather-temp">{weather.temp}</span>
//     </div>
//   );
// };

// export default WeatherDisplay;


import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherDisplay = () => {
  const [weather, setWeather] = useState({ icon: "⛅", temp: "--°C" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your own OpenWeatherMap API Key
  const API_KEY = "b582b0bd5174f92b10a923dbbcbcb18f";
  const CITY = "Chennai"; // You can replace this with dynamic city name based on user's location
  
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch the weather data
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );

        // Parse the response and update the state
        const weatherData = response.data;
        const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        const temp = `${weatherData.main.temp}°C`;

        setWeather({ icon, temp });
        setLoading(false);
      } catch (error) {
        setError("N/A");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading weather...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="weather-display">
      <img src={weather.icon} alt="Weather icon" />
      <span id="weather-temp">{weather.temp}</span>
    </div>
  );
};

export default WeatherDisplay;
