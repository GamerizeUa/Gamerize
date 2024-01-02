import ArrowDownIcon from "../../icons/ArrowDownIcon";
import styles from "./GameFeaturePicker.module.css"

export default function GameFeaturePicker ({featureTitle}){
    return ( 
        <div className={styles.container}>
            <div className={styles.title}><p>{featureTitle}</p></div>
            <div className={styles.icon}><ArrowDownIcon/></div>
        </div>
    );
}