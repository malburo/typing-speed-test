import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
Wpm.propTypes = {
  count: PropTypes.number,
  sec: PropTypes.number,
};

function Wpm({ count, sec }) {
  let wpm;
  if (count && sec) {
    wpm = count / 5 / (sec / 60);
  }
  return (
    <div className={styles.wpm}>
      <p>{Math.round(wpm)} wpm</p>
    </div>
  );
}

export default Wpm;
