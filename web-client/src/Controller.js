// @flow

import React, { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Controller(props: {
  address: string,
  username: string,
}) {
  const [lightHue, setLightHue] = useState<number>(0);
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
        await handleMessage(data.hue);
      };
    } else {
      ws.current.onmessage = (() => {});
    }
  }, [enabled]);

  const handleMessage = async (newHue: number) => {
    if (!enabled) {
      return;
    }
    setLightHue(newHue);
    await Hue.setAllLights(address, username, {hue: newHue, on: true});
  }

  const handleToggleEnabled = () => {
    setEnabled(!enabled);
  }

  return (
    <div>
      <div>Linked!</div>
      <div>Num lights: {numLights}</div>
      <div>Hue: {lightHue}</div>
      <Button
        onClick={handleToggleEnabled}
        variant={enabled ? 'success' : 'outline-success'}>
          {enabled ? 'Enabled' : 'Disabled'}
      </Button>
    </div>
  );
}

export default Controller;
