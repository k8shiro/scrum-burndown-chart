import React from 'react';
import './App.css';

import BurndownChart from "./BurndownChart.js"

function App() {
  return (
    <div className="App">
      <BurndownChart
        title="BurndownChart" 
      />
    </div>
  );
}

export default App;
