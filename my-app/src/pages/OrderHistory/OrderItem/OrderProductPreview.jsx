import styles from './OrderItem.module.css';
import { Link } from 'react-router-dom';
import { getImagePath } from '@/utils/getImagePath';

export const OrderProductPreview = ({ id, images, name, price }) => {
    return (
        <li className={styles.productListItem}>
            <img
                src={images ? getImagePath(images[0]?.path) : ''}
                className={styles.productListImg}
            />
            <div className={styles.productDescription}>
                <Link to={`/catalog/${id}`} className={styles.productName}>
                    {name}
                </Link>
                <p className={styles.productPrice}>Ціна: {price} ₴</p>
                <p className={styles.productArticle}>Артикул: {id}</p>
            </div>
        </li>
    );
};
