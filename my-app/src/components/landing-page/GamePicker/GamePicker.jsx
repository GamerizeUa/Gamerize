import GameFeaturePicker from "../GameFeaturePicker/GameFeaturePicker";
import styles from "./GamePicker.module.css";
import {useEffect, useState} from "react";
import image from "../../../assets/images/game_picker_game_photo.png";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories} from "../../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {getRandomProduct, setProductStatus} from "../../../redux/productsSlice.js";
import {PopUp} from "../QuestionFormPopUp/popUp.jsx";

export default function GamePicker() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(null); // !! in future it can become a global redux state to check screen width in any component when needed in js
    const [category, setCategory] = useState(null);
    const [playersAmount, setPlayersAmount] = useState(null);
    const [age, setAge] = useState(null);
    const [noMatchingProduct, setNoMatchingProduct] = useState(false);
    const gettingProductStatus = useSelector(({carouselProducts: {statusOfProduct}}) => statusOfProduct);
    const categories = useSelector(selectCategories);
    const playersAmounts = ["1 - 3", "4 - 6", "більше 6"];
    const ages = ["3 - 6", "6 - 9", "9 - 12", "12 - 18", "18+"];
    const isLoading = gettingProductStatus === "loading";

    useEffect(() => {
        setWindowWidth(document.documentElement.clientWidth);
        window.addEventListener("resize", function () {
            setWindowWidth(document.documentElement.clientWidth); // !! in future it can be proceeded, for example, in Layout for global redux state
        });
        dispatch(setProductStatus("undefined"));
    }, []);

    const getMinMaxObjFromStr = (str) => {
        let min, max;
        if (str.includes("-")) {
            [min, max] = str.replace(/\s/g, "").split("-").map(Number);
        } else {
            min = Number(str.match(/\d+/g));
            max = 0;
        }
        return {min, max};
    };

    const pickGame = async (e) => {
        e.preventDefault();
        const filters = {
            categories: category && [category.id],
            ages: age && [getMinMaxObjFromStr(age)],
            playersAmount: playersAmount && [getMinMaxObjFromStr(playersAmount)],
        };
        const {payload: {product}} = await dispatch(getRandomProduct(filters));
        if (product) {
            navigate(`catalog/${product.id}`, {
                state: {
                    gamePickerFilters: filters,
                },
            });
        } else {
            setNoMatchingProduct(true);
        }
    };

    const changePopupVisibility = () => {
        setNoMatchingProduct(!noMatchingProduct);
    };

    return (
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title}>Оберіть гру для себе!</h1>
                        </div>
                        <form className={styles.form}>
                            <GameFeaturePicker
                                zIndex={3}
                                featureKey={"categories"}
                                featureTitle={"Категорія"}
                                checkedFeature={category}
                                setCheckedFeature={setCategory}
                                featureItems={categories}
                            />
                            <GameFeaturePicker
                                zIndex={2}
                                featureKey={"playersAmounts"}
                                featureTitle={"Кількість гравців"}
                                checkedFeature={playersAmount}
                                setCheckedFeature={setPlayersAmount}
                                featureItems={playersAmounts}
                            />
                            <GameFeaturePicker
                                zIndex={1}
                                featureKey={"ages"}
                                featureTitle={"Вік"}
                                checkedFeature={age}
                                setCheckedFeature={setAge}
                                featureItems={ages}
                            />
                            <button disabled={isLoading} onClick={pickGame} className={styles.button}>
                                <span
                                    className={styles.button_text}>{isLoading ? "Підбираємо гру..." : "Підібрати гру"}</span>
                            </button>
                        </form>
                    </div>
                    {windowWidth < 744 || (
                        <div className={styles.right}>
                            <img
                                src={image}
                                alt={"game picker game"}
                                className={styles.image}
                            />
                        </div>
                    )}
                </div>
            </div>
            {
                noMatchingProduct &&
                <PopUp changeVisibility={changePopupVisibility} title={"Гру за запитом не знайдено :("}
                       info={"Спробуйте змінити фільтри і підібрати гру знову"}/>
            }
        </section>
    );
}
