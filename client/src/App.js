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
  const [address, setAddress] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    async function initializeHue() {
      const [addr, user] = await Hue.discover();

      if (addr) {
        setAddress(addr);
        if (user) {
          setUsername(user);
          setIsLinked(true);
        }
      }
    }

    initializeHue();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Hue to You Too!</h1>
      </header>
      {isLinked ? (
        <Controller address={address} username={username} />
      ) : (
        <Setup
          setIsLinked={setIsLinked}
          address={address}
          setAddress={setAddress}
          setUsername={setUsername}
        />
      )}
    </div>
  );
}

export default App;
