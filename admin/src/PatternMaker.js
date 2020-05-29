// @flow

import React, { useState } from 'react';

import  ColorPicker  from './ColorPicker.js';
import  ColorItem, { EmptyColorItem }  from './ColorItem.js';
import './PatternMaker.css';

function PatternMaker(props: {
  handleSendPattern: () => Promise<void>,
}) {
  const [curPattern, setCurPattern] = useState<number[]>([]);

  const renderPattern = () => {
    const pattern = [];
    for (let i = 0; i < 6; i++) {
      if (i < curPattern.length) {
        pattern.push(
          <ColorItem hue={curPattern[i]} handleClick={async (h) => {}} />
        );
      } else {
        pattern.push(<EmptyColorItem key={i}/>);
      }
    }
    return pattern;
  };

  const handleColorClick = (hue) => {
    if (curPattern.length < 6) {
      setCurPattern(curPattern.concat([hue]));
    }
  };


  return (
    <div className="PatternMaker">
      <div className="NewPattern">
        {renderPattern()}
      </div>
      <hr className="hrFade"/>
      <ColorPicker handleColorClick={handleColorClick} />
    </div>
  );
}

export default PatternMaker;
