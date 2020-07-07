import React from 'react';
import styles from './style.module.scss';
Footer.propTypes = {};

function Footer(props) {
  return (
    <div className={styles.footer}>
      <p>
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

export default Footer;
