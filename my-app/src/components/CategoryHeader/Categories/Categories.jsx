import styles from "./Categories.module.css";
import { fetchAllCategories } from "../../../redux/categories/categoriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../../redux/selectors";

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  return (
    <div>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryListItem}>
            <div className={styles.categoryIcon}>
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0L22 8.25L20.8 9.85L19 8.5V18H3V8.5L1.2 9.85L0 8.25L11 0ZM6.35 9.05C6.35 9.93333 6.825 10.875 7.775 11.875C8.725 12.875 9.8 13.9167 11 15C12.2 13.9167 13.275 12.875 14.225 11.875C15.175 10.875 15.65 9.93333 15.65 9.05C15.65 8.31667 15.4 7.70833 14.9 7.225C14.4 6.74167 13.8 6.5 13.1 6.5C12.6667 6.5 12.2708 6.5875 11.9125 6.7625C11.5542 6.9375 11.25 7.16667 11 7.45C10.75 7.16667 10.4375 6.9375 10.0625 6.7625C9.6875 6.5875 9.3 6.5 8.9 6.5C8.2 6.5 7.6 6.74167 7.1 7.225C6.6 7.70833 6.35 8.31667 6.35 9.05ZM17 16V7L11 2.5L5 7V16H17Z"
                  fill="#AAC4FF"
                />
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
