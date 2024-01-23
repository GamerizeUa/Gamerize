import React, {useEffect, useRef, useState} from 'react';
import styles from './ProductDeliveryAndPayment.module.css'
import {ProductDelivery} from "../ProductDelivery/ProductDelivery.jsx";
import {ProductPayment} from "../ProductPayment/ProductPayment.jsx";

export const ProductDeliveryAndPayment = () => {
    const [translation, setTranslation] = useState(0);
    const [itemClicked, setItemClicked] = useState({item1: true, item2: false});
    const [lineWidth, setLineWidth] = useState(null);
    const [prevElement, setPrevElement] = useState('item1');
    const [detailsWidth, setDetailsWidth] = useState(null)
    const navLineRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (navLineRef.current) {
                setLineWidth(navLineRef.current.offsetWidth);
            }
            if (detailsRef.current) {
                setDetailsWidth(parseFloat(getComputedStyle(detailsRef.current).height));
            }

        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, [prevElement]);

    const handleClickActive = (itemId) => {
        if (!itemClicked[itemId]) {
            setDetailsWidth(parseFloat(getComputedStyle(detailsRef.current).height));
            if (Number(itemId[itemId.length - 1]) > Number(prevElement[prevElement.length - 1])) {
                setTranslation((prevTranslation) => prevTranslation + lineWidth);
            } else {
                setTranslation((prevTranslation) => prevTranslation - lineWidth);
            }
            setItemClicked((prev) => {
                const updatedState = {};
                Object.keys(prev).forEach((key) => {
                    updatedState[key] = key === itemId;
                });
                return updatedState;
            });
            setPrevElement(itemId)
        }
    };

    return (
        <div className={styles.deliveryAndPayment}>
            <nav className={styles.deliveryAndPayment_navBar}>
                <ul>
                    <li onClick={() => handleClickActive('item1')}
                        className={itemClicked['item1'] ? styles.disabled : ''}>Доставка
                    </li>
                    <li onClick={() => handleClickActive('item2')}
                        className={itemClicked['item2'] ? styles.disabled : ''}>Оплата
                    </li>
                </ul>
                <div className={styles.deliveryAndPayment_navLine}>
                    <div ref={navLineRef} style={{transform: `translateX(${translation}px)`}}></div>
                </div>
            </nav>
            <div className={styles.deliveryAndPayment_detailsContainer} style={{height: `${detailsWidth}px`}}>
                <div className={styles.deliveryAndPayment_details} ref={detailsRef}>
                    {prevElement === 'item1' && <ProductDelivery/>}
                    {prevElement === 'item2' && <ProductPayment/>}
                </div>
            </div>
        </div>
    )
}