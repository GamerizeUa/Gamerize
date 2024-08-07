import styles from "./SearchInput.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useState} from "react"
import {useDispatch} from "react-redux";
import {setSearchTerm} from '../../redux/productsCatalogSlice.js'
import {useNavigate} from "react-router-dom";
import {ProductsMatch} from "./ProductsMatch/ProductsMatch.jsx";

export const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [isMatchesDisplayed, setMatchesDisplayed] = useState(false);
    const dispatch = useDispatch();
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
            setMatchesDisplayed(true);
           dispatch(setSearchTerm(e.target.value))
        }else{
            setMatchesDisplayed(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    }

  return (
    <div className={styles.inputWrapper}>
      <input className={styles.headerSearchInput}
             placeholder="Пошук"
             onChange={(e) => printSearchTerm(e)}
             onKeyDown={handleKeyPress}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg>
          <use href={sprite + "#icon-search"} fill="#FFFFFF" stroke="#2B2B2B" />
        </svg>
      </div>
        {isMatchesDisplayed &&
                <ProductsMatch searchText={search} setMatchesDisplayed={setMatchesDisplayed} />
        }
    </div>
  );
};
