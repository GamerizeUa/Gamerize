import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerInfo } from '../CustomerInfo/CustomerInfo.jsx';
import { DeliveryType } from '../DeliveryType/DeliveryType.jsx';
import { PaymentType } from '../PaymentType/PaymentType.jsx';
import { selectCart} from '@/redux/selectors.js';
import { clearCart } from '@/redux/cartSlice.js';
import { clearDiscounts } from '@/redux/discountSlice.js';
import styles from './OrderForm.module.css';
import {createNewOrder, setField, setProductItem} from '@/redux/newOrderSlice.js';
import {useNavigate} from "react-router-dom";
import {assignIsDisplayedSuccessfulOrderPopUp} from "@/redux/formsDisplaying.js";

export const OrderForm = () => {
    const dispatch = useDispatch();
    const { productList, total } = useSelector(selectCart);
    const [currentStep, setCurrentStep] = useState(1);
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        productList.forEach((product) => {
            dispatch(
                setProductItem({
                    id: product.id,
                    count: product.count,
                })
            );
        });
        dispatch(setField({ field: 'totalPrice', value: total }));
    }, [productList]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(setField({ field: 'comment', value: commentText }));

        if (currentStep === 4) {
            try {
                await dispatch(createNewOrder()).unwrap();

                dispatch(clearCart());
                dispatch(clearDiscounts());
                dispatch(assignIsDisplayedSuccessfulOrderPopUp(true));
                navigate('/');
            } catch (error) {
                setErrorMessage('Виникла помилка під час створення замовлення');
            }

        }
    };

    return (
        <>
            <div className={styles.orderContainer}>
                <form onSubmit={onSubmit} className={styles.orderForm}>
                    {currentStep >= 1 && (
                        <CustomerInfo
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                    <p className={styles.header}>2. Спосіб доставки</p>
                    {currentStep >= 2 && (
                        <DeliveryType
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                    <p className={styles.header}>3. Оплата</p>
                    {currentStep >= 3 && (
                        <PaymentType
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                    {currentStep === 4 && (
                        <div>
                            <p className={styles.header}>
                                Перегляньте та підтвердіть замовлення
                            </p>
                            <p className={styles.details}>
                                Перегляньте дані свого замовлення та підтвердіть
                                його, якщо все в порядку.
                            </p>
                            <div className={styles.textareaContainer}>
                                <label
                                    htmlFor="comment"
                                    className={styles.textareaLabel}
                                >
                                    Додати коментар до замовлення
                                </label>
                                <textarea
                                    id="comment"
                                    placeholder="Коментар"
                                    className={styles.textarea}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    maxLength={200}
                                />
                            </div>
                            {productList.length === 0 && <p className={styles.submitError}>Ваш кошик порожній</p>}
                            {errorMessage && <p className={styles.submitError}>{errorMessage}</p>}
                            <button
                                className={styles.orderBtn}
                                type="submit"
                                disabled={productList.length === 0}
                            >
                                Оформити замовлення
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
};
