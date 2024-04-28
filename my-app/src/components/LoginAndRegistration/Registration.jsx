import styles from "./LoginAndRegistration.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";
import React, {useState} from "react";

export const Registration = ({ setIsDisplayedRegistrationPopUp }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const closePopUp = () => {
    setIsDisplayedRegistrationPopUp(false);
  };

  const schema = yup.object().shape({
    email: yup.string().email().required("Введіть е-пошту")
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
    password: yup.string().required("Введіть пароль").matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
        'Пароль повинен містити принаймні 6 символів, серед яких цифра, велика літера та спеціальний символ'
    ),
    confirmPassword: yup.string() .oneOf([yup.ref('password'), null],
        'Паролі повинні співпадати').required("Повторіть пароль")
  });

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) =>{
    console.log(errors)
    Axios.post('https://gamerize.ltd.ua/api/Account/register', data)
        .then(closePopUp)
        .catch((err) => setIsErrorVisible(true))
  }

  return (
    <div className={styles.popUp}>
      <div className={styles.popUp_header}>
        <p className={styles.popUp_title}>Реєстрація</p>
        <div className={styles.popUp_cross} onClick={closePopUp}></div>
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
              <input type="email" {...register("email")}/>
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
              <input type="password" {...register("confirmPassword")}/>
            </div>
            <p className={styles.input_error}>{errors.confirmPassword?.message}</p>
          </div>
          <hr className={styles.popUp_registrationHr}/>
          <button type="submit">Зареєструватись</button>
          {isErrorVisible && <p className={styles.input_userError}>Користувач з такою е-поштою вже існує</p>}
        </form>
      </div>
    </div>
  );
};
