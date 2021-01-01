import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import restart from "./assets/img/restart.svg";
import styles from "./app.module.scss";
import randomWord from "./helpers/randomWord";
import wordList from "./db/data";
import TextContent from "./components/TextContent";
import InputForm from "./components/InputForm";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Result from "./components/Result";

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
    <div className={styles.app}>
      <label htmlFor="userInput">
        <Container>
          <Row>
            <Col>
              <p className={styles.title}>⚡ Typing speed test ⚡</p>
            </Col>
          </Row>
          {!finished && (
            <Row>
              <Col>
                <div className={styles.text}>
                  <TextContent
                    characterList={data}
                    userInput={userInput}
                    countCorrectSymbols={countCorrectSymbols}
                  />
                  <InputForm onChange={handleChangeInput} value={userInput} />
                </div>
              </Col>
            </Row>
          )}
          {finished && (
            <Row>
              <Col>
                <Result count={count} sec={sec} />
              </Col>
            </Row>
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
        </Container>
      </label>
      <Footer />
    </div>
  );
}

export default TypingTestPage;
