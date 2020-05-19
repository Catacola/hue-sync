// @flow

import React, { useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Linker(props: {
  addr: string,
  setIsLinked: (boolean) => void,
}) {
  const [error, setError] = useState<string>('');
  const {addr, setIsLinked} = props;

  const linkBridge = async () => {
    const resp = await fetch(
      `https://${addr}/api`,
      {
        method: 'POST',
        body: JSON.stringify({"devicetype":"hue_sync#web_client"}),
      });

    const data = await resp.json();

    if(data.length === 0) {
      setError('Bridge not responding');
      return;
    }

    if(data[0].error && data[0].error.type === 101) {
      setError('Link button not pressed');
      return;
    }

    const {username} = data[0].success;
    localStorage.setItem('ip', addr);
    localStorage.setItem('username', username);
    setError('');
    setIsLinked(true);
  }

  return (
    <>
      {error !== '' && <Alert variant={'danger'}>{error}</Alert>}
      <Button onClick={linkBridge}>Link to Bridge</Button>
    </>
  );
}

export default Linker;
