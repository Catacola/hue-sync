// @flow

import * as React from 'react';

import './ColorPicker.css';

function ColorPicker(props: {
  handleColorClick: (number) => Promise<void>,
}) {

  const makeColorButton = (hue: number): React.Element<'div'> => {
    return (
      <div
        className="ColorItem"
        style={{backgroundColor: `hsl(${hue}, 100%, 50%)`}}
        onClick={() => props.handleColorClick(hue)}
        key={hue}
      />
    );
  }

  return (
    <div className="ColorPicker">
      {Array.from({length: 20}, (x,i) => i * 18).map(makeColorButton)}
    </div>
  );
}

export default ColorPicker;
