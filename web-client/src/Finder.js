// @flow

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

function Finder(props: {setAddr: (string) => void}) {
  const [error, setError] = useState<boolean>(false);

  const findBridge = async () => {
    const resp = await fetch('https://discovery.meethue.com');

    const addresses = await resp.json();

    if (addresses.length > 0) {
      props.setAddr(addresses[0].internalipaddress);
    } else {
      setError(true);
    }
  }

  return(
    <Button onClick={findBridge}>Find Bridge</Button>
  );
}

export default Finder;
