// @flow

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Button from 'react-bootstrap/Button';
import Controller from './Controller';
import Setup from './Setup.js';


function App() {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  return (
    <div className="App">
      <header>
        <h1>Hue to You Too!</h1>
      </header>
      {
        isLinked
          ? <Controller />
          : <Setup setIsLinked={setIsLinked}/>
      }
    </div>
  );
}

export default App;
