import styles from "./LoginAndRegistration.module.css";
import { useEffect, useState } from "react";
import { Registration } from "./Registration.jsx";
import sprite from "../../assets/icons/sprite.svg";

export const Login = ({ setDisplayedLoginPopUp }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisplayedRegistrationPopUp, setIsDisplayedRegistrationPopUp] =
    useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      setDisplayedLoginPopUp(false);
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isVisible]);

  const changeVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.popUp_background}>
      <div className={styles.popUp}>
        <div className={styles.popUp_header}>
          <p className={styles.popUp_title}>Вхід</p>
          <div className={styles.popUp_cross} onClick={changeVisibility}></div>
        </div>
        <div className={styles.popUp_container}>
          <form className={styles.popUp_form}>
            <div className={styles.popUp_fromGroup}>
              <label>Електронна пошта*</label>
              <div className={styles.popUp_inputContainer}>
                <svg width="24" height="24">
                  <use
                    href={sprite + "#icon-email"}
                    fill="#EEF1FF"
                    stroke="currentColor"
                  ></use>
                </svg>
                <input type="email" />
              </div>
            </div>
            <div className={styles.popUp_fromGroup}>
              <label>Пароль*</label>
              <div className={styles.popUp_inputContainer}>
                <svg width="24" height="24">
                  <use
                    href={sprite + "#icon-lock"}
                    fill="#EEF1FF"
                    stroke="currentColor"
                  ></use>
                </svg>
                <input type="password" />
              </div>
            </div>
            <button type="submit">Увійти</button>
            <a>Забули пароль?</a>
          </form>
          <hr />
          <p className={styles.popUp_question}>Досі немає акаунту?</p>
          <button onClick={() => setIsDisplayedRegistrationPopUp(true)}>
            Зареєструватись
          </button>
        </div>
        {isDisplayedRegistrationPopUp && (
          <Registration
            setIsDisplayedRegistrationPopUp={setIsDisplayedRegistrationPopUp}
          />
        )}
      </div>
    </div>
  );
};
