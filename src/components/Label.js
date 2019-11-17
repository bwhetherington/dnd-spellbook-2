import React from 'react';
import './Label.css';

function Label(props) {
  const { children = [] } = props;
  return (
    <span className="Label">
      <span className="container">{children}</span>
    </span>
  );
}

export default Label;
