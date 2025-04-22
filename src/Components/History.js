// import React, { useState } from "react";

// const History = () => {
//   const [selectedMonth, setSelectedMonth] = useState("April 2024");

//   return (
//     <section id="history-tab" className="tab-content">
//       <div className="calendar-container">
//         <div className="calendar-header">
//           <button
//             id="prev-month"
//             onClick={() => setSelectedMonth("March 2024")}
//           >
//             &lt;
//           </button>
//           <h3 id="calendar-month-year">{selectedMonth}</h3>
//           <button
//             id="next-month"
//             onClick={() => setSelectedMonth("May 2024")}
//           >
//             &gt;
//           </button>
//         </div>
//         <div className="calendar-grid">
//           <div className="calendar-days">
//             {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
//               <span key={index}>{day}</span>
//             ))}
//           </div>
//           <div id="calendar-dates" className="calendar-dates">
//             {/* Example for date, you can dynamically generate the dates here */}
//             <span>1</span>
//             <span>2</span>
//             <span>3</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default History;


import React, { useState, useEffect } from "react";

// Sample entries (you can replace this with actual data or local storage)
const sampleEntries = [
  {
    date: "2024-04-01",
    mood: "happy",
    note: "Had a great day at the park!",
    weather: { icon: "☀️", temp: "25", description: "Sunny" }
  },
  {
    date: "2024-04-02",
    mood: "neutral",
    note: "A regular workday.",
    weather: { icon: "☁️", temp: "20", description: "Cloudy" }
  },
  {
    date: "2024-04-03",
    mood: "sad",
    note: "Feeling down today.",
    weather: { icon: "🌧️", temp: "18", description: "Rainy" }
  }
];

const History = () => {
  // State for entries, filtered mood, and selected month
  const [entries, setEntries] = useState(sampleEntries);
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString("default", { month: "long", year: "numeric" }));
  const [selectedMood, setSelectedMood] = useState("all");

  useEffect(() => {
    // Filter entries by selected mood
    if (selectedMood === "all") {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter(entry => entry.mood === selectedMood));
    }
  }, [selectedMood, entries]);

  // Handle Month Navigation
  const handleMonthChange = (direction) => {
    const currentMonth = new Date(selectedMonth);
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    setSelectedMonth(currentMonth.toLocaleString("default", { month: "long", year: "numeric" }));
  };

  return (
    <section id="history-tab" className="tab-content">
      <div className="calendar-container">
        <div className="calendar-header">
          <button id="prev-month" onClick={() => handleMonthChange(-1)}>
            &lt;
          </button>
          <h3 id="calendar-month-year">{selectedMonth}</h3>
          <button id="next-month" onClick={() => handleMonthChange(1)}>
            &gt;
          </button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-days">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={index}>{day}</span>
            ))}
          </div>
          <div id="calendar-dates" className="calendar-dates">
            {/* Generate calendar dates for the selected month */}
            {/* This would need logic to generate dates dynamically based on the selected month */}
          </div>
        </div>
      </div>

      <div className="entries-container">
        <div className="filter-container">
          <label htmlFor="mood-filter">Filter by mood:</label>
          <select
            id="mood-filter"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value="all">All moods</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="sick">Sick</option>
          </select>
        </div>

        <h3>All Notes</h3>

        <div id="entries-list" className="entries-list">
          {filteredEntries.length === 0 ? (
            <p>No entries found for the selected filter.</p>
          ) : (
            filteredEntries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="entry-mood">{entry.mood}</div>
                <div className="entry-content">
                  <p className="entry-note">{entry.note}</p>
                  <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
                <div className="entry-weather">
                  <span className="weather-icon">{entry.weather.icon}</span>
                  <span className="weather-temp">{entry.weather.temp}°C</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default History;
