import styles from "./Header.module.css";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {setVocativeCase} from "./vocativeCase.js";
import axios from "axios";

export const Header = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState("");

    useEffect(() => {
        axios.get('https://gamerize.ltd.ua/api/Account/profile').then((res) => {
            setUploadedPhoto(res.data?.profilePicture)
            setName(res.data.name);
        })
    }, []);

    const setPageTitle = () => {
        switch (location.pathname) {
            case('/admin'):
                return `Привіт, ${setVocativeCase(name.split(" ")[0])}!`
            case '/admin/products':
                return 'Продукти'
            case '/admin/questions':
                return 'Запитання'
            case '/admin/edit':
                return 'Редагування'
            default:
                return 'Привіт'
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.header_leftPart}>
                <Link to="/">
                    <p className={styles.header_logo}>Gamerise</p>
                </Link>
                <p className={styles.header_pageTitle}>{setPageTitle()}</p>
            </div>
            <div className={styles.header_rightPart}>
                <div className={styles.header_photo}
                     style={uploadedPhoto ? {backgroundImage: `url(${uploadedPhoto})`} : {backgroundImage: 'none'}}
                ></div>
                <p className={styles.header_name}>{name}</p>
            </div>
        </header>
    )
}