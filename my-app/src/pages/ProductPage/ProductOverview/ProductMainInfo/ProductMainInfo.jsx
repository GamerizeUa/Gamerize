import { useState, useEffect, useContext } from 'react';
import styles from './ProductMainInfo.module.css';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { ActionsBar } from '../ActionsBar/ActionsBar.jsx';
import { ProductDeliveryAndPayment } from '../ProductDeliveryAndPayment/ProductDeliveryAndPayment.jsx';
import CartIcon from '@/assets/icons/CartIcon.jsx';
import { ProductContext } from '@/pages/ProductPage/Product.jsx';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice.js';
import { Link } from 'react-router-dom';
import { calculateTotalDiscount } from '@/utils/discounts';

export const ProductMainInfo = ({ breadcrumbsDetails }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const dispatch = useDispatch();
    const product = useContext(ProductContext);

    const handleAddToCart = () => {
        const newPrice = (calculateTotalDiscount(product.price, product.discounts));
        dispatch(addToCart({...product, price: newPrice}));
        setIsMessageVisible(true);
        setTimeout(() => {
            setIsMessageVisible(false);
        }, 3000);
    };
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

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
                        {product.name}
                    </h2>
                    <p className={styles['product-info__vendor-code']}>
                        Артикул: {product.id}
                    </p>
                </div>
                {windowWidth >= 1280 && <ActionsBar />}
            </section>

            <section className={styles['product-info__body']}>
                <div className={styles['product-info__pricing']}>
                    {product.discounts.length > 0 ? (
                        <>
                            <p
                                className={
                                    styles['product-info__discount-price']
                                }
                            >
                                {calculateTotalDiscount(
                                    product.price,
                                    product.discounts
                                )}
                                ₴
                            </p>
                            <p className={styles['product-info__price']}>
                                {product.price}₴
                            </p>
                        </>
                    ) : (
                        <p className={styles['product-info__discount-price']}>
                            {product.price}₴
                        </p>
                    )}
                </div>
                <p className={styles['product-info__description']}>
                    {product.description}
                </p>
                <div className={styles['product-info__button-group']}>
                    <Link
                        className={
                            styles['product-info__btn'] +
                            ' ' +
                            styles['product-info__btn--secondary']
                        }
                        to="/checkout"
                        state={{
                            productName: product.name,
                            productPrice: calculateTotalDiscount(
                                product.price,
                                product.discounts
                            ),
                            productScu: product.id,
                            productImage: product.images
                        }}
                    >
                        Купити в 1 клік
                    </Link>
                    <div className={styles['product-info__btn-buy']}>
                        <button
                            className={
                                styles['product-info__btn'] +
                                ' ' +
                                styles['product-info__btn--primary']
                            }
                            onClick={handleAddToCart}
                        >
                            <CartIcon/>
                            Додати в кошик
                        </button>
                        {isMessageVisible &&<p>Додано в кошик!</p>}
                    </div>
                </div>
            </section>
            <ProductDeliveryAndPayment/>
        </section>
    );
};
