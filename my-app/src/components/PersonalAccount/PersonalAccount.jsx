import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Axios from 'axios';
import styles from './PersonalAccount.module.css';

export const PersonalAccount = () => {
    const [avatar, setAvatar] = useState(null);
    const hiddenFileInput = useRef(null);
    const [photoFile, setPhotoFile] = useState(null);

    const transformEmptyStringToNull = (value) => {
        return value.trim() === '' ? null : value;
    };

    const schema = yup.object().shape({
        name: yup.string(),
        phoneNumber: yup.string()
            .matches(/^\+380\d{9}$/, 'Номер телефону повинен починатись з +380 та мати 12 чисел у сумі')
            .nullable()
            .transform(transformEmptyStringToNull),
        email: yup.string()
            .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, "Введіть коректну е-пошту")
            .nullable()
            .transform(transformEmptyStringToNull),
        city: yup.string(),
        address: yup.string()
            .matches(/(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]/,
                'Адреса повинна мати назву вулиці та номер будинку')
            .nullable()
            .transform(transformEmptyStringToNull),
    });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        // TODO get request
        Axios.get('https://gamerize.ltd.ua/api/profile')
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
    }, [])

    const onSubmit = (data) => {
        // TODO post request
        //Axios.post('', data).then().catch()
        Axios.post('https://gamerize.ltd.ua/api/Account/upload-profile-picture', photoFile)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    const changeAvatar = () => {
        hiddenFileInput.current.click();
    };

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
                                 style={avatar
                                     ? { backgroundImage: `url(${avatar})` , color: 'transparent'}
                                     : {backgroundImage : 'none'}}
                            >Оберіть фото</div>
                            <input type="file" accept="image/*" onChange={handleChange}
                                className={styles.account_inputFile}
                                ref={hiddenFileInput}
                            />
                            <p className={styles.account_name}>Verna AAAAAa</p>
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
                                       className={`${styles.account_input } ${errors.phoneNumber?.message 
                                           ? styles.account_errorBorder: ''}`}
                                       placeholder="Телефон"
                                       {...register("phoneNumber")}
                                />
                                <p className={styles.account_inputError}>{errors.phoneNumber?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Е-пошта</p>
                                <input type='email'
                                       className={`${styles.account_input } ${errors.email?.message 
                                           ? styles.account_errorBorder: ''}`}
                                       placeholder="Е-пошта"
                                       {...register("email")}
                                />
                                <p className={styles.account_inputError}>{errors.email?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Місто</p>
                                <input type='text'
                                       className={`${styles.account_input } ${errors.city?.message ? styles.account_errorBorder: ''}`}
                                       placeholder="Місто"
                                       {...register("city")}
                                />
                                <p className={styles.account_inputError}>{errors.city?.message}</p>
                            </div>
                            <div className={styles.account_inputContainer}>
                                <p className={styles.account_title}>Адреса доставки</p>
                                <input type='text'
                                       className={`${styles.account_input } ${errors.address?.message ? styles.account_errorBorder: ''}`}
                                       placeholder="Адреса доставки"
                                       {...register("address")}
                                />
                                <p className={styles.account_inputError}>{errors.address?.message}</p>
                            </div>
                            <button type='submit' className={styles.account_button}>Зберегти зміни</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}