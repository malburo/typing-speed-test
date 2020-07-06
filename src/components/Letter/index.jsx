import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
Letter.propTypes = {
  Letter: PropTypes.string,
};

function Letter(props) {
  const { letter, className } = props;
  return <span className={styles[className]}>{letter}</span>;
}

export default Letter;
