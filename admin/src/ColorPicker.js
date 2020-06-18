// @flow

import * as React from 'react';

import './ColorPicker.css';
import ColorItem from './ColorItem.js';

function ColorPicker(props: { handleColorClick: (number) => ?Promise<void> }) {
  const makeColorButton = (hue: number) => {
    return (
      <ColorItem hue={hue} handleClick={props.handleColorClick} key={hue} />
    );
  };

  return (
    <div className="ColorPicker">
      {Array.from({ length: 20 }, (x, i) => i * 18).map(makeColorButton)}
    </div>
  );
}

export default ColorPicker;
