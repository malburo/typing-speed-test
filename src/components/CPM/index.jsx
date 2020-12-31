import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
Cpm.propTypes = {
  count: PropTypes.number,
  sec: PropTypes.number,
};

function Cpm({ count, sec }) {
  let cpm;
  if (count && sec) {
    cpm = count / (sec / 60);
  }
  return (
    <div className={styles.cpm}>
      <p>{Math.round(cpm)} cpm</p>
    </div>
  );
}

export default Cpm;
