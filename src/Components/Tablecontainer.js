import React from "react";

const TabContainer = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-container">
      <button
        className={`tab-btn ${activeTab === "entry" ? "active" : ""}`}
        onClick={() => onTabChange("entry")}
      >
        Notes
      </button>
      <button
        className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
        onClick={() => onTabChange("history")}
      >
        All notes
      </button>
    </div>
  );
};

export default TabContainer;
