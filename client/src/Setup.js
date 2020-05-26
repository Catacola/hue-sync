// @flow

import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';
import Finder from './Finder';
import Linker from './Linker';
import './Setup.css';

function Setup(props: {
  setIsLinked: (boolean) => void,
  address: string,
  setAddress: (string) => void,
  setUsername: (string) => void,
}) {
  const {setIsLinked, address, setAddress, setUsername} = props;

  return (
    <div className="Setup">
      <h3>Setup Bridge</h3>
      {
        address === ''
          ? <Finder setAddress={setAddress}/>
          : <Linker
              address={address}
              setUsername={setUsername}
              setIsLinked={setIsLinked}
            />
      }
    </div>
  );
}

export default Setup;
