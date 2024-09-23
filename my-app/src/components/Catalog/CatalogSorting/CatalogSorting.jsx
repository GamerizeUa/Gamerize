import styles from './CatalogSorting.module.css';
import ArrowIconGallery from '../../ProductOverview/icons/ArrowGalleryIcon.jsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DisplayThreeIcon } from '../icons/DisplayThreeIcon.jsx';
import { DisplayFourIcon } from '../icons/DisplayFourIcon.jsx';
import useWindowWidth from '@/hooks/useWindowWidth.js';
import { setSortOrder } from '@/redux/productsCatalogSlice.js';

export const CatalogSorting = ({ setChosenDisplaying }) => {
    const [isSortingVisible, setIsSortingVisible] = useState(false);
    const [chosenOption, setChosenOption] = useState('За ціною');
    const [isActive, setIsActive] = useState({
        displayingThree: true,
        displayingFour: false,
    });
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();
    const sorting = {
        'Ціна: Від вищої': 'price_desc',
        'Ціна: Від нижчої': 'price_asc',
        'Назва: Я - А': 'name_desc',
        'Назва: А - Я': 'name_asc',
    };

    useEffect(() => {
        setChosenDisplaying((prevConfig) => ({ ...prevConfig, ...isActive }));
    }, [isActive]);

    const handleClickSorting = () => {
        setIsSortingVisible(!isSortingVisible);
    };

    const handleOptionClick = (optionText) => {
        setChosenOption(optionText);
        dispatch(setSortOrder(sorting[optionText]));
        setIsSortingVisible(false);
    };

    return (
        <div className={styles.catalogSorting_options}>
            <div className={styles.catalogSorting_toSort}>
                {windowWidth >= 1280 && <span>Сортування:</span>}
                <div
                    className={styles.catalogSorting_sorting}
                    onClick={handleClickSorting}
                >
                    {chosenOption}
                    <ArrowIconGallery
                        style={{
                            transform: isSortingVisible
                                ? 'rotate(90deg)'
                                : 'rotate(-90deg)',
                        }}
                    />
                </div>
                {isSortingVisible && (
                    <div className={styles.catalogSorting_sortingOptions}>
                        <p onClick={() => handleOptionClick('Ціна: Від вищої')}>
                            Ціна: Від вищої
                        </p>
                        <p onClick={() => handleOptionClick('Назва: Я - А')}>
                            Назва: Я - А
                        </p>
                        <p
                            onClick={() =>
                                handleOptionClick('Ціна: Від нижчої')
                            }
                        >
                            Ціна: Від нижчої
                        </p>
                        <p onClick={() => handleOptionClick('Назва: А - Я')}>
                            Назва: А - Я
                        </p>
                    </div>
                )}
            </div>
            {windowWidth >= 1280 && (
                <div className={styles.catalogSorting_displaying}>
                    <span>Відображення:</span>
                    <div className={styles.catalogSorting_icons}>
                        <DisplayThreeIcon
                            isActive={isActive.displayingThree}
                            setIsActive={setIsActive}
                        />
                        <DisplayFourIcon
                            isActive={isActive.displayingFour}
                            setIsActive={setIsActive}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
