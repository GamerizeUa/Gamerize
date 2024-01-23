import React, {useEffect} from 'react';
import CopyIcon from "../icons/CopyIcon.jsx";
import styles from './Share.module.css';
import FacebookIcon from "../icons/SocialMedia/FacebookIcon.jsx";
import TelegramIcon from "../icons/SocialMedia/TelegramIcon.jsx";
import TwitterIcon from "../icons/SocialMedia/TwitterIcon.jsx";
import WhatsupIcon from "../icons/SocialMedia/WhatsupIcon.jsx";
import EmailIcon from "../icons/SocialMedia/EmailIcon.jsx";
import ViberIcon from "../icons/SocialMedia/ViberIcon.jsx";
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton,
    EmailShareButton, ViberShareButton} from "react-share";

export const Share = ({changeVisibility, isVisible}) => {
    const socialMedias = ['Facebook', 'Telegram', 'Twitter', 'Whatsapp', 'E-mail', 'Viber'];
    const socialMediaIcons = [FacebookIcon, TelegramIcon, TwitterIcon, WhatsupIcon, EmailIcon, ViberIcon]
    const buttons = [FacebookShareButton, TelegramShareButton, TwitterShareButton,
        WhatsappShareButton, EmailShareButton, ViberShareButton];

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
                        <p className={styles.share_title}>Поділитися через</p>
                        <div className={styles.share_cross} onClick={changeVisibility}></div>
                    </div>
                    <div className={styles.share_socialMediaContainer}>
                        {socialMedias.map((name, index) => {
                            const ShareButton = buttons[index];
                            const ShareIcon = socialMediaIcons[index];
                            return (
                                <ShareButton key={index} url={window.location.href}>
                                    <div className={styles.share_socialMedia} key={index}>
                                        <div className={styles.share_icon}>
                                            <ShareIcon />
                                        </div>
                                        <div className={styles.share_name}>{name}</div>
                                    </div>
                                </ShareButton>
                            )
                        })}
                    </div>
                    <p className={styles.share_text}>Або скопіювати посилання</p>
                    <div className={styles.share_linkContainer}>
                        <p className={styles.share_link}>{window.location.href}</p>
                        <CopyIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}