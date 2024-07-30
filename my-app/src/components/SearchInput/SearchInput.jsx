import styles from "./SearchInput.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useState} from "react"
import {useDispatch} from "react-redux";
import {setSearchTerm} from '../../redux/productsCatalogSlice.js'
import {useNavigate} from "react-router-dom";

export const SearchInput = () => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if(search){
            dispatch(setSearchTerm(search));
            navigate('/catalog');
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
             onChange={(e) => setSearch(e.target.value)}
             onKeyDown={handleKeyPress}
      />
      <div className={styles.searchIcon} onClick={handleSearchClick}>
        <svg>
          <use href={sprite + "#icon-search"} fill="#FFFFFF" stroke="#2B2B2B" />
        </svg>
      </div>
    </div>
  );
};
