import styles from './ProductDetails.module.css';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { ProductContext } from '../Product';
import { Entry } from './Entry';

const ProductDetails = () => {
    const { details } = useContext(ProductContext);

    const characteristics = Object.entries(details.characteristics);

    return (
        <section className={styles.details + ' container'}>
            <Dropdown title="Xарактеристики">
                {characteristics.map(([key, value]) => (
                    <Entry title={key} body={value} key={key} />
                ))}
            </Dropdown>
            <Dropdown title="Опис">
                <p className={styles['details__text']}>{details.description}</p>
            </Dropdown>
            <Dropdown title="Умови повернення">
                <p className={styles['details__text']}>
                    {details.returnPolicy}
                </p>
            </Dropdown>
        </section>
    );
};

export default ProductDetails;
