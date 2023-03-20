import React from 'react';
import './App.css';
import Stock from './Stocks';

function App() {
  return (
    <div className="App">
      <nav>
      <h1 className='logo'>Stock Screener</h1>
      </nav>
      <Stock/>
    </div>
  );
}

export default App;

