import PropTypes from "prop-types";
import styles from "./style.module.scss";

TextContent.propTypes = {
  characterList: PropTypes.array.isRequired,
};

function TextContent({ characterList, userInput }) {
  return (
    <div className={styles.wrapper}>
      {characterList.map((character, index) => {
        if (index === userInput.length) {
          return (
            <span key={index} className={styles.active}>
              {character}
            </span>
          );
        }
        if (index < userInput.length) {
          return (
            <span
              key={index}
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
        return <span key={index}>{character}</span>;
      })}
    </div>
  );
}

export default TextContent;
