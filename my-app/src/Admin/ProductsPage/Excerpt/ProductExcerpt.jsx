import { Link } from 'react-router-dom';
import { getImagePath } from '../../../utils/getImagePath';
import Edit from './Edit.svg';
import Delete from './delete.svg';
import styles from '../products.module.css';
import buttons from '../buttons.module.css';

export const ProductExcerpt = ({ product }) => {
    if (!product) return null;

    const { id, name, price, images, category } = product;

    return (
        <tr>
            <td>{id}</td>
            <td>
                <img
                    src={getImagePath(images[0]?.path)}
                    alt=""
                    className={styles['products__image']}
                />
            </td>
            <td>{name}</td>
            <td>{price}</td>
            <td>{category?.name}</td>
            <td>
                <div className={styles['products__btn-group']}>
                    <Link className={buttons['btn--icon']}>
                        <span className={styles['sr-only']}>Edit</span>
                        <img src={Edit} alt="" />
                    </Link>
                    <Link className={buttons['btn--icon']}>
                        <span className={styles['sr-only']}>Delete</span>
                        <img src={Delete} alt="" />
                    </Link>
                </div>
            </td>
        </tr>
    );
};
