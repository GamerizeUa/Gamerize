import { ProductExcerpt } from './Excerpt/ProductExcerpt';
import styles from './assets/styles/products.module.css';

export const ProductListing = ({ products, loading }) => {
    if (loading) return null;

    return (
        <table className={styles['products__table']}>
            <thead className={styles['products__properties']}>
                <tr>
                    <th>ID</th>
                    <th>Обкладинка</th>
                    <th>Назва</th>
                    <th>Ціна</th>
                    <th>Категорія</th>
                    <th colSpan={2}>Статус</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <ProductExcerpt product={product} key={product.id} />
                ))}
            </tbody>
        </table>
    );
};
