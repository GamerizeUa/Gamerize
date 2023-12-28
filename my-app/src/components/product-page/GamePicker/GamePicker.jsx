import GameFeaturePicker from "../GameFeaturePicker/GameFeaturePicker";
import styles from "./GamePicker.module.css"
import { useEffect, useState } from "react";

export default function GamePicker (){
    let [windowWidth, setWindowWidth] = useState(null) // !! in future it can become a global redux state to check screen width in any component when needed in js 

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
                            <GameFeaturePicker featureTitle={"Категорія"}/>
                            <GameFeaturePicker featureTitle={"Кількість гравців"}/>
                            <GameFeaturePicker featureTitle={"Вік"}/>
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