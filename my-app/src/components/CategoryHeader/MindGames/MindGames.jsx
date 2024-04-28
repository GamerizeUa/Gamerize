import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./MindGames.module.css";

const MindGames = ({ mindGames }) => {
  return (
    <div>
      <ul className={styles.mindGamesList}>
        {mindGames.map((game) => (
          <li key={game.id} className={styles.mindGamesListItem}>
            <Link
              to="/catalog"
              state={{ mindGames: game.name }}
              className={styles.mindGamesListLink}
            >
              <div className={styles.mindGamesIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      game.description &&
                      sprite.includes(`icon-${game.description}`)
                        ? sprite + `#icon-${game.description}`
                        : sprite + `#icon-quests`
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
