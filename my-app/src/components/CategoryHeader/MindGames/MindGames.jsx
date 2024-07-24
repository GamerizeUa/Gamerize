import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./MindGames.module.css";
import { useEffect } from "react";

const MindGames = ({
  mindGames,
  checkIconExistence,
  iconExists,
  toLowerText,
}) => {
  useEffect(() => {
    checkIconExistence(mindGames);
  }, [checkIconExistence, mindGames]);

  return (
    <div>
      <ul className={styles.mindGamesList}>
        {mindGames.map((game) => (
          <li key={game.id} className={styles.mindGamesListItem}>
            <Link
              to="/catalog"
              state={{ mindGames: game.id }}
              className={styles.mindGamesListLink}
            >
              <div className={styles.mindGamesIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      iconExists[game.id]
                        ? sprite + `#icon-${toLowerText(game.description)}`
                        : sprite + `#icon-historical`
                    }
                    fill="#EEF1FF"
                  ></use>
                </svg>
              </div>
              <p>{game.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MindGames;
