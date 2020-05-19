import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Setup from './Setup.js';


function App() {
  return (
    <div className="App">
      <header>
        <h1>Hue to You Too!</h1>
      </header>
      <Setup/>
    </div>
  );
}

export default App;
