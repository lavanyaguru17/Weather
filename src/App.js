
import React, { useState } from "react";
import WeatherDisplay from "./Components/Weatherdisplay";
import NewEntry from "./Components/Newentry";
import History from "./Components/History";
import TabContainer from "./Components/Tablecontainer";
import "./App.css";


const getEntriesFromStorage = () => {
  return JSON.parse(localStorage.getItem("mood_journal_entries")) || [];
};

const App = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const [entries, setEntries] = useState(getEntriesFromStorage());

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNewEntrySave = (entry) => {
    // Save entry to localStorage
    const updatedEntries = [...entries, entry];
    localStorage.setItem("mood_journal_entries", JSON.stringify(updatedEntries));

    // Update the state to reflect the new entry
    setEntries(updatedEntries);

    // Optionally, switch to the "history" tab after saving
    setActiveTab("history");
  };

  return (
    <div className="app-container">
      <header>
        <h1>MoodMate</h1>
        <WeatherDisplay />

      </header>

      <TabContainer activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === "entry" && <NewEntry onSave={handleNewEntrySave} />}
        {activeTab === "history" && <History entries={entries} />}
      </main>
    </div>
  );
};

export default App;


