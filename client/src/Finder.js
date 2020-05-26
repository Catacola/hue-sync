// @flow

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';

function Finder(props: {
  setAddress: (string) => void,
}) {
  const [error, setError] = useState<boolean>(false);

  const findBridge = async () => {
    const {setAddress} = props;

    const [address, _] = await Hue.discover();

    if(address != null) {
      setAddress(address);
    } else {
      setError(true);
    }
  };

  return(
    <Button onClick={findBridge}>Find Bridge</Button>
  );
}

export default Finder;
