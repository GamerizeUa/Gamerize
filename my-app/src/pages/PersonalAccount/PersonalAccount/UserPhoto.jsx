import styles from "./PersonalAccount.module.css";
import React, {useRef, useState} from "react";

export const UserPhoto = ({setPhotoFile, uploadedPhoto, setUploadedPhoto, nameRef}) => {
    const [avatar, setAvatar] = useState(null);
    const hiddenFileInput = useRef(null);

    const changeAvatar = () => {
        hiddenFileInput.current.click();
    };

    const deletePhoto = () => {
        setUploadedPhoto(null);
        setAvatar(null);
        setPhotoFile(null);
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
        <div className={styles.account_imageName}>
            <div className={styles.account_imageContainer}
                 onClick={changeAvatar}
                 style={avatar || uploadedPhoto
                     ? {
                         backgroundImage: `url(${avatar || uploadedPhoto})`
                         , color: 'transparent'
                     }
                     : {backgroundImage: 'none'}}
            >Оберіть фото
            </div>
            <input type="file" accept="image/*" onChange={handleChange}
                   className={styles.account_inputFile}
                   ref={hiddenFileInput}
            />
            <span className={styles.account_deletePhoto} onClick={deletePhoto}>
                                Видалити фото
                            </span>
            <p className={styles.account_name} ref={nameRef}></p>
        </div>
    )
}