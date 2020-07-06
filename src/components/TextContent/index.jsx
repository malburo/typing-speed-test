import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
import Letter from '../Letter';
TextContent.propTypes = {
  text: PropTypes.array.isRequired,
};

function TextContent(props) {
  const { text, userInput } = props;
  return (
    <div className={styles.wrapper}>
      {text.map((letter, index) => {
        let className;
        if (index < userInput.length) {
          className = letter === userInput[index] ? 'right' : 'wrong';
        }
        return <Letter letter={letter} key={index} className={className} />;
      })}
    </div>
  );
}

export default TextContent;
