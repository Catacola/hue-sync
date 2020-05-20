// @flow

import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Hue from './Hue.js';
import Finder from './Finder';
import Linker from './Linker';
import './Setup.css'

function Setup(props: {
  setIsLinked: (boolean) => void,
  hue: Hue,
  setHue: (Hue) => void,
}) {
  const {setIsLinked, hue, setHue} = props;

  return (
    <div className="Setup">
      <h3>Setup Bridge</h3>
      {
        hue.address === ''
          ? <Finder hue={hue} setHue={setHue}/>
          : <Linker hue={hue} setHue={setHue} setIsLinked={setIsLinked}/>
      }
    </div>
  );
}

export default Setup;
