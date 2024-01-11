import React, {useEffect} from 'react';
import CopyIcon from "../icons/CopyIcon.jsx";
import styles from './Share.module.css';
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton,
    EmailShareButton} from "react-share";

export const Share = ({changeVisibility, isVisible}) => {
    const socialMedias = ['Facebook', 'Telegram', 'Twitter', 'Whatsapp', 'E-mail'];
    const buttons = [FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton];

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isVisible]);

    return(
        <div className={styles.share_background}>
            <div className={styles.share}>
                <div className={styles.share_container}>
                    <div className={styles.share_header}>
                        <p className={styles.share_title}>Share with</p>
                        <div className={styles.share_cross} onClick={changeVisibility}></div>
                    </div>
                    <div className={styles.share_socialMediaContainer}>
                        {socialMedias.map((name, index) => {
                            const ShareButton = buttons[index];
                            return (
                                <ShareButton key={index} url={window.location.href}>
                                    <div className={styles.share_socialMedia} key={index}>
                                        <div className={styles.share_icon}></div>
                                        <div className={styles.share_name}>{name}</div>
                                    </div>
                                </ShareButton>
                            )
                        })}
                    </div>
                    <p className={styles.share_text}>Or share with link</p>
                    <div className={styles.share_linkContainer}>
                        <p className={styles.share_link}>{window.location.href}</p>
                        <CopyIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}