import React, {useState, useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import styles from './QuestioningForm.module.css';
import {Button} from "../Button/Button.jsx";
import feedbackImage from "../../../assets/images/feedback.svg"
import Axios from "axios";
import {PopUp} from "../QuestionFormPopUp/popUp.jsx";

export const QuestioningForm = () => {
    const [isFocusedName, setFocusedName] = useState(false);
    const [isFocusedEmail, setFocusedEmail] = useState(false);
    const [isFocusedDescription, setFocusedDescription] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const formRef = useRef();

    const schema = yup.object().shape({
        userName: yup.string().required("Введіть ім'я"),
        email: yup.string().required("Введіть е-пошту")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i, "Введіть коректну е-пошту"),
        text: yup.string().required("Введіть запитання")
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const handleFocus = (setFocusedInput, setUnfocusedInput1, setUnfocusedInput2) => {
        setFocusedInput(true);
        setUnfocusedInput1(false);
        setUnfocusedInput2(false);
    };

    const changeVisibility = () => {
        setIsVisible(!isVisible);
    }

    const onSubmit = (data) => {
        Axios.post('https://gamerize.ltd.ua/Questions', data)
            .then(changeVisibility)
            .catch((err) => console.log(err))

        reset();
        setFocusedName(false);
        setFocusedEmail(false);
        setFocusedDescription(false);
    }

    return (
        <section className={styles.feedback}>
            <div className={styles.feedback_outerContainer + " container"}>
                <div className={styles.feedback_container }>
                    <div className={styles.feedback_formBlock}>
                        <div className={styles.feedback_titleContainer}>
                            <p className={styles.feedback_title}>Виникли запитання?</p>
                        </div>
                        <form className={styles.feedback_form} ref={formRef}  onSubmit={handleSubmit(onSubmit)}>
                            <div className={`${styles.input_container} ${errors.userName?.message 
                                ? styles.input_errorBorder : ''} ${isFocusedName ? styles.focusedInput : ''} `}>
                                <FontAwesomeIcon icon={faUser} className={styles.input_icon}/>
                                <input
                                    type="text"
                                    placeholder="Ім'я"
                                    className={styles.input_field}
                                    onFocus={() => handleFocus(setFocusedName, setFocusedEmail, setFocusedDescription)}
                                    {...register("userName")} />
                                <p className={styles.input_error}>{errors.userName?.message}</p>
                            </div>
                            <div className={`${styles.input_container} ${errors.email?.message 
                                ? styles.input_errorBorder : ''} ${isFocusedEmail ? styles.focusedInput : ''}`}>
                                <FontAwesomeIcon icon={faEnvelope} className={styles.input_icon}/>
                                <input
                                    type="text"
                                    placeholder="Е-пошта"
                                    className={styles.input_field}
                                    onFocus={() => handleFocus(setFocusedEmail, setFocusedName, setFocusedDescription)}
                                    {...register("email")} />
                                <p className={styles.input_error}>{errors.email?.message}</p>
                            </div>
                            <div className={styles.input_textareaContainer}>
                        <textarea
                            placeholder="Напишіть чим ми можемо вам допомогти..."
                            className={`${styles.input_textarea} ${errors.text?.message
                                ? styles.input_errorBorder : ''}`}
                            onFocus={() => handleFocus(setFocusedDescription, setFocusedName, setFocusedEmail)}
                            {...register("text")} />
                                <p className={`${styles.input_error} ${styles.inputTextarea_input}`}>
                                    {errors.text?.message}
                                </p>
                            </div>
                            <Button buttonText="Надіслати запитання"/>
                        </form>
                    </div>
                    <div className={styles.feedback_imageContainer}>
                        <img src={feedbackImage} className={styles.feedback_image} alt="Feedback"/>
                    </div>
                </div>
            </div>
            {isVisible && <PopUp changeVisibility={changeVisibility} isVisible={isVisible}/>}
        </section>
    )
}