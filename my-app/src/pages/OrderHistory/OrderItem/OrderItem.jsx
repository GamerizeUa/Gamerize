import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { OrderProductPreview } from './OrderProductPreview';
import { OrderDetails } from '../OrderDetails.jsx';
import styles from './OrderItem.module.css';

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

const OrderItem = (props) => {
    const {
        status: { status },
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
                className={`${styles.orderItem} ${getStatusBasedStyles(
                    status
                )}`}
            >
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
