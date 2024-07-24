import styles from "./Themes.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Themes = ({ themes, checkIconExistence, iconExists, toLowerText }) => {
  useEffect(() => {
    checkIconExistence(themes);
  }, [checkIconExistence, themes]);

  return (
    <div>
      <ul className={styles.themesList}>
        {themes.map((theme) => (
          <li key={theme.id} className={styles.themesListItem}>
            <Link
              to="/catalog"
              state={{ themes: theme.id }}
              className={styles.themesListLink}
            >
              <div className={styles.themesIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      iconExists[theme.id]
                        ? sprite + `#icon-${toLowerText(theme.description)}`
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
