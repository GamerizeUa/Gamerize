import RateStars from "../RateStars/RateStars";
import styles from "./Review.module.css"

export default function Review({feedback:{customerName = "Anonim", text, createdDate = "2001-09-11", rate}}) {
    const dateElements = createdDate.split("-")
    const nameElements = customerName.split(" ")
    console.log(nameElements)
    console.log(nameElements[0])
    console.log(nameElements[0][0])
    console.log(nameElements[1])
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return (
        <div className={styles.container}>
        <div style={{backgroundColor: getRandomColor()}} className={styles.userAvatar}><p>{`${nameElements[0][0]}.${nameElements[1]? nameElements[1][0] : ""}`}</p></div>
            <div className={styles.body}>
                <div className={styles.nameDateContainer}>
                    <div className={styles.name}><p>{customerName}</p></div>
                    <div className={styles.date}><p>{`${dateElements[2].slice(0,2)}.${dateElements[1]}.${dateElements[0]}`}</p></div>
                </div>
                <div className={styles.starsContainer}><RateStars/></div>
                <div className={styles.text}><p>{text}</p></div>
            </div>
        </div>
    );
}