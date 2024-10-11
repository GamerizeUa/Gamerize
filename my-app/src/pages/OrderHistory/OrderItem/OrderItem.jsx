import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { OrderProductPreview } from './OrderProductPreview';
import { OrderDetails } from '../OrderDetails.jsx';
import styles from './OrderItem.module.css';
import {formatDate} from "@/utils/formatDate.js";

const fetchProducts = async (identifiers) => {
    try {
        const res = await axios.post(
            'https://gamerize.ltd.ua/api/Product/GetProductsByIds',
            identifiers
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
};

const OrderItem = (props) => {
    const {
        status,
        closedAt,
        productId,
        totalPrice,
    } = props;
    const [products, setProducts] = useState([]);
    const dialogRef = useRef(null);

    const handleOpen = () => dialogRef.current.showModal();

    useEffect(() => {
        fetchProducts(productId).then((data) => {
            setProducts(data);
        });
    }, [productId]);

    if (!products || products.length === 0) return null;

    return (
        <>
            <li
                className={`${styles.orderItem} ${styles[`statusText${status.id}`]}`}
            >
                <p
                    className={`${styles.statusText} ${styles[`statusText${status.id}`]}`}
                >
                    {status.status + ' '}
                    {status.id === 4 && formatDate(new Date(closedAt))}
                </p>
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <OrderProductPreview {...product} key={product.id} />
                    ))}
                </ul>

                <p className={styles.orderSum}>
                    Сума замовлення: {totalPrice} ₴
                </p>

                <button className={styles.orderDetailsBtn} onClick={handleOpen}>
                    Деталі замовлення
                </button>
            </li>
            <OrderDetails order={props} products={products} ref={dialogRef} />
        </>
    );
};

export default OrderItem;
