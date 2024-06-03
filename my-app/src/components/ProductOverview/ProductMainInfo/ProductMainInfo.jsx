import { useState, useEffect } from 'react';
import styles from './ProductMainInfo.module.css';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { ActionsBar } from '../ActionsBar/ActionsBar.jsx';
import { ProductDeliveryAndPayment } from '../ProductDeliveryAndPayment/ProductDeliveryAndPayment.jsx';
import CartIcon from '../icons/CartIcon.jsx';

export const ProductMainInfo = ({ breadcrumbsDetails }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function handleResize() {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={styles['product-info']}>
            {windowWidth >= 1280 && <Breadcrumbs page={breadcrumbsDetails} />}
            <section className={styles['product-info__header']}>
                <div>
                    <h2 className={styles['product-info__title']}>
                        Кодові імена: гра слів
                    </h2>
                    <p className={styles['product-info__vendor-code']}>
                        Артикул: 1497490495
                    </p>
                </div>
                {windowWidth >= 1280 && <ActionsBar />}
            </section>

            <section className={styles['product-info__body']}>
                <div className={styles['product-info__pricing']}>
                    <p className={styles['product-info__discount-price']}>
                        2000₴
                    </p>
                    <p className={styles['product-info__price']}>2450₴</p>
                </div>
                <p className={styles['product-info__description']}>
                    Неймовірно популярна гра для вечірок, що розходиться
                    мільйонними тиражами. Гру створив знаменитий чеський
                    гейм-дизайнер Владя Хватил, автор таких хітів як «Крізь
                    Століття: Нова Історія Цивілізації», «Космічні
                    далекобійники», «Mage Knight», «Dungeon Lords» і «Dungeon
                    Petz». З моменту створення в 2015 році гра «Codenames» була
                    визнана грою року в Німеччині, Бельгії, Японії, Польщі та
                    Чехії і зайняла перші місця на конкурсах «The Dice Tower» і
                    «Golden Geek».
                </p>
                <div className={styles['product-info__button-group']}>
                    <button
                        className={
                            styles['product-info__btn'] +
                            ' ' +
                            styles['product-info__btn--secondary']
                        }
                    >
                        Купити в 1 клік
                    </button>
                    <button
                        className={
                            styles['product-info__btn'] +
                            ' ' +
                            styles['product-info__btn--primary']
                        }
                    >
                        <CartIcon />
                        Додати в кошик
                    </button>
                </div>
            </section>
            <ProductDeliveryAndPayment />
        </section>
    );
};
