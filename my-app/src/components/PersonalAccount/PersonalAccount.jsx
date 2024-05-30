import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from 'axios';
import styles from './PersonalAccount.module.css';
import useCheckAuth from "../hooks/useCheckAuth.js";
import {useNavigate} from "react-router-dom";

export const PersonalAccount = () => {
    const [avatar, setAvatar] = useState(null);
    const hiddenFileInput = useRef(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const nameRef = useRef(null);
    const buttonSubmitRef = useRef(null);
    const isAuthenticated = useCheckAuth();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().nullable(),
        phone: yup.string().nullable().matches(/^\+380\d{9}$/, {
            message: 'Номер телефону повинен починатись з +380 та мати 12 чисел у сумі',
            excludeEmptyString: true,
        }),
        email: yup.string().nullable()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, {
                message: '"Введіть коректну е-пошту"',
                excludeEmptyString: true,
            }),
        city: yup.string().nullable(),
        deliveryAddress: yup.string().nullable()
            .matches(/(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]/,{
                message:'Адреса повинна мати назву вулиці та номер будинку',
                excludeEmptyString: true,
            })
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if(isAuthenticated){
            getPersonalInformation();
        }else{
            navigate('/');
        }
    }, []);

    const getPersonalInformation = () => {
            Axios.get('https://gamerize.ltd.ua/api/Account/profile')
                .then((res) => {
                    reset(res.data)
                    setUploadedPhoto(res.data?.profilePicture)
                    if (nameRef.current && res.data) {
                        nameRef.current.textContent = res.data.name;
                    }
                })
                .catch((err) => console.log(err))

    }

    const onSubmit = (data) => {
        if(photoFile){
            sendPhoto();
        }
        if(!uploadedPhoto && data.profilePicture){
            data.profilePicture = null;
            deletePhotoOnServer();
        }
        Axios.patch("https://gamerize.ltd.ua/api/Account/update-profile", data)
            .then(() => showMessage())
            .catch((err) => console.log(err))
    }

    const sendPhoto = () => {
        const formData = new FormData();
        formData.append('file', photoFile);
        if(formData.has('file')){
            Axios.post('https://gamerize.ltd.ua/api/Account/profile/picture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(() => showMessage()).catch((err) => console.log(err))

        }
    }

    const changeAvatar = () => {
        hiddenFileInput.current.click();
    };

    const deletePhoto = () => {
        setUploadedPhoto(null);
        setAvatar(null);
        setPhotoFile(null);
    }

    const deletePhotoOnServer = () => {
        Axios.delete('https://gamerize.ltd.ua/api/Account/delete-photo')
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const showMessage = () => {
        if(buttonSubmitRef){
            buttonSubmitRef.current.classList.add(styles.account_buttonUpdatedInfo)
            setTimeout(() => {
                buttonSubmitRef.current.classList.remove(styles.account_buttonUpdatedInfo);
            }, 3000);
        }
    }

    const handleChange = (e) => {
        if (avatar) {
            URL.revokeObjectURL(avatar);
        }
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setPhotoFile(file);
            setAvatar(URL.createObjectURL(file));
        } else {
            setAvatar(null);
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
                        <div className={styles.account_imageName}>
                            <div className={styles.account_imageContainer}
                                 onClick={changeAvatar}
                                 style={avatar || uploadedPhoto
                                     ? { backgroundImage: `url(${avatar || uploadedPhoto})`
                                         , color: 'transparent'}
                                     : {backgroundImage : 'none'}}
                            >Оберіть фото</div>
                            <input type="file" accept="image/*" onChange={handleChange}
                                className={styles.account_inputFile}
                                ref={hiddenFileInput}
                            />
                            <span className={styles.account_deletePhoto} onClick={deletePhoto}>
                                Видалити фото
                            </span>
                            <p className={styles.account_name} ref={nameRef}></p>
                        </div>
                        <form className={styles.account_form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Ім’я та прізвище</p>
                                <input type='text'
                                       className={`${styles.account_input } ${errors.name?.message 
                                           ? styles.account_errorBorder: ''}`}
                                       placeholder="Ім'я та прізвище"
                                       {...register("name")}
                                />
                                <p className={styles.account_inputError}>{errors.name?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Телефон</p>
                                <input type='tel'
                                       className={`${styles.account_input } ${errors.phone?.message 
                                           ? styles.account_errorBorder: ''}`}
                                       placeholder="Телефон"
                                       {...register("phone")}
                                />
                                <p className={styles.account_inputError}>{errors.phone?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Е-пошта</p>
                                <input type='email'
                                       className={`${styles.account_input } ${errors.email?.message 
                                           ? styles.account_errorBorder: ''}`}
                                       placeholder="Е-пошта"
                                       readOnly
                                       {...register("email")}
                                />
                                <p className={styles.account_inputError}>{errors.email?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Місто</p>
                                <input type='text'
                                       className={`${styles.account_input } 
                                       ${errors.city?.message ? styles.account_errorBorder: ''}`}
                                       placeholder="Місто"
                                       {...register("city")}
                                />
                                <p className={styles.account_inputError}>{errors.city?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Адреса доставки</p>
                                <input type='text'
                                       className={`${styles.account_input } 
                                       ${errors.deliveryAddress?.message ? styles.account_errorBorder: ''}`}
                                       placeholder="Адреса доставки"
                                       {...register("deliveryAddress")}
                                />
                                <p className={styles.account_inputError}>{errors.deliveryAddress?.message}</p>
                            </div>
                            <button type='submit' className={styles.account_button} ref={buttonSubmitRef}>
                                Зберегти зміни
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}