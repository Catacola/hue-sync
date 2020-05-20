// @flow

import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Linker(props: {
  address: string,
  setUsername: (string) => void,
  setIsLinked: (boolean) => void,
}) {
  const [error, setError] = useState<string>('');
  const {address, setUsername, setIsLinked} = props;


  const linkBridge = async () => {
    const resp = await Hue.link(address);

    if(resp === 'NO_RESPONSE') {
      setError('Bridge not responding');
      return;
    }

    if(resp === 'PRESS_LINK') {
      setError('Link button not pressed');
      return;
    }

    setError('');
    setIsLinked(true);
    setUsername(resp);
  }

  return (
    <>
      {
        error === ''
          ? <Alert variant={'secondary'}>
              Press the link button on your Hue bridge and then click below within 30 seconds
            </Alert>
          : <Alert variant={'danger'}>{error}</Alert>
      }

      <Button onClick={linkBridge}>Link to Bridge</Button>
    </>
  );
}

export default Linker;
