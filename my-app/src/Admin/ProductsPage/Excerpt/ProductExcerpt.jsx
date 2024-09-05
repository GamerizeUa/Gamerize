import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/productsCatalogSlice';
import { getImagePath } from '../../../utils/getImagePath';
import Edit from '../assets/icons/Edit.svg';
import Delete from '../assets/icons/delete.svg';
import styles from '../assets/styles/products.module.css';
import buttons from '../../../assets/styles/buttons.module.css';

export const ProductExcerpt = ({ product }) => {
    const dispatch = useDispatch();

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
                    <Link
                        to={`/admin/products/edit/${id}`}
                        className={buttons['btn--icon']}
                    >
                        <span className={styles['sr-only']}>Edit</span>
                        <img src={Edit} alt="" />
                    </Link>
                    <button
                        className={buttons['btn--icon']}
                        onClick={() =>
                            dispatch(deleteProduct({ productID: id }))
                        }
                    >
                        <span className={styles['sr-only']}>Delete</span>
                        <img src={Delete} alt="" />
                    </button>
                </div>
            </td>
        </tr>
    );
};
