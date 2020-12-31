import TypingTestPage from "./components/MainPage";
import styles from "./app.module.scss";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className={styles.app}>
      <TypingTestPage />
      <Footer />
    </div>
  );
}

export default App;
