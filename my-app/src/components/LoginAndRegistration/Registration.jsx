import styles from "./LoginAndRegistration.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";
import React, {useState} from "react";

export const Registration = ({ setIsDisplayedRegistrationPopUp }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isConfirmMessage, setIsConfirmMessage] = useState(false);

  const closePopUp = () => {
    setIsDisplayedRegistrationPopUp(false);
  };

  const schema = yup.object().shape({
    name: yup.string().required('Введіть ім\'я та прізвище')
        .matches(/^[a-zA-Zа-яА-Я'\-]+\s[a-zA-Zа-яА-Я'\-]+$/i, 'Введіть ім\'я та прізвище' ),
    email: yup.string().required("Введіть е-пошту")
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
    password: yup.string().required("Введіть пароль").matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
        'Пароль повинен містити принаймні 6 символів, серед яких цифра, велика літера та спеціальний символ'
    ),
    confirmPassword: yup.string() .oneOf([yup.ref('password'), null],
        'Паролі повинні співпадати').required("Повторіть пароль")
  });

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = (data) =>{
    Axios.post('https://gamerize.ltd.ua/api/Register/register', data)
        .then(() => {
          setIsConfirmMessage(true)
        })
        .catch((err) => setIsErrorVisible(true))
  }

  return (
    <div className={styles.popUp}>
      <div className={styles.popUp_header}>
        <p className={styles.popUp_title}>Реєстрація</p>
        <div className={styles.popUp_cross} onClick={closePopUp}></div>
      </div>
      <div className={styles.popUp_container}>
        {isConfirmMessage ?
            (<p className={styles.popUp_confirmEmail}>Підтвердіть, будь ласка, реєстрацію на електронній пошті.</p>)
            : (
                <form className={styles.popUp_form} onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.popUp_fromGroup}>
                    <label>Ім'я та Прізвище*</label>
                    <div className={styles.popUp_inputContainer}>
                      <svg width="24" height="24">
                        <use
                            href={sprite + "#icon-user24"}
                            fill="none"
                        ></use>
                      </svg>
                      <input type="text" {...register("name")}/>
                    </div>
                    <p className={styles.input_error}>{errors.name?.message}</p>
                  </div>
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
                      <input type="text" {...register("email")}/>
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
            )}
      </div>
    </div>
  );
};
