import { useState, useEffect, useCallback, forwardRef } from 'react';
import CopyIcon from '@/assets/icons/CopyIcon.jsx';
import styles from './Share.module.css';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    ViberShareButton,
    XIcon,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
    EmailIcon,
    ViberIcon,
} from 'react-share';

export const Share = forwardRef(function Share({ isOpen, onClose }, ref) {
    const [isCopied, setIsCopied] = useState(false);

    const socialNetworks = [
        'Facebook',
        'Telegram',
        'X',
        'Whatsapp',
        'E-mail',
        'Viber',
    ];
    const socialMediaIcons = [
        FacebookIcon,
        TelegramIcon,
        XIcon,
        WhatsappIcon,
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

    const location = window.location.href;

    const handleOutsideClick = useCallback(
        ({ target }) => {
            if (ref.current && target === ref.current) {
                onClose();
            }
        },
        [ref, onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.body.classList.remove('no-scroll');
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.body.classList.remove('no-scroll');
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [ref, isOpen, handleOutsideClick]);

    return (
        <dialog className={styles.share} ref={ref}>
            <header className={styles['share__header']}>
                <h2 className={styles['share__title']}>Поділитися через</h2>
                <span
                    className={styles['share__cross']}
                    onClick={onClose}
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
                            <ShareIcon
                                className={styles['share__icon']}
                                round
                            />
                            <p className={styles['share__name']}>{name}</p>
                        </ShareButton>
                    );
                })}
            </section>
            <p className={styles['share__text']}>Або скопіювати посилання</p>
            <footer className={styles['share__field']} data-copied={isCopied}>
                <p className={styles['share__link']}>{location}</p>
                <CopyIcon
                    setIsCopied={setIsCopied}
                    className={styles['share__copy-icon']}
                />
            </footer>
        </dialog>
    );
});
