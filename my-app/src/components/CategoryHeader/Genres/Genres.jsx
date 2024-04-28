import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./Genres.module.css";

const Genres = ({ genres }) => {
  return (
    <div>
      <ul className={styles.genresList}>
        {genres.map((genre) => (
          <li key={genre.id} className={styles.genresListItem}>
            <Link
              to="/catalog"
              state={{ genres: genre.name }}
              className={styles.genresListLink}
            >
              <div className={styles.genresIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      genre.description &&
                      sprite.includes(`icon-${genre.description}`)
                        ? sprite + `#icon-${genre.description}`
                        : sprite + `#icon-strategies`
                    }
                    fill="#EEF1FF"
                  ></use>
                </svg>
              </div>
              <p>{genre.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
