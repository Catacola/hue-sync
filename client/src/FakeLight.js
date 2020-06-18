// @flow

import React, { useState, useEffect, useRef } from 'react';

import './FakeLight.css';

function FakeLight(props: { hue: number, brightness: number, on: boolean }) {
  const { hue, brightness, on } = props;

  const getHSL = (): string => {
    if (!on) {
      return 'black';
    }
    return `hsl(${Math.floor(hue / 182)}, 100%, ${Math.floor(
      (brightness / 255) * 50
    )}%)`;
  };

  return <div className="FakeLight" style={{ backgroundColor: getHSL() }} />;
}

export default FakeLight;
