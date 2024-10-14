import styles from './OrderItem.module.css';
import { Link } from 'react-router-dom';
import { getImagePath } from '@/utils/getImagePath';
import {calculateTotalDiscount} from "@/utils/discounts.js";

export const OrderProductPreview = ({ id, photo, images, name, price, discounts }) => {
    return (
        <li className={styles.productListItem}>
            <img
                src={
                    photo
                        ? getImagePath(photo.path)
                        : images
                        ? getImagePath(images[0].path)
                        : ''
                }
                className={styles.productListImg}
            />
            <div className={styles.productDescription}>
                <Link to={`/catalog/${id}`} className={styles.productName}>
                    {name}
                </Link>
                <p className={styles.productPrice}>Ціна: {calculateTotalDiscount(price, discounts)} ₴</p>
                <p className={styles.productArticle}>Артикул: {id}</p>
            </div>
        </li>
    );
};
