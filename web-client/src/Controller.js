// @flow

import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Controller(props: {
  address: string,
  username: string,
}) {
  const [lightHue, setLightHue] = useState<number>(0);
  const [numLights, setNumLights] = useState<number>(0);
  const {address, username} = props;

  useEffect(() => {
    async function getLightInfo() {
      const num = await Hue.getNumLights(address, username);
      setNumLights(num);
    }

    getLightInfo();
  });

  useEffect(() => {
    const ws = new WebSocket('wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod');
    ws.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      handleMessage(data.hue);
    });

    return ws.close;
  }, []);

  const handleMessage = async (newHue: number) => {
    setLightHue(newHue);
    await Hue.setAllLights(address, username, {hue: newHue, on: true});
  }

  const handleClick = () => Hue.getNumLights(address, username);

  return (
    <div>
      <div>Linked!</div>
      <div>Num lights: {numLights}</div>
      <div>Hue: {lightHue}</div>
      <Button onClick={handleClick}>Foo</Button>
    </div>
  );
}

export default Controller;
