// @flow

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Finder from './Finder';
import Linker from './Linker';
import './Setup.css'

function Setup() {
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [addr, setAddr] = useState<string>('');

  return (
    <div className="Setup">
      <h3>Setup Bridge</h3>
      {
        addr === ''
          ? <Finder setAddr={setAddr}/>
          : !isLinked
          ? <Linker addr={addr} setIsLinked={setIsLinked}/>
          : <div>Linked!</div>
      }
    </div>
  );
}

export default Setup;
