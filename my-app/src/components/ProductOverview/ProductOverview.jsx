import { useContext } from 'react';
import { ProductGallery } from './ProductGallery/ProductGallery.jsx';
import { ProductMainInfo } from './ProductMainInfo/ProductMainInfo.jsx';
import styles from './ProductOverview.module.css';
import { ProductContext } from '../product-page/Product.jsx';

export const ProductOverview = () => {
    const { id: productID, name: productName } = useContext(ProductContext);

    const breadcrumbsDetails = {
        name: ['Каталог', productName],
        link: ['/catalog', '/catalog/' + productID],
    };

    return (
        <section className={styles['product-overview']}>
            <ProductGallery breadcrumbsDetails={breadcrumbsDetails} />
            <ProductMainInfo breadcrumbsDetails={breadcrumbsDetails} />
        </section>
    );
};
