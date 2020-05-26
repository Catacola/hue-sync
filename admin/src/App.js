// @flow

import React, { useEffect, useState } from 'react';

import './App.css';
import ColorPicker from './ColorPicker.js';
import logo from './logo.svg';

const ws_address = 'wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod';

function App() {
  const [ws, setWs] = useState<WebSocket>(new WebSocket(ws_address));

  useEffect(() => {
    const id = setInterval(() => {
      if (ws.readyState === 2 || ws.readyState === 3) {
        setWs(new WebSocket(ws_address));
      }
    }, 2000);

    return () => clearInterval(id);
  }, [ws]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hue Controller</h1>
      </header>
      <ColorPicker ws={ws} />
    </div>
  );
}

export default App;
