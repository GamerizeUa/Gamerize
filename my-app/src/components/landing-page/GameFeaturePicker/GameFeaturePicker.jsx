import { useState } from "react";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import ArrowUpIcon from "../../icons/ArrowUpIcon";
import styles from "./GameFeaturePicker.module.css"

export default function GameFeaturePicker ({zIndex,featureKey, featureTitle, featureItems, checkedFeature, setCheckedFeature}){
    const menuUniqueCSSClass = `${featureKey}Container`
    let [isMenuActive, setIsMenuActive] = useState(false)
    function toggleMenuOnClick (){
        setIsMenuActive(!isMenuActive)
    }
    function closeMenuOnclick (e){
        if (isMenuActive && !e.target.closest("." + menuUniqueCSSClass)){
            setIsMenuActive(false)
        }
    }
    function chooseItem (item){
        setCheckedFeature(item)
        setIsMenuActive(false)
    }
    window.addEventListener("click", closeMenuOnclick)
    return ( 
        <div className={styles.wrap}>
            <div style={{zIndex: zIndex}} className={styles.container + " " + menuUniqueCSSClass}>
                <div onClick={toggleMenuOnClick} className={styles.header}>
                    <div className={styles.title}><p>{featureTitle + (checkedFeature? (": " + checkedFeature) : "")}</p></div>
                    <div className={styles.icon}>{isMenuActive? <ArrowUpIcon/> :<ArrowDownIcon/>}</div>
                </div>
                {
                    isMenuActive && <div className={styles.itemsContainer}>
                        {
                            featureItems.map((item) =>
                                <div key={`${menuUniqueCSSClass}_${item}`} onClick={() => chooseItem(item)} className={styles.item}>
                                    <p>{item}</p>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
}