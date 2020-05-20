// @flow

import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Linker(props: {
  hue: Hue,
  setIsLinked: (boolean) => void,
}) {
  const [error, setError] = useState<string>('');
  const {hue, setIsLinked} = props;


  const linkBridge = async () => {
    const status = await hue.link();

    if(status == 'NO_RESPONSE') {
      setError('Bridge not responding');
      return;
    }

    if(status == 'PRESS_LINK') {
      setError('Link button not pressed');
      return;
    }

    setError('');
    setIsLinked(true);
  }

  return (
    <>
      {error !== '' && <Alert variant={'danger'}>{error}</Alert>}
      <Button onClick={linkBridge}>Link to Bridge</Button>
    </>
  );
}

export default Linker;
