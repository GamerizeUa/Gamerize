import styles from "./LoginAndRegistration.module.css";
import sprite from "../../assets/icons/sprite.svg";

export const Registration = ({ setIsDisplayedRegistrationPopUp }) => {
  const closePopUp = () => {
    setIsDisplayedRegistrationPopUp(false);
  };

  return (
    <div className={styles.popUp}>
      <div className={styles.popUp_header}>
        <p className={styles.popUp_title}>Реєстрація</p>
        <div className={styles.popUp_cross} onClick={closePopUp}></div>
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
          <div className={styles.popUp_fromGroup}>
            <label>Повторити пароль*</label>
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
          <hr className={styles.popUp_registrationHr} />
          <button type="submit">Зареєструватись</button>
        </form>
      </div>
    </div>
  );
};
