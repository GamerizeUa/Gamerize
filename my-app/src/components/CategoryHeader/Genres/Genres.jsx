import { Link } from 'react-router-dom';
import sprite from '@/assets/icons/sprite.svg';
import styles from './Genres.module.css';
import { useEffect } from 'react';

const Genres = ({ genres, checkIconExistence, iconExists, toLowerText }) => {
    useEffect(() => {
        checkIconExistence(genres);
    }, [checkIconExistence, genres]);

    return (
        <div>
            <ul className={styles.genresList}>
                {genres.map((genre) => (
                    <li key={genre.id} className={styles.genresListItem}>
                        <Link
                            to="/catalog"
                            state={{ genres: genre.id }}
                            className={styles.genresListLink}
                        >
                            <div className={styles.genresIcon}>
                                <svg width="24" height="24">
                                    <use
                                        href={
                                            iconExists[genre.id]
                                                ? sprite +
                                                  `#icon-${toLowerText(
                                                      genre.description
                                                  )}`
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
