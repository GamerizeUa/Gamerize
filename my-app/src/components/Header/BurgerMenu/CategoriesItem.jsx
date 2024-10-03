import styles from "@/components/Header/BurgerMenu/BurgerMenu.module.css";
import sprite from "@/assets/icons/sprite.svg";
import {Link} from "react-router-dom";
import {useState} from "react";
import {assignIsDisplayedBurgerMenu} from "@/redux/formsDisplaying.js";
import {useDispatch} from "react-redux";


export const CategoriesItem = ({categories, title, stateName}) => {
    const [isCategory, setIsCategory] = useState(false);
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(assignIsDisplayedBurgerMenu(false))
    }

    return(
        <>
            <li
                className={styles.burgerMenuListItem}
                onClick={() => setIsCategory(prevState => !prevState)}
            >
                <p>{title}</p>
                <svg width="24" height="24">
                    <use
                        href={
                            isCategory
                                ? sprite + `#icon-chevron-up`
                                : sprite + `#icon-chevron-right`
                        }
                        fill="white"
                        stroke="#AAC4FF"
                    ></use>
                </svg>
            </li>
            <li>
                {isCategory && (
                    <ul className={styles.categoryList}>
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className={styles.categoryListItem}
                            >
                                <Link
                                    to="/catalog"
                                    state={{
                                        [stateName]: [category.id],
                                    }}
                                    className={styles.categoryListLink}
                                    onClick={() => closeModal()}
                                >
                                    <p>{category.name}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    )
}