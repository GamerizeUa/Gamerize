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
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: 'Для компанії'}}>
            <img
              src={imageCompanyGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП ігор для компанії
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: "Для сім’ї"}}>
            <img
              src={imageCoupleGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП ігор для сім'ї
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: "Для дітей"}}>
            <img
              src={imageKidsGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП ігор для дітей
            </p>
          </Link>
          <Link className={styles.gamesSelection_choice} to="/catalog" state={{ categories: "Для двох"}}>
            <img
              src={imageTwoGame}
              className={styles.gamesSelection_image}
              alt="People"
            />
            <p className={styles.gamesSelection_category}>
              ТОП ігор для двох
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
