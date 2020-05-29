// @flow

import React, { useEffect, useState } from 'react';

import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ColorPicker from './ColorPicker.js';
import PatternMaker from './PatternMaker.js';

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

  const handleColorClick = (hue) => {
    const msg = JSON.stringify({
      message: "sendmessage",
      data: JSON.stringify({
        type: "light",
        args: {
          on: true,
          hue: hue*182,
          bri: 255,
          transitiontime: 2,
        },
      })
    });
    ws.send(msg);
  };

  const handleSendPattern = (hues: number[], interval: number) => {
    const msg = JSON.stringify({
      message: "sendmessage",
      data: JSON.stringify({
        type: "pattern",
        args: {
          pattern: "step",
          colors: hues.map(h => h*182),
          interval: interval,
        },
      })
    });
    ws.send(msg);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hue Controller</h1>
      </header>
      <Tabs defaultActiveKey="picker">
        <Tab eventKey="picker" title="Color Picker">
          <ColorPicker handleColorClick={handleColorClick} />
        </Tab>
        <Tab eventKey="pattern" title="Pattern Maker">
          <PatternMaker handleSendPattern={handleSendPattern} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
