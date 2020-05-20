// @flow

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Finder(props: {
  hue: Hue,
  setHue: (Hue) => void,
}) {
  const [error, setError] = useState<boolean>(false);

  const findBridge = async () => {
    const {hue, setHue} = props;

    await hue.discover();

    if(hue.address != null) {
      setHue(hue);
    } else {
      setError(true);
    }
  }

  return(
    <Button onClick={findBridge}>Find Bridge</Button>
  );
}

export default Finder;
