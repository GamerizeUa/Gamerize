import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPromoCode, setPromoCode } from '@/redux/discountSlice.js';
import { selectPromoCode } from '@/redux/selectors.js';
import styles from './OrderCart.module.css';
import sprite from '@/assets/icons/sprite.svg';
import { useClickOutside } from '@/hooks/useClickOutside.js';

export const OrderCartInputs = () => {
    const dispatch = useDispatch();
    const promoCode = useSelector(selectPromoCode);
    const { error } = useSelector((state) => state.discount);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef();
    useClickOutside(inputRef, () => setIsEditing(false));
    const MAX_LENGTH = 20;

    const handleEditClick = (field, event) => {
        event.stopPropagation();
        setIsEditing(true);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setIsEditing(true);
        if (value.length <= MAX_LENGTH) {
            dispatch(setPromoCode(value));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsEditing(false);
            getDiscount();
        }
    };

    const getDiscount = () => {
        dispatch(sendPromoCode());
    };

    return (
        <div className={styles.discountContainer}>
            {isEditing || promoCode ? (
                <>
                    <div>
                        <input
                            name="promoCode"
                            placeholder="Введіть промокод"
                            value={promoCode}
                            ref={inputRef}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={styles.discountInput}
                            maxLength={MAX_LENGTH}
                        />
                        {isEditing && (
                            <span
                                className={styles.discountAdd}
                                onClick={() => {
                                    setIsEditing(false);
                                    getDiscount();
                                }}
                            >
                                Додати
                            </span>
                        )}
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                </>
            ) : (
                <div
                    onClick={(event) => handleEditClick('promoCode', event)}
                    className={styles.discountItem}
                >
                    <svg width={24} height={24}>
                        <use
                            href={sprite + '#icon-promo_code'}
                            stroke="#2B2B2B"
                            fill="#eef1ff"
                        />
                    </svg>
                    <p className={styles.discountText}>Ввести промокод</p>
                </div>
            )}
        </div>
    );
};
