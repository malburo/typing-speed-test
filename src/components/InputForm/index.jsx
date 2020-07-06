import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function InputForm(props) {
  const { onChange } = props;
  return (
    <input type="text" name="userInput" id="userInput" onChange={onChange} className={styles.input}/>
  );
}

export default InputForm;
