import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm';
import TextContent from '../TextContent';
import styles from './style.module.scss';
import Wpm from '../wpm';
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
  };

  return (
    <div className={styles['home-page']}>
      <label htmlFor="userInput">
        <TextContent
          text={data}
          userInput={userInput}
          countCorrectSymbols={countCorrectSymbols}
        />
      </label>
      <InputForm onChange={handleChangeInput} />
      {finished && <Wpm count={count} sec={sec} />}
    </div>
  );
}

export default TypingTestPage;
