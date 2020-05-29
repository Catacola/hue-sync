// @flow

import React, { useState, useEffect, useCallback, useRef } from 'react';

import Form from 'react-bootstrap/Form';
import './Controller.css';
import FakeLight from './FakeLight.js';
import { useInterval } from './hooks.js';
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
  const setPatternID = useInterval(null);
  const [enabled, setEnabled] = useState(true);
  const {address, username} = props;

  const ws = useRef<?WebSocket>();

  const handlePattern = useCallback(async (args: Object): Promise<void> => {
    switch(args.pattern) {
      case 'step':
        const {interval, colors, transitiontime} = args;
        setLightBrightness(255);
        let c = 0;
        const id = setInterval(() => {
          Hue.setAllLights(address, username, {
            hue: colors[c],
            bri: 255,
            transitiontime,
          });
          setLightHue(colors[c]);
          console.log('hue', colors[c]);
          c++;
          c %= colors.length;
        }, interval);
        setPatternID(id);
        break;
      default:
        console.log('Unknown pattern:', args);

    }
  }, [address, username, setPatternID]);

  const handleMessage = useCallback(async (event: any) => {
    setPatternID(null);

    const data = JSON.parse(event.data);

    switch(data.type) {
      case 'light':
        const newState = data.args;
        'hue' in newState && setLightHue(newState.hue);
        'bri' in newState && setLightBrightness(newState.bri);
        'on' in newState && setLightOn(newState.on);

        await Hue.setAllLights(address, username, newState);
        break;
      case 'pattern':
        handlePattern(data.args);
        break;
      default:
        console.log('Unknown message type: ', data);
    }

  }, [address, handlePattern, username, setPatternID]);

  useEffect(() => {
    const id = setInterval(() => {
      if (ws.current == null
        || ws.current.readyState === 2
        || ws.current.readyState === 3) {
        ws.current = new WebSocket(ws_address);
        ws.current.onmessage = handleMessage;
        console.log('New Websocket!');
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
    if( ws.current != null ) {
      ws.current.onmessage = enabled ? handleMessage : () => {};
    }
  }, [enabled, handleMessage]);


  const handleToggleEnabled = () => {
    setEnabled(!enabled);
  };

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
