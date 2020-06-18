// @flow

import React from 'react';

import './ColorItem.css';

function ColorItem(props: {
  hue: number,
  handleClick?: (number) => ?Promise<void>,
}) {
  const { hue, handleClick } = props;

  let style;
  if (handleClick) {
    style = { backgroundColor: `hsl(${hue}, 100%, 50%)`, cursor: 'pointer' };
  } else {
    style = { backgroundColor: `hsl(${hue}, 100%, 50%)` };
  }

  return (
    <div
      className="ColorItem"
      style={style}
      onClick={handleClick ? () => handleClick(hue) : null}
      key={hue}
    />
  );
}

export function EmptyColorItem() {
  return <div className="ColorItem empty" />;
}

export default ColorItem;
