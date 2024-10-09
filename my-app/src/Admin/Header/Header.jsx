import styles from "./Header.module.css";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {setVocativeCase} from "./vocativeCase.js";
import {fetchProfileInfo} from "../../redux/profileSlice.js";
import {useDispatch, useSelector} from "react-redux";

export const Header = () => {
    const location = useLocation();
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        setUploadedPhoto(profile.profilePicture)
    }, [profile]);

    useEffect(() => {
        dispatch(fetchProfileInfo());
    }, []);

    const setPageTitle = () => {
        switch (location.pathname) {
            case(location.pathname.includes('/admin') && location.pathname):
                return `Привіт, ${setVocativeCase(profile.name.split(" ")[0])}!`
            case (location.pathname.includes('/admin/products') && location.pathname):
                return 'Продукти'
            case (location.pathname.includes('/admin/questions') && location.pathname):
                return 'Запитання'
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
                <p className={styles.header_name}>{profile.name}</p>
            </div>
        </header>
    )
}