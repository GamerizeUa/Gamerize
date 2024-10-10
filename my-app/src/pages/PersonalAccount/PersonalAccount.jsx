import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from './PersonalAccount.module.css';
import {NewPasswordForm} from "../../components/LoginAndRegistration/ForgotPassword/ NewPasswordForm.jsx";
import {UserPhoto} from "./UserPhoto.jsx";
import {DeleteAccountPopUp} from "@/pages/PersonalAccount/DeleteAccountPopUp/DeleteAccountPopUp.jsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserPhoto, fetchProfileInfo, setUserPhoto, updateProfileInfo} from "@/redux/profileSlice.js";
import {assignIsDisplayedDeleteAccountPopUp, assignIsDisplayedNewPasswordForm} from "@/redux/formsDisplaying.js";
import useScrollToTop from "@/hooks/useScrollToTop.js";
import {profileSchema} from "@/validators/profileSchema.js";

export const PersonalAccount = () => {
    const {isDisplayedNewPasswordForm,
        isDisplayedDeleteAccountPopUp} = useSelector(state => state.formsDisplaying);
    const {profile} = useSelector(state => state.profile);
    const [photoFile, setPhotoFile] = useState(null);
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const buttonSubmitRef = useRef(null);
    const dispatch = useDispatch();
    useScrollToTop();

    const {register, handleSubmit, formState: {errors}, clearErrors, reset} = useForm({
        resolver: yupResolver(profileSchema)
    });

    useEffect(() => {
        reset(profile);
        setUploadedPhoto(profile.profilePicture);
    }, [profile])

    useEffect(() => {
        dispatch(fetchProfileInfo())
    }, []);

    const onSubmit = (data) => {
        if (photoFile) {
            dispatch(setUserPhoto(photoFile)).then(() => showMessage())
        }
        if (!uploadedPhoto && data.profilePicture) {
            data.profilePicture = null;
            dispatch(deleteUserPhoto())
        }
        dispatch(updateProfileInfo(data)).then(() => showMessage());
    }

    const showMessage = () => {
        if (buttonSubmitRef) {
            buttonSubmitRef.current.classList.add(styles.account_buttonUpdatedInfo)
            setTimeout(() => {
                buttonSubmitRef.current.classList.remove(styles.account_buttonUpdatedInfo);
            }, 3000);
        }
    }

    const handlePhoneNumberChange = (e) => {
        if (e.target.value === '+380' || e.target.value === '+38') {
            e.target.value = '+380';
        }
    }

    const handlePhoneNumberFocus = (e) => {
        if (e.target.value.length < 4) {
            e.target.value = "+380"
        }
    }

    const handlePhoneNumberBlur = (e) => {
        if (e.target.value.length <= 4) {
            e.target.value = "";
            clearErrors('phoneNumber')
        }
    };

    return (
        <section className={styles.account}>
            <div className='container'>
                <div className={styles.account_container}>
                    <div className={styles.account_header}>
                        <p className={styles.account_pageTitle}>Особисті дані</p>
                    </div>
                    <div className={styles.account_formContainer}>
                        <UserPhoto setPhotoFile={setPhotoFile}
                                   uploadedPhoto={uploadedPhoto}
                                   setUploadedPhoto={setUploadedPhoto}
                        />
                        <form className={styles.account_form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Ім’я та прізвище</p>
                                <input type='text'
                                       className={`${styles.account_input} ${errors.name?.message
                                           ? styles.account_errorBorder : ''}`}
                                       placeholder="Ім'я та прізвище"
                                       {...register("name")}
                                />
                                <p className={styles.account_inputError}>{errors.name?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Телефон</p>
                                <input type='tel'
                                       className={`${styles.account_input} ${errors.phoneNumber?.message
                                           ? styles.account_errorBorder : ''}`}
                                       placeholder="Телефон"
                                       onFocus={handlePhoneNumberFocus}
                                       onChange={handlePhoneNumberChange}
                                       {...register("phoneNumber")}
                                       onBlur={handlePhoneNumberBlur}
                                />
                                <p className={styles.account_inputError}>{errors.phoneNumber?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Е-пошта</p>
                                <input type='email'
                                       className={`${styles.account_input} ${errors.email?.message
                                           ? styles.account_errorBorder : ''}`}
                                       placeholder="Е-пошта"
                                       readOnly
                                       {...register("email")}
                                />
                                <p className={styles.account_inputError}>{errors.email?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Місто</p>
                                <input type='text'
                                       className={`${styles.account_input} 
                                       ${errors.city?.message ? styles.account_errorBorder : ''}`}
                                       placeholder="Місто"
                                       {...register("city")}
                                />
                                <p className={styles.account_inputError}>{errors.city?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Адреса доставки</p>
                                <input type='text'
                                       className={`${styles.account_input} 
                                       ${errors.deliveryAddress?.message ? styles.account_errorBorder : ''}`}
                                       placeholder="Адреса доставки"
                                       {...register("deliveryAddress")}
                                />
                                <p className={styles.account_inputError}>{errors.deliveryAddress?.message}</p>
                            </div>
                            <button type='submit' className={styles.account_button} ref={buttonSubmitRef}>
                                Зберегти зміни
                            </button>
                            <a className={styles.account_changePasswordLink}
                               onClick={() => dispatch(assignIsDisplayedNewPasswordForm(true))}>
                                Змінити пароль
                            </a>
                            <a className={styles.account_changePasswordLink}
                               onClick={() => dispatch(assignIsDisplayedDeleteAccountPopUp(true))}>
                                Видалити акаунт
                            </a>
                        </form>
                    </div>
                </div>
            </div>
            {isDisplayedNewPasswordForm && <NewPasswordForm />}
            {isDisplayedDeleteAccountPopUp && <DeleteAccountPopUp />}
        </section>
    )
}