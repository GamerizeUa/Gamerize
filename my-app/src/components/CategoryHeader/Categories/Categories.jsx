import styles from "./Categories.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Categories = ({ categories }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleChangedSize);
    return () => {
      window.removeEventListener("resize", handleChangedSize);
    };
  }, []);

  return (
    <div>
      <ul
        className={styles.categoryList}
        // className={
        //   windowWidth < 768
        //     ? styles.categoryListMobile
        //     : windowWidth < 1024
        //     ? styles.categoryListTablet
        //     : styles.categoryListDesktop
        // }
      >
        {categories.map((category) => (
          <li key={category.id} className={styles.categoryListItem}>
            <Link
              to="/catalog"
              state={{ categories: category.name }}
              className={styles.categoryListLink}
            >
              <div className={styles.categoryIcon}>
                <svg width="24" height="24">
                  <use
                    href={
                      category.description &&
                      sprite.includes(`icon-${category.description}`)
                        ? sprite + `#icon-${category.description}`
                        : sprite + `#icon-cards`
                    }
                    fill="#EEF1FF"
                  ></use>
                </svg>
              </div>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
