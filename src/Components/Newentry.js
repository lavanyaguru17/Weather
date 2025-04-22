
// import React, { useState, useEffect } from "react";

// const NewEntry = () => {
 
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedMood, setSelectedMood] = useState("");
//   const [note, setNote] = useState("");

//   useEffect(() => {
//     const currentDate = new Date().toISOString().split("T")[0];
//     setSelectedDate(currentDate);
//   }, []); 

//   const handleSaveEntry = () => {
//     alert("Entry Saved!");
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <section id="entry-tab" className="tab-content active">
//       <div className="current-date-container"
      
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100px",            
//         width: "100%",              
//         textAlign: "center",
//         marginBottom: "20px",       
//       }}>
//         <h2>{formatDate(selectedDate)}</h2>
//       </div>

//       {/* <div className="date-container">
//         <input
//           type="date"
//           id="entry-date"
//           className="date-input"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div> */}

//       <div className="mood-form">
//         <h3>How are you feeling today?</h3>
//         <div className="mood-selector">
//           {["happy", "neutral", "sad", "angry", "sick"].map((mood) => (
//             <button
//               key={mood}
//               className={`mood-btn ${selectedMood === mood ? "active" : ""}`}
//               onClick={() => setSelectedMood(mood)}
//             >
//               {mood === "happy" && "😄"}
//               {mood === "neutral" && "😐"}
//               {mood === "sad" && "😔"}
//               {mood === "angry" && "😠"}
//               {mood === "sick" && "🤢"}
//             </button>
//           ))}
//         </div>

//         <div className="note-container">
//           <textarea
//             id="mood-note"
//             placeholder="Add a note..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//           ></textarea>
//         </div>

//         <button id="save-entry" className="btn save-btn" onClick={handleSaveEntry}>
//           Save
//         </button>
//       </div>
//     </section>
//   );
// };

// export default NewEntry;


import React, { useState, useEffect } from "react";

const NewEntry = ({ onSave }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setSelectedDate(currentDate);
  }, []);

  const handleSaveEntry = () => {
    if (!selectedMood || !note) {
      alert("Please fill in mood and note before saving.");
      return;
    }

    const entry = {
      date: selectedDate,
      mood: selectedMood,
      note: note,
      weather: {
        temp: "20", // Example: Add weather data as needed
        description: "Partly cloudy",
      },
    };

    // Pass the entry to the parent component (App.js)
    onSave(entry);
    console.log(entry,'entry')

    alert("Entry Saved!");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="entry-tab" className="tab-content active">
      <div className="current-date-container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",            
        width: "100%",              
        textAlign: "center",
        marginBottom: "20px",       
      }}>
        <h2>{formatDate(selectedDate)}</h2>
      </div>

      <div className="mood-form">
        <h3>How are you feeling today?</h3>
        <div className="mood-selector">
          {["happy", "neutral", "sad", "angry", "sick"].map((mood) => (
            <button
              key={mood}
              className={`mood-btn ${selectedMood === mood ? "active" : ""}`}
              onClick={() => setSelectedMood(mood)}
            >
              {mood === "happy" && "😄"}
              {mood === "neutral" && "😐"}
              {mood === "sad" && "😔"}
              {mood === "angry" && "😠"}
              {mood === "sick" && "🤢"}
            </button>
          ))}
        </div>

        <div className="note-container">
          <textarea
            id="mood-note"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <button id="save-entry" className="btn save-btn" onClick={handleSaveEntry}>
          Save
        </button>
      </div>
    </section>
  );
};

export default NewEntry;
