import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm';
import TextContent from '../TextContent';
import styles from './style.module.scss';
import Wpm from '../WPM';
import { Container, Row, Col } from 'reactstrap';
import Cpm from '../CPM';
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
  const countCorrectSymbols = userInput => {
    const text = data.join('').split(' ').join('').split('');
    const input = userInput.split(' ').join('').split('');
    const result = input.filter((l, i) => l === text[i]).length;
    setCount(result);
  };

  const handleFinished = userInput => {
    if (userInput.length >= data.length) {
      setFinished(true);
      setStarted(false);
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
            {!finished && (
              <Row>
                <Col>
                  <div className={styles.input}>
                    <InputForm onChange={handleChangeInput} value={userInput} />
                  </div>
                </Col>
              </Row>
            )}
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
            <Row>
              <Col>
                <div className={styles['try-again']}>
                  <button onClick={handleReset}>Try again</button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default TypingTestPage;
