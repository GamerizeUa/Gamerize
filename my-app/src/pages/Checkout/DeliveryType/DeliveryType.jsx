import { useState } from 'react';
import styles from './DeliveryType.module.css';
import { AddressForm } from './AddressForm.jsx';
import { useDispatch } from 'react-redux';
import { setField, setUserInfo } from '@/redux/newOrderSlice.js';

export const DeliveryType = ({ currentStep, setCurrentStep }) => {
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const [addressData, setAddressData] = useState({ address: '', city: '' });
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleRadioClick = (deliveryId, method) => {
        setDeliveryMethod(deliveryId);
        document.getElementById(method).checked = true;
        setIsValid(true);
    };

    const handleContinue = () => {
        if (deliveryMethod) {
            if (
                deliveryMethod === 2 &&
                (!addressData.city || !addressData.address)
            ) {
                setError('Заповніть усі поля доставки');
                return;
            }
            dispatch(
                setField({ field: 'deliveryMethodId', value: deliveryMethod })
            );
            dispatch(
                setUserInfo({
                    deliveryAddress: addressData.address,
                    city: addressData.city,
                })
            );
            setCurrentStep(currentStep + 1);
            setError('');
        } else {
            setError('Оберіть метод доставки');
        }
    };

    return (
        <div>
            <div
                className={styles.pickupBlock}
                onClick={() => handleRadioClick(1, 'pickup')}
            >
                <div>
                    <div className={styles.radioInputBox}>
                        <div className={styles.inputHeader}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.fakeInput} />
                                <input
                                    type="radio"
                                    id="pickup"
                                    value="pickup"
                                    name="deliveryMethod"
                                    className={styles.selectorInput}
                                    onChange={() => setDeliveryMethod(1)}
                                />
                            </div>
                            <label
                                htmlFor="pickup"
                                className={styles.orderText}
                            >
                                Самовивіз
                            </label>
                        </div>
                        <p className={styles.orderText}>Безкоштовно</p>
                    </div>
                    <p className={styles.details}>
                        Ви можете самостійно забрати ваше замовлення за адресою
                        м. Київ, вул. Ярославська, 9. Самовивезення приймаємо з
                        11:00 – 22:00/Пн-Нд.
                    </p>
                </div>
            </div>
            <div className={styles.deliveryBlock}>
                <div
                    className={styles.selectElement}
                    onClick={() => handleRadioClick(2, 'delivery')}
                >
                    <div className={styles.radioInputBox}>
                        <div className={styles.inputHeader}>
                            <div className={styles.inputWrapper}>
                                <span className={styles.fakeInput} />
                                <input
                                    type="radio"
                                    id="delivery"
                                    value="delivery"
                                    name="deliveryMethod"
                                    className={styles.selectorInput}
                                    onChange={() => setDeliveryMethod(2)}
                                />
                            </div>
                            <label
                                htmlFor="delivery"
                                className={styles.orderText}
                            >
                                Доставка
                            </label>
                        </div>
                    </div>
                    <p className={styles.orderText}>Безкоштовно</p>
                </div>
                {deliveryMethod === 2 && (
                    <AddressForm setAddressData={setAddressData} />
                )}
            </div>
            <p className={styles.submitError}>{error}</p>
            <button
                className={styles.orderBtn}
                onClick={handleContinue}
                disabled={!isValid || currentStep !== 2}
            >
                Продовжити
            </button>
        </div>
    );
};
