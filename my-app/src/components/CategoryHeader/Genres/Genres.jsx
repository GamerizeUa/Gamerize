import { Link } from "react-router-dom";
import styles from "./Genres.module.css";

const Genres = ({ genres }) => {
  return (
    <div>
      <ul className={styles.genresList}>
        {genres.map((genre) => (
          <li key={genre.id} className={styles.genresListItem}>
            <Link
              to="/catalog"
              state={{ genre: genre.name }}
              className={styles.genresListLink}
            >
              <div className={styles.genresIcon}>
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 18H16V16H2V18ZM5.3 14H12.7L12.125 10H5.875L5.3 14ZM0 20V16C0 15.45 0.195833 14.9792 0.5875 14.5875C0.979167 14.1958 1.45 14 2 14H3.3L3.85 10H1V8H17V10H14.15L14.7 14H16C16.55 14 17.0208 14.1958 17.4125 14.5875C17.8042 14.9792 18 15.45 18 16V20H0ZM3.775 8L2 0C2.55 0.416667 3.11667 0.808333 3.7 1.175C4.28333 1.54167 4.925 1.725 5.625 1.725C6.29167 1.725 6.90417 1.55417 7.4625 1.2125C8.02083 0.870833 8.53333 0.466667 9 0C9.46667 0.466667 9.97917 0.870833 10.5375 1.2125C11.0958 1.55417 11.7083 1.725 12.375 1.725C13.075 1.725 13.7167 1.54167 14.3 1.175C14.8833 0.808333 15.45 0.416667 16 0L14.225 8H12.175L13.15 3.675L12.9625 3.7C12.8375 3.71667 12.6417 3.725 12.375 3.725C11.775 3.725 11.1875 3.63333 10.6125 3.45C10.0375 3.26667 9.5 3.00833 9 2.675C8.51667 3.00833 7.99583 3.26667 7.4375 3.45C6.87917 3.63333 6.30833 3.725 5.725 3.725C5.425 3.725 5.20417 3.71667 5.0625 3.7L4.85 3.675L5.825 8H3.775Z"
                    fill="#AAC4FF"
                  />
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
