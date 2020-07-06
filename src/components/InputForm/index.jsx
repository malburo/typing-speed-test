import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function InputForm(props) {
  const { onChange, value } = props;
  return (
    <input
      type="text"
      name="userInput"
      id="userInput"
      onChange={onChange}
      className={styles.input}
      value={value}
    />
  );
}

export default InputForm;
