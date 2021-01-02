import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function InputForm({ onChange, value }) {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <input
      ref={inputEl}
      type="text"
      name="userInput"
      id="userInput"
      onChange={onChange}
      className={styles.input}
      value={value}
      autoComplete="off"
    />
  );
}

export default InputForm;
