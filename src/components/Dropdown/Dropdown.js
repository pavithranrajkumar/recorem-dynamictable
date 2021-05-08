import classes from './Dropdown.module.css';
import React, { useEffect } from 'react';

const Dropdown = ({ name, options = [], onChange, defaultValue = null }) => {
  return (
    <select name={name} className={classes.Dropdown} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default Dropdown;
