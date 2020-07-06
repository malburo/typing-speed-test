import React from 'react';

import TypingTestPage from './components/TypingTestPage';
import styles from './app.module.scss';
function App() {
  return (
    <div className={styles.app}>
      <TypingTestPage />
      <p className={styles.footer}>
        Code by{' '}
        <a
          href="https://github.com/malburo"
          target="_blank"
          rel="noopener noreferrer">
          Malburo
        </a>
      </p>
    </div>
  );
}

export default App;
