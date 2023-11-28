import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound + " container"}>
      <img></img>
      <p>Лишенько!</p>
      <p>Сторінка, яку ти шукав, пішла грати у настільні ігри.</p>
      <button>
        <a href="/" className={styles.onMainPageBtn}>
          На головну
        </a>
      </button>
    </div>
  );
}
