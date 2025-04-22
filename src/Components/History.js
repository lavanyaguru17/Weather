// import React, { useState, useEffect } from "react";

// const History = ({ entries }) => {
//   console.log(entries,'ll')
//   const [selectedMood, setSelectedMood] = useState("all");

//   const filteredEntries = selectedMood === "all" ? entries : entries.filter(entry => entry.mood === selectedMood);

//   return (
//     <section id="history-tab" className="tab-content">
//       <div className="entries-container">
//         <div className="filter-container">
//           <label htmlFor="mood-filter">Filter by mood:</label>
//           <select
//             id="mood-filter"
//             value={selectedMood}
//             onChange={(e) => setSelectedMood(e.target.value)}
//           >
//             <option value="all">All moods</option>
//             <option value="happy">Happy</option>
//             <option value="neutral">Neutral</option>
//             <option value="sad">Sad</option>
//             <option value="angry">Angry</option>
//             <option value="sick">Sick</option>
//           </select>
//         </div>

//         <h3>All Notes</h3>
//         <div id="entries-list" className="entries-list">
//           {filteredEntries.length === 0 ? (
//             <p>No entries found for the selected filter.</p>
//           ) : (
          

//             filteredEntries.map((entry, index) => (
//               <div key={index} className="entry-card">
//                 <div className="entry-mood">{entry.mood}</div>
//                 <div className="entry-content">
//                   <p className="entry-note">{entry.note}</p>
//                   <p className="entry-date">{new Date(entry.date).toLocaleDateString()}</p>
//                 </div>
//                 <div className="entry-weather">
//                   <span className="weather-icon">{entry.weather.icon}</span>
//                   <span className="weather-temp">{entry.weather.temp}°C</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default History;


import React from 'react';

const HistoryTab = () => {
    return (
        <section id="history-tab" className="tab-content">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button id="prev-month">&lt;</button>
                    <h3 id="calendar-month-year">April 2024</h3>
                    <button id="next-month">&gt;</button>
                </div>
                <div className="calendar-grid">
                    <div className="calendar-days">
                        <span>S</span>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                    </div>
                    <div id="calendar-dates" className="calendar-dates"></div>
                </div>
            </div>

            <div className="entries-container">
                <div className="filter-container">
                    <label htmlFor="mood-filter">Filter by mood:</label>
                    <select id="mood-filter">
                        <option value="all">All moods</option>
                        <option value="happy">Happy</option>
                        <option value="neutral">Neutral</option>
                        <option value="sad">Sad</option>
                        <option value="angry">Angry</option>
                        <option value="sick">Sick</option>
                    </select>
                </div>

                <h3>All Notes</h3>
                <div id="entries-list" className="entries-list"></div>
            </div>

            <div id="notification" className="notification">Entry saved successfully!</div>

            {/* Template for entry card */}
            <template id="entry-template">
                <div className="entry-card">
                    <div className="entry-mood"></div>
                    <div className="entry-content">
                        <p className="entry-note"></p>
                        <p className="entry-date"></p>
                    </div>
                    <div className="entry-weather">
                        <span className="weather-icon"></span>
                        <span className="weather-temp"></span>
                    </div>
                </div>
            </template>
        </section>
    );
}

export default HistoryTab;
