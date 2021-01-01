import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
Result.propTypes = {
  count: PropTypes.number,
  sec: PropTypes.number,
};

function Result({ count, sec }) {
  let wpm;
  if (count && sec) {
    wpm = count / 5 / (sec / 60);
  } else {
    wpm = 0;
  }
  return (
    <div className={styles.cpm}>
      <p>Your speed: {wpm} WPM </p>
    </div>
  );
}

export default Result;
