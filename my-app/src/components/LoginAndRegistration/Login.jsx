import styles from "./LoginAndRegistration.module.css";
import React, {useState} from "react";
import sprite from "../../assets/icons/sprite.svg";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from "axios";
import useNoScroll from "../hooks/useNoScroll.js";
import Cookies from "js-cookie";
import {sendRequestWithLoading} from "../../utils/sendRequestWithLoading.js";
import {getWishListProductsIds} from "../../redux/wishListSlice.js";
import {useDispatch} from "react-redux";

export const Login = ({setDisplayedLoginPopUp, setIsDisplayedRegistrationPopUp, setIsDisplayedEmailForm}) => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const[loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useNoScroll(true);

    const schema = yup.object().shape({
        email: yup.string().required("Введіть е-пошту")
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту"),
        password: yup.string().required("Введіть пароль"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = (data) => {
        const link = 'https://gamerize.ltd.ua/api/Login/login';

        const toDoInTimeout = () => {
            setLoading(false)
            Cookies.set('auth', "true")
            dispatch(getWishListProductsIds());
            closePopUp();
        }

        const toDoInCatch = () => {
            setIsErrorVisible(true)
        }

        sendRequestWithLoading(data,link,setLoading, toDoInTimeout, toDoInCatch)

    }

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    }

    const closePopUp = () => {
        setDisplayedLoginPopUp(false);
    };

    return (
        <div className={styles.popUp_background} onClick={closePopupByClicking}>
            <div className={styles.popUp}>
                <div className={styles.popUp_header}>
                    <p className={styles.popUp_title}>Вхід</p>
                    <div className={styles.popUp_cross} onClick={closePopUp}></div>
                </div>
                <div className={styles.popUp_container}>
                        <form className={styles.popUp_form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.popUp_formGroup}>
                                <label>Електронна пошта*</label>
                                <div className={styles.popUp_inputContainer}>
                                    <svg width="24" height="24">
                                        <use
                                            href={sprite + "#icon-email"}
                                            fill="#EEF1FF"
                                            stroke="currentColor"
                                        ></use>
                                    </svg>
                                    <input type="text"  {...register("email")}/>
                                </div>
                                <p className={styles.input_error}>{errors.email?.message}</p>
                            </div>
                            <div className={styles.popUp_formGroup}>
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
                            <button type="submit" className={loading && 'loadingButton'}>
                                {loading ? "Вхід в акаунт..." : "Увійти"}
                            </button>
                            {isErrorVisible && <p className={styles.input_userError}>
                                Помилка входу. Перевірте правильність е-пошти та пароля.
                            </p>}
                            <a onClick={() => setIsDisplayedEmailForm(true)}>Забули пароль?</a>
                        </form>
                            <hr/>
                            <p className={styles.popUp_question}>Досі немає акаунту?</p>
                            <button onClick={() => setIsDisplayedRegistrationPopUp(true)}>
                                Зареєструватись
                            </button>
                    </div>
                </div>
        </div>
    );
};
