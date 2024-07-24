import { Link } from "react-router-dom";
import styles from "./Puzzles.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { useEffect } from "react";

const Puzzles = ({ puzzles, checkIconExistence, iconExists, toLowerText }) => {
  useEffect(() => {
    checkIconExistence(puzzles);
  }, [checkIconExistence, puzzles]);

  return (
    <div>
      <ul className={styles.puzzlesList}>
        {puzzles.map((puzzle) => (
          <li key={puzzle.id} className={styles.puzzlesListItem}>
            <Link
              to="/catalog"
              state={{ puzzles: puzzle.id }}
              className={styles.puzzlesListLink}
            >
              <div className={styles.puzzlesIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      iconExists[puzzle.id]
                        ? sprite + `#icon-${toLowerText(puzzle.description)}`
                        : sprite + `#icon-puzzle`
                    }
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
