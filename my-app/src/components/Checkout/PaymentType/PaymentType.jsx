import { useState } from 'react';
import visa from '@/assets/images/Visa.png';
import mastercard from '@/assets/images/Mastercard.png';
import sprite from '@/assets/icons/sprite.svg';
import styles from './PaymentType.module.css';
import { useDispatch } from 'react-redux';
import { setField } from '@/redux/newOrderSlice.js';

export const PaymentType = ({ currentStep, setCurrentStep }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleRadioClick = (paymentId, method) => {
        setPaymentMethod(paymentId);
        document.getElementById(method).checked = true;
        setIsValid(true);
    };

    const handleContinue = () => {
        if (paymentMethod) {
            setCurrentStep(currentStep + 1);
            dispatch(
                setField({ field: 'paymentMethodId', value: paymentMethod })
            );
        } else {
            setError('Оберіть спосіб оплати');
        }
    };

    return (
        <div>
            <div
                className={styles.selectElement}
                onClick={() => handleRadioClick(1, 'cod')}
            >
                <div>
                    <div className={styles.radioInputBox}>
                        <div className={styles.inputWrapper}>
                            <span className={styles.fakeInput} />
                            <input
                                type="radio"
                                id="cod"
                                value="cod"
                                name="payment"
                                onChange={() => setPaymentMethod(1)}
                                className={styles.selectorInput}
                            />
                        </div>
                        <label htmlFor="cod" className={styles.orderText}>
                            Накладений платіж
                        </label>
                    </div>
                    <p className={styles.details}>
                        Оплата кур’єру при отриманні. Можлива як готівкою, так і
                        безготівково
                    </p>
                </div>
                <svg width={24} height={24}>
                    <use href={sprite + '#icon-wallet_payment'} />
                </svg>
            </div>
            <div
                className={styles.selectElement}
                onClick={() => handleRadioClick(2, 'electronic')}
            >
                <div className={styles.radioInputBox}>
                    <div className={styles.inputWrapper}>
                        <span className={styles.fakeInput} />
                        <input
                            type="radio"
                            id="electronic"
                            value="electronic"
                            name="payment"
                            onChange={() => setPaymentMethod(2)}
                            className={styles.selectorInput}
                        />
                    </div>
                    <label htmlFor="electronic" className={styles.orderText}>
                        Електронна оплата
                    </label>
                </div>
                <div className={styles.paymentImg}>
                    <img src={mastercard} />
                    <img src={visa} />
                </div>
            </div>
            <p className={styles.submitError}>{error}</p>
            <button
                onClick={handleContinue}
                className={styles.orderBtn}
                disabled={!isValid || currentStep != 3}
            >
                Продовжити
            </button>
        </div>
    );
};
