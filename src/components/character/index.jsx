import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
Character.propTypes = {
  character: PropTypes.string,
};

function Character(props) {
  const { character, className } = props;
  return <span className={styles[className]}>{character}</span>;
}

export default Character;
