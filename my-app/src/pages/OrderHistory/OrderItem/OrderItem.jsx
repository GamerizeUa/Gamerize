import styles from './OrderItem.module.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderProductPreview } from './OrderProductPreview';

const getStatus = (status, deliveryDate) => {
    let verboseStatus;

    switch (status) {
        case 'Отримані':
            verboseStatus = `Доставлено ${deliveryDate}`;
            break;
        case 'Відмінені':
            verboseStatus = 'Відмінено';
            break;
        default:
            verboseStatus = 'У процесі';
            break;
    }

    return verboseStatus;
};

const getStatusBasedStyles = (status) => {
    let cls;

    switch (status) {
        case 'Отримані':
            cls = styles['delivered'];
            break;
        case 'Відмінені':
            cls = styles['canceled'];
            break;
        default:
            cls = styles['in-process'];
            break;
    }
    return cls;
};

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

const OrderItem = ({ status: { status }, closedAt, productId, totalPrice }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(productId).then((data) => {
            setProducts(data);
        });
    }, [productId]);

    if (!products || products.length === 0) return null;

    return (
        <li className={`${styles.orderItem} ${getStatusBasedStyles(status)}`}>
            <p
                className={`${styles.statusText} ${getStatusBasedStyles(
                    status
                )}`}
            >
                {getStatus(status, closedAt)}
            </p>
            <ul className={styles.productList}>
                {products.map((product) => (
                    <OrderProductPreview {...product} key={product.id} />
                ))}
            </ul>

            <p className={styles.orderSum}>Сума замовлення: {totalPrice} ₴</p>

            <button className={styles.orderDetailsBtn}>
                Деталі замовлення
            </button>
        </li>
    );
};

export default OrderItem;
