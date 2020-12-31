import PropTypes from "prop-types";
import React from "react";
import styles from "./style.module.scss";

TextContent.propTypes = {
  characterList: PropTypes.array.isRequired,
};

function TextContent({ characterList, userInput }) {
  return (
    <div className={styles.wrapper}>
      {characterList.map((character, index) => {
        if (index === userInput.length) {
          return <span className={styles.active}>{character}</span>;
        }
        if (index < userInput.length) {
          return (
            <span
              className={
                character === userInput[index]
                  ? styles.correct
                  : styles.incorrect
              }
            >
              {character}
            </span>
          );
        }
        return <span>{character}</span>;
      })}
    </div>
  );
}

export default TextContent;
