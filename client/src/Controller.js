// @flow

import React, { useState, useEffect, useCallback, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Controller.css';
import FakeLight from './FakeLight.js';
import Hue from './Hue.js';

const ws_address = 'wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod';

function Controller(props: {
  address: string,
  username: string,
}) {
  const [lightHue, setLightHue] = useState<number>(0);
  const [lightBrightness, setLightBrightness] = useState<number>(0);
  const [lightOn, setLightOn] = useState<boolean>(true);
  const [numLights, setNumLights] = useState<number>(0);
  const [enabled, setEnabled] = useState(true);
  const {address, username} = props;

  const ws = useRef<WebSocket>(new WebSocket(ws_address));

  const handleMessage = useCallback(async (event: any) => {
    const newState = JSON.parse(event.data);

    'hue' in newState && setLightHue(newState.hue);
    'bri' in newState && setLightBrightness(newState.bri);
    'on' in newState && setLightOn(newState.on);

    await Hue.setAllLights(address, username, newState);
  }, [address, username]);

  useEffect(() => {
    const id = setInterval(() => {
      if (ws.current.readyState === 2 || ws.current.readyState === 3) {
        ws.current = new WebSocket(ws_address);
        ws.current.onmessage = handleMessage;
      }
    }, 2000);

    return () => clearInterval(id);
  }, [handleMessage]);


  useEffect(() => {
    async function getLightInfo() {
      const num = await Hue.getNumLights(address, username);
      setNumLights(num);
    }

    getLightInfo();
  }, [address, username]);

  useEffect(() => {
    ws.current.onmessage = enabled ? handleMessage : () => {};
  }, [enabled, handleMessage]);


  const handleToggleEnabled = () => {
    setEnabled(!enabled);
  }

  return (
    <div className="Controller">
      <div>Good to go!</div>
      <div>Connected to {numLights} light{numLights !== 1 && 's'}</div>
      <FakeLight hue={lightHue} brightness={lightBrightness} on={lightOn} />
      <Form>
        <Form.Switch
          onChange={handleToggleEnabled}
          id="custom-switch"
          checked={enabled}
          label="Enabled"
        />
      </Form>
    </div>
  );
}

export default Controller;
