import { Link } from "react-router-dom";
import styles from "./Puzzles.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const Puzzles = ({ puzzles }) => {
  return (
    <div>
      <ul className={styles.puzzlesList}>
        {puzzles.map((puzzle) => (
          <li key={puzzle.id} className={styles.puzzlesListItem}>
            <Link
              to="/catalog"
              state={{ categories: puzzle.name }}
              className={styles.puzzlesListLink}
            >
              <div className={styles.puzzlesIcon}>
                <svg width="24" height="24">
                  <use
                    href={sprite + `#icon-${puzzle.description}`}
                    fill="#EEF1FF"
                  ></use>
                </svg>
              </div>
              <p>{puzzle.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Puzzles;
