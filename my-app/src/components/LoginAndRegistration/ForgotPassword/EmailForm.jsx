import sprite from "../../../assets/icons/sprite.svg"
import stylesCommon from "../LoginAndRegistration.module.css"
import styles from "./EmailForm.module.css";
import React, {useState} from "react";
import Lottie from "lottie-react";
import mailNotSentAnimation from "../../../assets/images/confirmEmail.json";
import axios from "axios";

export const EmailForm = ({setIsDisplayedEmailForm, setDisplayedLoginPopUp}) => {
    const [isConfirmMessage, setIsConfirmMessage] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    setDisplayedLoginPopUp(false);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i;

    const handleChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (emailRegex.test(newEmail) || newEmail === '') {
            setError('');
        } else {
            setError('Введіть коректну  е-пошту');
        }
    };

    const handleSubmit = () => {
        if(email && emailRegex.test(email)) {
            axios.post('https://gamerize.ltd.ua/api/Login/forgot-password', {"email": email})
            .then(() => setIsConfirmMessage(true))
            .catch(() => setError('Користувача не знайдено!'))
        }
    }

    const closePopupByClicking = (event) => {
        if (event.currentTarget === event.target) {
            closePopUp();
        }
    }

    const closePopUp = () => {
        setIsDisplayedEmailForm(false)
    }

    return (
        <div className={stylesCommon.popUp_background} onClick={closePopupByClicking} >
            <div className={styles.emailPopup}>
                <div className={`${stylesCommon.popUp_header} ${styles.header}`}>
                    <div className={stylesCommon.popUp_cross} onClick={closePopUp}></div>
                </div>
                <div className={styles.container}>
                    {isConfirmMessage ?
                        (<div className={stylesCommon.confirmEmail}>
                            <Lottie animationData={mailNotSentAnimation} className={stylesCommon.confirmEmail_gif}/>
                            <div className={stylesCommon.confirmEmail_info}>
                                <p className={stylesCommon.confirmEmail_title}>Перейдіть за посиланням у листі</p>
                                <p className={stylesCommon.confirmEmail_subtitle}>
                                    Перейдіть на email, щоб завершити скидання паролю.
                                </p>
                            </div>
                        </div>) :
                        (<>
                            <div className={styles.text}>
                                <p className={styles.title}>Забули пароль?</p>
                                <p className={styles.subtitle}>Введіть пошту для скидання паролю.</p>
                            </div>
                            <hr/>
                            <div className={stylesCommon.popUp_formGroup}>
                                <label>Електронна пошта*</label>
                                <div className={stylesCommon.popUp_inputContainer}>
                                    <svg width="24" height="24">
                                        <use
                                            href={sprite + "#icon-email"}
                                            fill="#EEF1FF"
                                            stroke="currentColor"
                                        ></use>
                                    </svg>
                                    <input type="text" value={email} onChange={handleChange}/>
                                </div>
                                {error && <p className={stylesCommon.input_error}>{error}</p>}
                            </div>
                            <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
                                Скинути пароль
                            </button>
                        </>)}
                < /div>
            </div>
        </div>
    )
}