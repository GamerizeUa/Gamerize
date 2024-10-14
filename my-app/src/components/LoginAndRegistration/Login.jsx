import styles from './LoginAndRegistration.module.css';
import { useState } from 'react';
import sprite from '@/assets/icons/sprite.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useNoScroll from '@/hooks/useNoScroll.js';
import Cookies from 'js-cookie';
import { sendRequestWithLoading } from '@/utils/sendRequestWithLoading.js';
import { getWishListProductsIds } from '@/redux/wishListSlice.js';
import { useDispatch } from 'react-redux';
import {
    assignIsDisplayedEmailForm,
    assignIsDisplayedLoginPopUp,
    assignIsDisplayedRegistrationPopUp,
} from '@/redux/formsDisplaying.js';
import { loginSchema } from '@/validators/authSchema';

export const Login = () => {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useNoScroll(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data) => {
        const link = 'https://gamerize.ltd.ua/api/Login/login';

        const toDoInTimeout = () => {
            setLoading(false);
            Cookies.set('auth', 'true');
            dispatch(getWishListProductsIds());
            closePopUp();
        };

        const toDoInCatch = () => {
            setIsErrorVisible(true);
        };

        sendRequestWithLoading(
            data,
            link,
            setLoading,
            toDoInTimeout,
            toDoInCatch
        );
    };

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    };

    const closePopUp = () => {
        dispatch(assignIsDisplayedLoginPopUp(false));
    };

    return (
        <div className={styles.popUp_background} onClick={closePopupByClicking}>
            <div className={styles.popUp}>
                <div className={styles.popUp_header}>
                    <p className={styles.popUp_title}>Вхід</p>
                    <div
                        className={styles.popUp_cross}
                        onClick={closePopUp}
                    ></div>
                </div>
                <div className={styles.popUp_container}>
                    <form
                        className={styles.popUp_form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.popUp_formGroup}>
                            <label>Електронна пошта*</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + '#icon-email'}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input type="text" {...register('email')} />
                            </div>
                            <p className={styles.input_error}>
                                {errors.email?.message}
                            </p>
                        </div>
                        <div className={styles.popUp_formGroup}>
                            <label>Пароль*</label>
                            <div className={styles.popUp_inputContainer}>
                                <svg width="24" height="24">
                                    <use
                                        href={sprite + '#icon-lock'}
                                        fill="#EEF1FF"
                                        stroke="currentColor"
                                    ></use>
                                </svg>
                                <input
                                    type="password"
                                    {...register('password')}
                                />
                            </div>
                            <p className={styles.input_error}>
                                {errors.password?.message}
                            </p>
                        </div>
                        <button
                            type="submit"
                            className={loading ? 'loadingButton' : ''}
                        >
                            {loading ? 'Вхід в акаунт...' : 'Увійти'}
                        </button>
                        {isErrorVisible && (
                            <p className={styles.input_userError}>
                                Помилка входу. Перевірте правильність е-пошти та
                                пароля.
                            </p>
                        )}
                        <a
                            onClick={() =>
                                dispatch(assignIsDisplayedEmailForm(true))
                            }
                        >
                            Забули пароль?
                        </a>
                    </form>
                    <hr />
                    <p className={styles.popUp_question}>Досі немає акаунту?</p>
                    <button
                        onClick={() =>
                            dispatch(assignIsDisplayedRegistrationPopUp(true))
                        }
                    >
                        Зареєструватись
                    </button>
                </div>
            </div>
        </div>
    );
};
