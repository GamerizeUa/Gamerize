import styles from "./Categories.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const Categories = ({ categories }) => {
  return (
    <div>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryListItem}>
            <div className={styles.categoryIcon}>
              <svg width="24" height="24">
                <use
                  href={sprite + `#icon-${category.description}`}
                  fill="#EEF1FF"
                ></use>
              </svg>
            </div>
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
