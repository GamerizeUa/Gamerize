import styles from "./Themes.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const Themes = ({ themes }) => {
  return (
    <div>
      <ul className={styles.themesList}>
        {themes.map((theme) => (
          <li key={theme.id} className={styles.themesListItem}>
            <div className={styles.themesIcon}>
              <svg width="24" height="24">
                <use
                  href={sprite + `#icon-${theme.description}`}
                  fill="#EEF1FF"
                ></use>
              </svg>
            </div>
            <p className={styles.themesText}>{theme.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
