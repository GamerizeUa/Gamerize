import { useCallback, useEffect, useRef, useState } from 'react';
import ShareIcon from '../icons/ShareIcon.jsx';
import HeartIcon from '../icons/HeartIcon.jsx';
import { Share } from '../Share/Share.jsx';
import styles from './ActionsBar.module.css';

export const ActionsBar = () => {
    const [isIconFilled, setIsIconFilled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const shareWindowRef = useRef();

    const openShareWindow = () => {
        if (!shareWindowRef) return;

        setIsOpen(true);
        shareWindowRef.current.showModal();
    };

    const closeShareWindow = useCallback(() => {
        if (!shareWindowRef) return;

        setIsOpen(false);
        shareWindowRef.current.close();
    }, [shareWindowRef]);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const handleClickFavorite = () => {
        setIsIconFilled((prev) => !prev);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles['action-list']}>
            <button
                className={styles['action-list__item']}
                data-filled={isIconFilled}
                onClick={handleClickFavorite}
            >
                <HeartIcon isFilled={isIconFilled} />
            </button>
            {windowWidth > 1280 && (
                <button
                    className={styles['action-list__item']}
                    onClick={openShareWindow}
                >
                    <ShareIcon />
                </button>
            )}
            <Share
                isOpen={isOpen}
                onClose={closeShareWindow}
                ref={shareWindowRef}
            />
        </div>
    );
};
