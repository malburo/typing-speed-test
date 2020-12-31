import React from "react";
import styles from "./style.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        Code by{" "}
        <a
          href="https://github.com/malburo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Malburo
        </a>
      </p>
    </div>
  );
}

export default Footer;
