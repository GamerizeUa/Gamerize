import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ShareIcon from '@/assets/icons/ShareIcon.jsx';
import HeartIcon from '@/assets/icons/HeartIcon.jsx';
import { Share } from '../Share/Share.jsx';
import styles from './ActionsBar.module.css';
import { ProductContext } from '../../product-page/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectWishListAddRemoveStatus,
    selectWishListProductsIdList,
} from '@/redux/selectors.js';
import { assignIsDisplayedLoginPopUp } from '@/redux/formsDisplaying.js';
import { addToWishList, removeOneFromWishList } from '@/redux/wishListSlice.js';
import useCheckAuth from '@/hooks/useCheckAuth.js';

export const ActionsBar = () => {
    const dispatch = useDispatch();
    const { checkAuthentication } = useCheckAuth();
    const isAuthenticated = checkAuthentication();
    const { id } = useContext(ProductContext);
    const wishListProductsIdList = useSelector(selectWishListProductsIdList);
    const wishListAddRemoveStatus = useSelector(selectWishListAddRemoveStatus);
    const isWished = wishListProductsIdList.includes(id);
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
        if (wishListAddRemoveStatus === 'loading') {
            return;
        }
        if (!isAuthenticated) {
            dispatch(assignIsDisplayedLoginPopUp(true));
            return;
        }
        isWished
            ? dispatch(removeOneFromWishList(id))
            : dispatch(addToWishList(id));
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
                data-filled={isWished}
                onClick={handleClickFavorite}
            >
                <HeartIcon isFilled={isWished} />
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
