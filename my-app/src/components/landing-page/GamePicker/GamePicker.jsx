import GameFeaturePicker from "../GameFeaturePicker/GameFeaturePicker";
import styles from "./GamePicker.module.css";
import { useEffect, useState } from "react";
import image from "../../../assets/images/game_picker_game_photo.png";
import { Link } from "react-router-dom";

export default function GamePicker() {
    let [windowWidth, setWindowWidth] = useState(null); // !! in future it can become a global redux state to check screen width in any component when needed in js
    let [category, setCategory] = useState(null);
    let [playersAmount, setPlayersAmount] = useState(null);
    let [age, setAge] = useState(null);
    // for test
    const categories = [
        "Творчі ігри",
        "Стратегія",
        "Детектив",
        "Гумор",
        "Квест",
        "Пригоди",
    ];
    const playersAmounts = ["1", "2", "3", "4", "5", "6", "більше 6"];
    const ages = ["3-6", "6-9", "9-12", "12-18", "18+"];
    // for test
    useEffect(() => {
        setWindowWidth(document.documentElement.clientWidth);
        window.addEventListener("resize", function () {
            setWindowWidth(document.documentElement.clientWidth); // !! in future it can be proceeded, for example, in Layout for global redux state
        });
    }, []);

    return (
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.title_container}>
                            <h1 className={styles.title}>
                                Оберіть гру для себе!
                            </h1>
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
                            <Link
                                to={"./catalog/some"}
                                className={styles.button}
                            >
                                <span className={styles.button_text}>
                                    Підібрати гру
                                </span>
                            </Link>
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
        </section>
    );
}
