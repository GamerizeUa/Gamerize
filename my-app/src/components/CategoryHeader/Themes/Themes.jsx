import styles from "./Themes.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";

const Themes = ({ themes }) => {
  return (
    <div>
      <ul className={styles.themesList}>
        {themes.map((theme) => (
          <li key={theme.id} className={styles.themesListItem}>
            <Link
              to="/catalog"
              state={{ themes: theme.name }}
              className={styles.themesListLink}
            >
              <div className={styles.themesIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      theme.description &&
                      sprite.includes(`icon-${theme.description}`)
                        ? sprite + `#icon-${theme.description}`
                        : sprite + `#icon-historical`
                    }
                    fill="#EEF1FF"
                  ></use>
                </svg>
              </div>
              <p className={styles.themesText}>{theme.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
