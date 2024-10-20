import styles from './SearchInput.module.css';
import sprite from '@/assets/icons/sprite.svg';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsMatch } from './ProductsMatch/ProductsMatch.jsx';
import axios from 'axios';
import { useClickOutside } from '@/hooks/useClickOutside.js';

export const SearchInput = () => {
    const [search, setSearch] = useState('');
    const [isMatchesDisplayed, setMatchesDisplayed] = useState(false);
    const [products, setProducts] = useState([]);
    const inputRef = useRef(null);
    const inputContainerRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (search) {
            navigate('/catalog', { state: { searchTerm: search } });
        }
        setMatchesDisplayed(false);
    };

    const printSearchTerm = (e) => {
        setSearch(e.target.value);
        if (e.target.value) {
            axios
                .post(
                    'https://gamerize.ltd.ua/api/Product/SearchProduct?page=1&pageSize=12',
                    { searchTerm: e.target.value }
                )
                .then((res) => {
                    setProducts(res.data.products);
                    setMatchesDisplayed(true);
                });
        } else {
            setMatchesDisplayed(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const callbackOnClickOutside = () => {
        setMatchesDisplayed(false);
        inputRef.current.value = '';
    };

    useClickOutside(inputRef, callbackOnClickOutside);

    return (
        <div className={styles.inputWrapper} ref={inputContainerRef}>
            <input
                className={styles.headerSearchInput}
                ref={inputRef}
                placeholder="Пошук"
                onChange={(e) => printSearchTerm(e)}
                onKeyDown={handleKeyPress}
            />
            <div className={styles.searchIcon} onClick={handleSearchClick}>
                <svg>
                    <use
                        href={sprite + '#icon-search'}
                        fill="#FFFFFF"
                        stroke="#2B2B2B"
                    />
                </svg>
            </div>
            {isMatchesDisplayed && (
                <ProductsMatch
                    searchText={search}
                    setMatchesDisplayed={setMatchesDisplayed}
                    products={products}
                />
            )}
        </div>
    );
};
