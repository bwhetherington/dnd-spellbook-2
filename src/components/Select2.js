import React from 'react';
import SelectComp from 'react-select';

const hideBorder = state => ({
  // borderRadius: '0px',
  border: state.isFocused ? 0 : 0,
  boxShadow: state.isFocused ? 0 : 0
});

const borderColor = ({ isFocused }) => (isFocused ? '#006064' : '#dee4eb');

const border = state => ({
  marginLeft: '2px',
  marginRight: '2px',
  borderBottom: `2px solid ${borderColor(state)} !important`
});

const boxShadow = {
  boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.35)'
};

const styles = {
  container: (provided, state) => ({
    ...provided,
    display: 'inline-block',
    marginBottom: '0px'
  }),
  input: (provided, state) => ({
    ...provided,
    height: '19px'
  }),
  control: (provided, state) => ({
    ...provided,
    ...hideBorder(state),
    ...border(state),
    borderRadius: '0px',
    width: '360px',
    marginBottom: '0px'
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: '2px',
    paddingRight: '2px',
    background: 'blue',
    marginBottom: '0px'
  }),
  multiValue: (provided, state) => ({
    ...provided,
    fontSize: '0.75em',
    marginBottom: '0px',
    height: '15px'
    // width: '100px'
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#006064' : state.isFocused ? '#009ba1 !important' : 'white',
    color: state.isSelected || state.isFocused ? 'white' : 'inherit',
    '&:focus': {
      background: '#009ba1 !important'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: '4px !important',
    paddingTop: '2px',
    paddingBottom: '2px',
    ...hideBorder(state),
    ...boxShadow,
    width: '360px'
  }),
  placeholder: (provided, state) => ({
    ...provided,
    display: 'none'
  })
};

function Select(props) {
  return <SelectComp isMulti styles={styles} {...props} />;
}

export default Select;
