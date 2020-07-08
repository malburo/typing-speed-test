import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.scss';
import Character from '../Character';
TextContent.propTypes = {
  text: PropTypes.array.isRequired,
};

function TextContent(props) {
  const { text, userInput } = props;
  return (
    <div className={styles.wrapper}>
      {text.map((character, index) => {
        let className;
        if (index < userInput.length) {
          className = character === userInput[index] ? 'right' : 'wrong';
        }
        return <Character character={character} key={index} className={className} />;
      })}
    </div>
  );
}

export default TextContent;
