import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import restart from "../../assets/img/restart.svg";
import wordList from "../../data";
import randomWord from "../../helpers/randomWord";
import Cpm from "../CPM";
import InputForm from "../InputForm";
import TextContent from "../TextContent";
import Wpm from "../WPM";
import styles from "./style.module.scss";

function TypingTestPage() {
  const [data, setData] = useState(() => {
    const data = randomWord(wordList);
    return data;
  });
  const [userInput, setUserInput] = useState("");
  const [count, setCount] = useState(0);
  const [sec, setSec] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setSec((prevSec) => prevSec + 1);
      }, 1000);
      setStarted(true);
    }
    return () => clearInterval(interval);
  }, [started]);

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (value) {
      setStarted(true);
    } else {
      setStarted(false);
    }
    setUserInput(value);
    countCorrectSymbols(value);
    handleFinished(value);
  };
  const countCorrectSymbols = (userInput) => {
    const text = data.join("").split(" ").join("").split("");
    const input = userInput.split(" ").join("").split("");
    const result = input.filter((l, i) => l === text[i]).length;
    setCount(result);
  };

  const handleFinished = (userInput) => {
    if (userInput.length >= data.length) {
      setFinished(true);
      setStarted(false);
    }
  };
  const handleReset = () => {
    const newData = randomWord(wordList);
    setData(newData);
    setUserInput("");
    setCount(0);
    setSec(0);
    setStarted(false);
    setFinished(false);
  };
  return (
    <Container>
      <div className={styles["home-page"]}>
        <Row>
          <Col>
            <Row>
              <Col>
                <p className={styles.title}>Typing speed test 🍉</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="userInput" className={styles.text}>
                  <TextContent
                    characterList={data}
                    userInput={userInput}
                    countCorrectSymbols={countCorrectSymbols}
                  />
                </label>
              </Col>
            </Row>
            {!finished && (
              <InputForm onChange={handleChangeInput} value={userInput} />
            )}

            <Row>
              <Col>
                <div className={styles["try-again"]}>
                  <img
                    src={restart}
                    alt="restart"
                    className={styles.restart}
                    onClick={handleReset}
                  />
                </div>
              </Col>
            </Row>
            {finished && (
              <div className={styles.result}>
                <Row className="justify-content-center">
                  <Col md="3">
                    <Wpm count={count} sec={sec} />
                  </Col>
                  <Col md="3">
                    <Cpm count={count} sec={sec} />
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default TypingTestPage;
