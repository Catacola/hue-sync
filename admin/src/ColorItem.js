// @flow

import React from 'react';

import './ColorItem.css';

function ColorItem(props: {
  hue: number,
  handleClick: (number) => Promise<void>,
}) {
  const {hue, handleClick} = props;

  return (
    <div
      className="ColorItem"
      style={{backgroundColor: `hsl(${hue}, 100%, 50%)`}}
      onClick={() => handleClick(hue)}
      key={hue}
    />
  );
}

export function EmptyColorItem() {
  return (
    <div className="ColorItem empty" />
  );
}

export default ColorItem;
