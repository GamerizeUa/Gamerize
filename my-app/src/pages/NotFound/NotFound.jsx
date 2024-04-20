import styles from "./NotFound.module.css";
import notFound from "../../assets/images/notFound.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.notFound + " container"}>
      <div className={styles.notFoundImgBlock}>
        <span className={styles.notFoundNumber}>4</span>
        <img src={notFound} alt="Not Found" className={styles.notFoundImage} />
        <span className={styles.notFoundNumber}>4</span>
      </div>
      <p className={styles.notFoundTitle}>Лишенько!</p>
      <p className={styles.notFoundText}>
        Сторінка, яку ти шукав, пішла грати у настільні ігри
      </p>
      <Link to="/">
        <button className={styles.onMainPageBtn}> На головну</button>
      </Link>
    </div>
  );
}
