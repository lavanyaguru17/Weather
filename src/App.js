
import React, { useState } from "react";
import WeatherDisplay from "./Components/Weatherdisplay";
import NewEntry from "./Components/Newentry";
import History from "./Components/History";
import TabContainer from "./Components/Tablecontainer";
import "./App.css";

import {  useEffect } from "react";
import axios from "axios";


const App = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState({ date: '', mood: '', note: '', weather: { temp: '', description: '' } });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSaveEntry = (entry) => {
    if (editIndex !== null) {
      setEntries((prevEntries) => {
        const updatedEntries = [...prevEntries];
        updatedEntries[editIndex] = entry;
        return updatedEntries;
      });
      setEditIndex(null);
    } else {
      setEntries((prevEntries) => [...prevEntries, entry]);
    }
    setEditEntry({ date: '', mood: '', note: '', weather: { temp: '', description: '' } }); 
  };

  const handleDeleteEntry = (index) => {
    setEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  
  const handleEditEntry = (index) => {
    setEditEntry(entries[index]);
    setEditIndex(index);
    setActiveTab("entry"); 
  };

  

  

  

 


  const [weather, setWeather] = useState({ icon: "", temp: "--°C", description: "" });

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
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, []); 

  return (
    <div className="app-container" style={{ 
      fontFamily: "Arial, sans-serif", 
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#fff", margin: 0 }}>MoodNote</h1>
        <WeatherDisplay weather={weather} /> 
      </header>

      <TabContainer activeTab={activeTab} onTabChange={handleTabChange} />
      
      {activeTab === "entry" ? (
        <NewEntry onSave={handleSaveEntry} weather={weather} />
      ) : (
        <div style={{ 
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px"
        }}>
          <h2 style={{ 
            color: "#4a6fa5",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid #eee"
          }}>All Notes</h2>
          
          {entries.length > 0 ? (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {entries.map((entry, index) => (
                <div key={index} style={{
                  padding: "15px 0",
                  borderBottom: "1px solid #f5f5f5",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: "500",
                      marginBottom: "5px",
                      color: "#333"
                    }}>
                      {entry.note}
                    </div>
                    <div style={{ 
                      fontSize: "13px",
                      color: "#888"
                    }}>
                      {entry.date}
                    </div>
                    <div style={{ 
                      fontSize: "13px",
                      color: "#666",
                      marginTop: "5px"
                    }}>
                      Mood: {entry.emoji} 
                      Weather: {entry.weather.temp}, {entry.weather.description}
                    </div>
                  </div>
                 
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#888", textAlign: "center" }}>No notes available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;


