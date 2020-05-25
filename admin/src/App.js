// @flow

import React, { useRef } from 'react';

import './App.css';
import ColorPicker from './ColorPicker.js';
import logo from './logo.svg';

function App() {
  const ws = useRef<WebSocket>(new WebSocket('wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod'));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hue Controller</h1>
      </header>
      <ColorPicker ws={ws.current} />
    </div>
  );
}

export default App;
