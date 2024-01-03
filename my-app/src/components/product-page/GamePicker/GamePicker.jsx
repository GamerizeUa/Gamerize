import GameFeaturePicker from "../GameFeaturePicker/GameFeaturePicker";
import styles from "./GamePicker.module.css"
import { useEffect, useState } from "react";

export default function GamePicker (){
    let [windowWidth, setWindowWidth] = useState(null) // !! in future it can become a global redux state to check screen width in any component when needed in js
    let [category, setCategory] = useState(null) 
    let [playersAmount, setPlayersAmount] = useState(null) 
    let [age, setAge] = useState(null)
    // for test
    const categories = ["Творчі ігри", "Стратегія", "Детектив", "Гумор", "Гемор", "Квест", "Пригоди"] 
    const playersAmounts = ["1", "2", "2-4", "2-5", "3-5", "6-10", "5+", "10+", "0-", "45.000.000"] 
    const ages = ["3+", "12+", "18+", "90+"] 
    // for test
    useEffect(() => {
        setWindowWidth(document.documentElement.clientWidth)
        window.addEventListener('resize', function (){
            setWindowWidth(document.documentElement.clientWidth) // !! in future it can be proceeded, for example, in Layout for global redux state
        })
    },[])


    return ( 
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.titleContainer}>
                            <div className={styles.title}><h1>Оберіть гру для себе!</h1></div>
                        </div>
                        <div className={styles.form}>
                            <GameFeaturePicker zIndex={3} featureKey={"categories"} featureTitle={"Категорія"} checkedFeature={category} setCheckedFeature={setCategory} featureItems={categories}/>
                            <GameFeaturePicker zIndex={2} featureKey={"playersAmounts"} featureTitle={"Кількість гравців"} checkedFeature={playersAmount} setCheckedFeature={setPlayersAmount} featureItems={playersAmounts}/>
                            <GameFeaturePicker zIndex={1} featureKey={"ages"} featureTitle={"Вік"} checkedFeature={age} setCheckedFeature={setAge} featureItems={ages}/>
                            <div className={styles.button}>
                                <div className={styles.buttonTitle}><p>Підібрати гру</p></div>
                            </div>
                        </div>
                    </div>
                    {
                        windowWidth < 744 || <div className={styles.right}>
                            <div className={styles.image}></div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}