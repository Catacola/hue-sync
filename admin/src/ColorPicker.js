// @flow

import * as React from 'react';

import './ColorPicker.css';

function ColorPicker(props: {
  ws: WebSocket,
}) {

  const makeColorButton = (hue: number): React.Element<'div'> => {
    const handleColorClick = () => {
      const msg = JSON.stringify({
        message: "sendmessage",
        data: JSON.stringify({
          on: true,
          hue: hue*182,
          bri: 255,
        })
      });
      console.log(msg);
      props.ws.send(msg);
    }


    return (
      <div
        className="ColorItem"
        style={{backgroundColor: `hsl(${hue}, 100%, 50%)`}}
        onClick={handleColorClick}
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
