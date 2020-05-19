// @flow

import React, { useState, useEffect } from 'react';

function Controller() {
  const [hue, setHue] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket('wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod');
    ws.addEventListener('message', (event: any) => {
      const data = JSON.parse(event.data);
      setHue(data.hue);
    });

    return ws.close;
  }, []);

  return (
    <div>
      <div>Linked!</div>
      <div>Hue: {hue}</div>
    </div>
  );
}

export default Controller;
