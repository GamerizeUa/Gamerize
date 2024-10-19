import styles from './ProductDetails.module.css';
import Dropdown from './Dropdown.jsx';
import {useContext} from 'react';
import {ProductContext} from '../Product.jsx';
import {Entry} from './Entry.jsx';

const getProductCharacteristics = ({
                                       minPlayers,
                                       maxPlayers,
                                       minAge,
                                       minGameTimeMinutes,
                                       maxGameTimeMinutes,
                                       description,
                                       category,
                                       language: {name: languageName},
                                   }) => {
    const categoryName = category ? category.name : "Немає";
    const details = {
        characteristics: {
            playersQuantity: maxPlayers
                ? `${minPlayers}-${maxPlayers} гравців`
                : `від ${minPlayers} гравців`,
            age: `${minAge}+`,
            gameTime: minGameTimeMinutes === maxGameTimeMinutes
                ? `${minGameTimeMinutes} хв`
                : `${minGameTimeMinutes}-${maxGameTimeMinutes} хв`,
            language: languageName,
            category: categoryName,
        },
        description,
        returnPolicy:
            'Повернення товару можливе протягом 14 днів після покупки при збереженні упаковки та чека.',
    };

    return details;
};

const ProductDetails = () => {
    const product = useContext(ProductContext);
    const details = getProductCharacteristics(product);
    const characteristics = Object.entries(details.characteristics);

    return (
        <section className={styles.details + ' container'}>
            <Dropdown title="Xарактеристики">
                {characteristics.map(([key, value]) => (
                    <Entry title={key} body={value} key={key}/>
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
