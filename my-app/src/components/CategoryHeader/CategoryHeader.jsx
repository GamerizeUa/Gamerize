import styles from "./CategoryHeader.module.css";

const CategoryHeader = () => {
  return (
    <div className={styles.categoryHeader}>
      <ul className={styles.categoryList}>
        <li>Настільні ігри</li>
        <li>Жанри</li>
        <li>Тематика</li>
        <li>Пазли</li>
        <li>Головоломки</li>
      </ul>
    </div>
  );
};

export default CategoryHeader;
