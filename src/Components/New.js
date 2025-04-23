import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Sun, Cloud, Moon, ChevronDown } from "lucide-react";
import axios from "axios";

const moods = [
  { icon: "😊", label: "happy", color: "bg-yellow-400" },
  { icon: "😐", label: "neutral", color: "bg-gray-400" },
  { icon: "😕", label: "meh", color: "bg-blue-400" },
  { icon: "😡", label: "angry", color: "bg-red-400" },
  { icon: "🤢", label: "sick", color: "bg-green-500" }
];

const initialNotes = [
  { date: new Date("2024-04-24"), mood: "😊", note: "Felt great after my morning jog" },
  { date: new Date("2024-04-23"), mood: "😕", note: "A bit of a rough day" },
  { date: new Date("2024-04-22"), mood: "😐", note: "Tired after a long day at work", temp: "20°C", weather: <Cloud size={16} /> },
  { date: new Date("2024-04-21"), mood: "😡", note: "Traffic was terrible on the way home", temp: "24°C", weather: <Sun size={16} /> },
  { date: new Date("2024-04-20"), mood: "🤢", note: "Feeling down today" },
  { date: new Date("2024-04-19"), mood: "😊", note: "Had a nice time with friends", temp: "22°C", weather: <Cloud size={16} /> },
];

const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg p-4 ${className || ""}`}>{children}</div>
);

const Button = ({ children, ...props }) => (
  <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded" {...props}>
    {children}
  </button>
);

const Textarea = (props) => (
  <textarea className="border border-orange-300 p-2 rounded w-full focus:ring-2 focus:ring-orange-400" {...props} />
);

function New() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState(initialNotes);
  const [moodFilter, setMoodFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
    fetchWeather();
  }, [darkMode]);

  const fetchWeather = async () => {
    try {
      setLoadingWeather(true);
      const API_KEY = "b582b0bd5174f92b10a923dbbcbcb18f";
      const CITY = "Chennai";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
      );

      const temp = Math.round(response.data.main.temp);
      const weatherIcon = response.data.weather[0].main.toLowerCase();
      setWeather({
        temp: `${temp}°C`,
        icon: weatherIcon.includes("cloud") ? <Cloud size={16} /> : <Sun size={16} />
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather({ temp: "22°C", icon: <Sun size={16} /> });
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleSave = () => {
    if (!selectedMood || !note) return;
    const newNote = {
      date,
      mood: moods.find((m) => m.label === selectedMood).icon,
      note,
      ...(weather && { temp: weather.temp, weather: weather.icon })
    };
    setNotes([newNote, ...notes]);
    setSelectedMood(null);
    setNote("");
  };

  const getMoodColor = (day) => {
    const entry = notes.find(
      (n) => format(n.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd") &&
        (moodFilter === "all" || moods.find(m => m.icon === n.mood).label === moodFilter)
    );
    const moodObj = moods.find((m) => m.icon === entry?.mood);
    return moodObj?.color || null;
  };

  const moodOptions = ["all", ...moods.map((m) => m.label)];

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-[#FFF7EB] text-black"}>
      {/* Updated Header */}
      <div className=" py-6 px-6 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">MoodMate</h1>
            <p className="text-gray-600 text-sm">{format(new Date(), "MMMM d, yyyy")}</p>
          </div>
          <div className="flex items-center gap-4">
            {weather && !loadingWeather && (
              <div className="flex items-center gap-1 text-gray-700">
                {weather.icon}
                <span>{weather.temp}</span>
              </div>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow flex items-center gap-1 text-sm"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />} {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-8 min-h-screen">
        <div className={`rounded-2xl p-6 flex flex-col md:flex-row gap-6 ${darkMode ? "bg-gray-800" : "bg-[#FFF7EB]"}`}>
          <div className={`w-full md:w-1/2 rounded-2xl p-6 flex flex-col justify-between shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-orange-200"}`}>
            <div>
              <h3 className="text-lg font-semibold mb-1">How are you feeling today?</h3>
              <div className="flex gap-3 mb-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood.label)}
                    className={`text-2xl transition-all ${selectedMood === mood.label ? "ring-2 ring-orange-500 rounded-full" : ""}`}
                  >
                    {mood.icon}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <Button onClick={handleSave}>Save</Button>
          </div>

          <div className={`w-full md:w-1/2 rounded-2xl p-6 shadow-sm border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-lg">April</p>
              <div className="relative inline-block">
                <select
                  value={moodFilter}
                  onChange={(e) => setMoodFilter(e.target.value)}
                  className="appearance-none border border-gray-300 bg-white rounded px-3 py-1 text-sm pr-6 focus:outline-none text-black"
                >
                  {moodOptions.map((mood) => (
                    <option key={mood} value={mood}>{mood === "all" ? "All" : mood.charAt(0).toUpperCase() + mood.slice(1)}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute top-1.5 right-2 pointer-events-none text-gray-500" />
              </div>
            </div>
<div className="overflow-x-auto">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              showOutsideDays
              className="text-sm"
              renderDay={(day) => {
                const color = getMoodColor(day);
                return (
                  <div className="relative w-full text-center">
                    <div>{format(day, "d")}</div>
                    {color && (
                      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${color}`}></div>
                    )}
                  </div>
                );
              }}
            />
            </div>
          </div>
        </div>

        <Card className={`rounded-2xl shadow-md p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-gradient-to-br from-orange-100 to-orange-300"}`}>
          <h2 className="text-xl font-bold mb-4">All Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes
              .filter((entry) => moodFilter === "all" || moods.find(m => m.icon === entry.mood).label === moodFilter)
              .map((entry, index) => (
                <div key={index} className={`rounded-xl p-4 shadow-sm space-y-2 ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                  <div className="flex items-center gap-2 text-lg">{entry.mood} <span className="text-sm text-gray-600">{format(entry.date, "MMMM d, yyyy")}</span></div>
                  <p className="text-sm">{entry.note}</p>
                  {entry.temp && (
                    <div className="flex items-center text-sm text-gray-500 gap-1">
                      {entry.weather} {entry.temp}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default New;