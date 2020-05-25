// @flow

import React, { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Controller.css';
import FakeLight from './FakeLight.js';
import Hue from './Hue.js';

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

  const ws = useRef<WebSocket>(new WebSocket('wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod'));

  useEffect(() => {
    async function getLightInfo() {
      const num = await Hue.getNumLights(address, username);
      setNumLights(num);
    }

    getLightInfo();
  }, []);

  useEffect(() => {
    if (enabled) {
      ws.current.onmessage = async (event: any) => {
        const data = JSON.parse(event.data);
        await handleMessage(data);
      };
    } else {
      ws.current.onmessage = (() => {});
    }
  }, [enabled]);

  const handleMessage = async (newState: Object) => {
    if (!enabled) {
      return;
    }
    'hue' in newState && setLightHue(newState.hue);
    'bri' in newState && setLightBrightness(newState.bri);
    'on' in newState && setLightOn(newState.on);
    await Hue.setAllLights(address, username, newState);
  }

  const handleToggleEnabled = () => {
    setEnabled(!enabled);
  }

  return (
    <div className="Controller">
      <div>Good to go!</div>
      <div>Connected to {numLights} lights</div>
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
