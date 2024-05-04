import styles from "./LoginAndRegistration.module.css";
import React, { useEffect, useState } from "react";
import { Registration } from "./Registration.jsx";
import sprite from "../../assets/icons/sprite.svg";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";

export const Login = ({ setDisplayedLoginPopUp }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisplayedRegistrationPopUp, setIsDisplayedRegistrationPopUp] =
    useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

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

  const schema = yup.object().shape({
    email: yup.string().email("Введіть коректну е-пошту").required("Введіть е-пошту")
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
    password: yup.string().required("Введіть пароль"),
  });

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) =>{
    console.log(data)
    Axios.post('https://gamerize.ltd.ua/api/Login/login', data)
        .then((res) => {
          changeVisibility();
          localStorage.setItem("userID", res.data.userId);
          localStorage.setItem("token", res.data.token.token);
        })
        .catch((err) => {
          setIsErrorVisible(true)
          console.log(err)
        })
  }

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
          <form className={styles.popUp_form} onSubmit={handleSubmit(onSubmit)}>
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
                <input type="email"  {...register("email")}/>
              </div>
              <p className={styles.input_error}>{errors.email?.message}</p>
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
                <input type="password" {...register("password")}/>
              </div>
              <p className={styles.input_error}>{errors.password?.message}</p>
            </div>
            <button type="submit">Увійти</button>
            {isErrorVisible && <p className={styles.input_userError}>
              Помилка входу. Перевірте правильність е-пошти та пароля.
            </p>}
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
