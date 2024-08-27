import styles from "./SearchInput.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useRef, useState} from "react"
import {useNavigate} from "react-router-dom";
import {ProductsMatch} from "./ProductsMatch/ProductsMatch.jsx";
import axios from "axios";

export const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [isMatchesDisplayed, setMatchesDisplayed] = useState(false);
    const [products, setProducts] = useState([]);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (search){
            navigate('/catalog');
        }
        setMatchesDisplayed(false);
    }

    const printSearchTerm = (e) => {
        setSearch(e.target.value);
        if(e.target.value){
           axios.post("https://gamerize.ltd.ua/api/Product/SearchProduct?page=1&pageSize=12",
               {searchTerm: e.target.value})
               .then((res) => {
                   setProducts(res.data.products)
                   setMatchesDisplayed(true);
               })
        }else{
            setMatchesDisplayed(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    }

    const handleInputBlur = (e) => {
        if(!e.target.classList.contains(styles.headerSearchInput)){
            setMatchesDisplayed(false);
        }
        inputRef.current.value = '';
    }

  return (
    <div className={styles.inputWrapper}>
      <input className={styles.headerSearchInput}
             ref={inputRef}
             placeholder="Пошук"
             onChange={(e) => printSearchTerm(e)}
             onKeyDown={handleKeyPress}
             onBlur={handleInputBlur}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg>
          <use href={sprite + "#icon-search"} fill="#FFFFFF" stroke="#2B2B2B" />
        </svg>
      </div>
        {isMatchesDisplayed &&
                <ProductsMatch searchText={search} setMatchesDisplayed={setMatchesDisplayed} products={products}/>
        }
    </div>
  );
};
