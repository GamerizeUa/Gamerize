import { useDispatch, useSelector } from "react-redux";
import styles from "./Themes.module.css";
import { useEffect } from "react";
import { selectThemes } from "../../../redux/selectors";
import { fetchAllThemes } from "../../../redux/categories/themesSlice";

const Themes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllThemes());
  }, [dispatch]);

  const themes = useSelector(selectThemes);

  return (
    <div>
      <ul className={styles.themesList}>
        {themes.map((theme) => (
          <li key={theme.id} className={styles.themesListItem}>
            <div className={styles.themesIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 22.75H3.5C3.30109 22.75 3.11032 22.671 2.96967 22.5303C2.82902 22.3897 2.75 22.1989 2.75 22C2.75 21.8011 2.82902 21.6103 2.96967 21.4697C3.11032 21.329 3.30109 21.25 3.5 21.25H20.5C20.6989 21.25 20.8897 21.329 21.0303 21.4697C21.171 21.6103 21.25 21.8011 21.25 22C21.25 22.1989 21.171 22.3897 21.0303 22.5303C20.8897 22.671 20.6989 22.75 20.5 22.75Z"
                  fill="#AAC4FF"
                />
                <path
                  d="M6.5 22.7499C6.30189 22.7473 6.11263 22.6675 5.97253 22.5274C5.83244 22.3873 5.75259 22.198 5.75 21.9999V1.99992C5.75059 1.87289 5.78344 1.74809 5.84547 1.63722C5.9075 1.52636 5.99667 1.43307 6.10462 1.3661C6.21257 1.29913 6.33576 1.26068 6.46264 1.25435C6.58952 1.24802 6.71592 1.27403 6.83 1.32992L18.83 7.32992C18.9573 7.38961 19.065 7.48433 19.1404 7.60299C19.2158 7.72164 19.2558 7.85933 19.2558 7.99992C19.2558 8.14052 19.2158 8.2782 19.1404 8.39686C19.065 8.51552 18.9573 8.61023 18.83 8.66992L7.25 14.4599V21.9999C7.24741 22.198 7.16756 22.3873 7.02747 22.5274C6.88737 22.6675 6.69811 22.7473 6.5 22.7499ZM7.25 3.20992V12.7899L16.82 7.99992L7.25 3.20992Z"
                  fill="#AAC4FF"
                />
              </svg>
            </div>
            <p className={styles.themesText}>{theme.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
