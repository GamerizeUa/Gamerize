import { useState, useEffect } from 'react';
import CopyIcon from '../icons/CopyIcon.jsx';
import styles from './Share.module.css';
import FacebookIcon from '../icons/SocialMedia/FacebookIcon.jsx';
import TelegramIcon from '../icons/SocialMedia/TelegramIcon.jsx';
import TwitterIcon from '../icons/SocialMedia/TwitterIcon.jsx';
import WhatsupIcon from '../icons/SocialMedia/WhatsupIcon.jsx';
import EmailIcon from '../icons/SocialMedia/EmailIcon.jsx';
import ViberIcon from '../icons/SocialMedia/ViberIcon.jsx';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    ViberShareButton,
} from 'react-share';

export const Share = ({ changeVisibility, isVisible }) => {
    const [isCopied, setIsCopied] = useState(false);
    const socialNetworks = [
        'Facebook',
        'Telegram',
        'Twitter',
        'Whatsapp',
        'E-mail',
        'Viber',
    ];
    const socialMediaIcons = [
        FacebookIcon,
        TelegramIcon,
        TwitterIcon,
        WhatsupIcon,
        EmailIcon,
        ViberIcon,
    ];
    const socialMediaButtons = [
        FacebookShareButton,
        TelegramShareButton,
        TwitterShareButton,
        WhatsappShareButton,
        EmailShareButton,
        ViberShareButton,
    ];

    const enableScrollMode = () => document.body.classList.remove('no-scroll');
    const disableScrollMode = () => document.body.classList.add('no-scroll');

    const location = window.location.href;

    useEffect(() => {
        if (isVisible) {
            disableScrollMode();
        } else {
            enableScrollMode();
        }

        return () => {
            enableScrollMode();
        };
    }, [isVisible]);

    return (
        <div className={styles['share__background']}>
            <article className={styles.share}>
                <header className={styles['share__header']}>
                    <h2 className={styles['share__title']}>Поділитися через</h2>
                    <span
                        className={styles['share__cross']}
                        onClick={changeVisibility}
                    ></span>
                </header>
                <section className={styles['share__container']}>
                    {socialNetworks.map((name, index) => {
                        const ShareButton = socialMediaButtons[index];
                        const ShareIcon = socialMediaIcons[index];
                        return (
                            <ShareButton
                                key={index}
                                url={location}
                                className={styles['share__social-media']}
                            >
                                <div className={styles['share__icon']}>
                                    <ShareIcon />
                                </div>
                                <p className={styles['share__name']}>{name}</p>
                            </ShareButton>
                        );
                    })}
                </section>
                <p className={styles['share__text']}>
                    Або скопіювати посилання
                </p>
                <footer
                    className={styles['share__field']}
                    data-copied={isCopied}
                >
                    <p className={styles['share__link']}>{location}</p>
                    <CopyIcon
                        setIsCopied={setIsCopied}
                        className={styles['share__copy-icon']}
                    />
                </footer>
            </article>
        </div>
    );
};
