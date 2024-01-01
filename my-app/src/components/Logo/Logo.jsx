import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link to="/">
      <h1 className={styles.logo}>Gamerise</h1>
    </Link>
  );
};
