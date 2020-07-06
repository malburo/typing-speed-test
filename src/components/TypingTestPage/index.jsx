import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm';
import TextContent from '../TextContent';
import styles from './style.module.scss';
TypingTestPage.propTypes = {};

function TypingTestPage(props) {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
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

  const handleChangeInput = e => {
    setUserInput(e.target.value);
  };
  return (
    <div className={styles['home-page']}>
      <label htmlFor="userInput">
        <TextContent text={data} userInput={userInput} />
      </label>
      <InputForm onChange={handleChangeInput} />
    </div>
  );
}

export default TypingTestPage;
