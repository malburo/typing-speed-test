import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm';
import TextContent from '../TextContent';
import styles from './style.module.scss';
import Wpm from '../WPM';
import { Container, Row, Col } from 'reactstrap';
TypingTestPage.propTypes = {};

function TypingTestPage(props) {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [count, setCount] = useState(0);
  const [sec, setSec] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(
        'https://hipsum.co/api/?type=vocabulary&sentences=3'
      );
      const textArray = response.data[0].split('');
      setData(textArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setSec(prevSec => prevSec + 1);
      }, 1000);
      setStarted(true);
    }

    return () => clearInterval(interval);
  }, [started]);

  const handleChangeInput = e => {
    if (!finished) {
      setStarted(true);
    }
    setUserInput(e.target.value);
    countCorrectSymbols(e.target.value);
    handleFinished(e.target.value);
  };
  const countCorrectSymbols = userInput => {
    const text = data.join('').split(' ').join('').split('');
    const input = userInput.split(' ').join('').split('');
    const result = input.filter((l, i) => l === text[i]).length;
    setCount(result);
  };

  const handleFinished = userInput => {
    if (userInput.length === data.length) {
      clearInterval(userInput);
      setFinished(true);
      setStarted(false);
    }
    if (userInput.length < data.length) {
      setFinished(false);
    }
  };
  const handleReset = async () => {
    const response = await Axios.get(
      'https://hipsum.co/api/?type=vocabulary&sentences=3'
    );
    const textArray = response.data[0].split('');
    setData(textArray);
    setUserInput('');
    setCount(0);
    setSec(0);
    setStarted(false);
    setFinished(false);
  };
  return (
    <Container>
      <div className={styles['home-page']}>
        <Row>
          <Col>
            <Row>
              <Col>
                <p className={styles.title}>Typing speed test</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="userInput" className={styles.text}>
                  <TextContent
                    text={data}
                    userInput={userInput}
                    countCorrectSymbols={countCorrectSymbols}
                  />
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className={styles.input}>
                  <InputForm onChange={handleChangeInput} value={userInput} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className={styles['try-again']}>
                  <button onClick={handleReset}>Try again</button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>{finished && <Wpm count={count} sec={sec} />}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default TypingTestPage;
