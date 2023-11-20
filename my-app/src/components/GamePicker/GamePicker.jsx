import GameFeaturePicker from "../GameFeaturePicker/GameFeaturePicker";
import styles from "./GamePicker.module.css"

export default function GamePicker (){
    return ( 
        <section className={styles.wrap}>
            <div className={styles.container + " container"}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.title}><h2>Підберіть гру для себе</h2></div>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.form}>
                            <GameFeaturePicker featureTitle={"Категорія"}/>
                            <GameFeaturePicker featureTitle={"Кількість гравців"}/>
                            <GameFeaturePicker featureTitle={"Вік"}/>
                        </div>
                        <div><img src="" alt="game picker image"/></div>
                    </div>
                </div>
            </div>
        </section>
    );
}