import styles from "./SelectionOfGames.module.css";
import { Link } from "react-router-dom";
import imageCompanyGame from "../../../assets/images/selection_company.jpg";
import imageCoupleGame from "../../../assets/images/selection_couple.jpg";
import imageKidsGame from "../../../assets/images/selection_kids.jpg";
import imageTwoGame from "../../../assets/images/selection_two.jpg";

export const SelectionOfGames = () => {
  return (
    <section className={styles.gamesSelection}>
      <div className={styles.gamesSelection_outerContainer + " container"}>
        <p className={styles.gamesSelection_title}>Підбірки ігор</p>
        <div className={styles.gamesSelection_container}>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: 'Для Компанії', playersAmount: ['4 - 6', 2, null]}}>
            <img
              src={imageCompanyGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП 10 ігор для компанії
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: "Для Пар"}}>
            <img
              src={imageCoupleGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП 10 ігор для пар
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: "Для Дітей"}}>
            <img
              src={imageKidsGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП 10 ігор для дітей
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ category: "Для Двох"}}>
            <img
              src={imageTwoGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП 10 ігор для двох
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
