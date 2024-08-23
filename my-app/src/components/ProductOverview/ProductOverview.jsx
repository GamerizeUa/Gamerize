import { useContext } from 'react';
import { ProductGallery } from './ProductGallery/ProductGallery.jsx';
import { ProductMainInfo } from './ProductMainInfo/ProductMainInfo.jsx';
import styles from './ProductOverview.module.css';
import { ProductContext } from '../product-page/Product.jsx';
import { MetaTags } from './MetaTags';

export const ProductOverview = () => {
    const product = useContext(ProductContext);

    const breadcrumbsDetails = {
        name: ['Каталог', product?.name],
        link: ['/catalog', '/catalog/' + product?.id],
    };

    return (
        <section className={styles['product-overview']}>
            {product && <MetaTags product={product} />}
            <ProductGallery breadcrumbsDetails={breadcrumbsDetails} />
            <ProductMainInfo breadcrumbsDetails={breadcrumbsDetails} />
        </section>
    );
};
