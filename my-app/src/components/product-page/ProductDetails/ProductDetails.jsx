import styles from './ProductDetails.module.css';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { ProductContext } from '../Product';
import { Entry } from './Entry';

const getProductCharacteristics = ({
    minPlayers,
    maxPlayers,
    minAge,
    minGameTimeMinutes,
    maxGameTimeMinutes,
    description,
    category,
    language: { name: languageName },
}) => {
    const categoryName = category? category.name: "Немає";
    const details = {
        characteristics: {
            playersQuantity: `${minPlayers}-${maxPlayers}`,
            age: `${minAge}+`,
            gameTime: `${minGameTimeMinutes}-${maxGameTimeMinutes} хв`,
            language: languageName,
            category: categoryName,
            equipment: [
                'Ігрове поле',
                '240 жетонів',
                '108 жетонів валют',
                '72 видових карти',
                '50 карт джерел',
                '50 карт бункерів',
                '50 карт променевих веж',
                'Правила гри',
            ],
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
