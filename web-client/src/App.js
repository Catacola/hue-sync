// @flow

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Button from 'react-bootstrap/Button';
import Controller from './Controller';
import Hue from './Hue.js';
import Setup from './Setup.js';


function App() {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [hue, setHueRaw] = useState<Hue>(new Hue());

  useEffect(() => {
    async function initializeHue() {
      const myHue = new Hue();
      await myHue.discover();

      if (myHue.address && myHue.username) {
        setIsLinked(true);
      }
      setHueRaw(myHue);
    }

    initializeHue();
  }, []);

  const setHue = (hue: Hue): void => {
    setHueRaw(hue.clone());
  }

  return (
    <div className="App">
      <header>
        <h1>Hue to You Too!</h1>
      </header>
      {
        isLinked
          ? <Controller />
          : <Setup setIsLinked={setIsLinked} hue={hue} setHue={setHue}/>
      }
    </div>
  );
}

export default App;
