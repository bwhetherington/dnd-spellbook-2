import React from 'react';
import './Tag.css';

const COLORS = {
  primary: 'rgb(175, 25, 25)',
  seconday: 'rgb(25, 120, 150)',
  default: 'rgb(80, 80, 80)'
};

const computeColor = props => {
  const { primary = false, secondary = false } = props;
  if (primary) {
    return COLORS.primary;
  } else if (secondary) {
    return COLORS.seconday;
  } else {
    return COLORS.default;
  }
};

const computeStyle = props => ({
  backgroundColor: computeColor(props)
});

const Tag = ({ children = [], ...props }) => <span className="Tag" style={computeStyle(props)}>{children}</span>;

export default Tag;