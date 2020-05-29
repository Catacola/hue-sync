// @flow

import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ColorPicker  from './ColorPicker.js';
import ColorItem, { EmptyColorItem }  from './ColorItem.js';
import './PatternMaker.css';

function PatternMaker(props: {
  handleSendPattern: (number[], number, number) => ?Promise<void>,
}) {
  const [curPattern, setCurPattern] = useState<number[]>([]);
  const [patternInterval, setPatternInterval] = useState<number>(2);
  const [fadetime, setFadetime] = useState<number>(0.2);

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
    return (
      <div className="NewPattern">
        {pattern}
      </div>
    );
  };

  const handleClear = () => setCurPattern([]);

  const handleSend = async () => {
    await props.handleSendPattern(
      curPattern,
      Math.floor(patternInterval * 1000),
      Math.floor(fadetime * 10),
    );
  }

  const handleIntervalChange = (event) => {
    if (event.target.value.length === 0) {
      setPatternInterval(2);
    } else {
      setPatternInterval(event.target.value);
    }
  }

  const handleFadeChange = (event) => {
    if (event.target.value.length === 0) {
      setFadetime(0.2);
    } else {
      setFadetime(event.target.value);
    }
  }

  const isIntervalValid = () => patternInterval >= 0.3;

  const isFadeValid = () => fadetime >= 0.1;

  const canSubmit = () => curPattern.length > 1 && isIntervalValid() && isFadeValid();

  const renderControls = () => {
    return (
      <div className="NewPatternControls">
        <div className="row">
          <Button onClick={handleClear} >
            Clear Pattern
          </Button>
          <Button onClick={handleSend} disabled={!canSubmit()}>
            Send Pattern
          </Button>
        </div>
        <div className="row">
          <InputGroup className="Interval">
            <InputGroup.Prepend>
              <InputGroup.Text>Interval</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="2"
              aria-label="Interval"
              aria-describedby="basic-addon1"
              onChange={handleIntervalChange}
              isInvalid={!isIntervalValid()}
            />
            <InputGroup.Append>
              <InputGroup.Text>sec</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="Interval">
            <InputGroup.Prepend>
              <InputGroup.Text>Fade</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="0.2"
              aria-label="Fade"
              aria-describedby="basic-addon1"
              onChange={handleFadeChange}
              isInvalid={!isFadeValid()}
            />
            <InputGroup.Append>
              <InputGroup.Text>sec</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    );
  };

  const handleColorClick = (hue) => {
    if (curPattern.length < 6) {
      setCurPattern(curPattern.concat([hue]));
    }
  };


  return (
    <div className="PatternMaker">
      {renderPattern()}
      {renderControls()}
      <hr className="hrFade"/>
      <ColorPicker handleColorClick={handleColorClick} />
    </div>
  );
}

export default PatternMaker;
