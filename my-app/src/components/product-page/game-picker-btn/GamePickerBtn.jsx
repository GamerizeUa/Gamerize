import styles from "./GamePickerBtn.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { useNavigate } from "react-router-dom";

export default function GamePickerBtn({ filters }) {
    const navigate = useNavigate();
    const onClick = (e) => {
        e.preventDefault();
        navigate("/catalog", { state: filters });
    };
    return (
        <div className={styles.container + " container"}>
            <button onClick={onClick} className={styles.btn}>
                <span>Переглянути всі товари</span>
                <svg>
                    <use href={sprite + "#icon-arrow-right"}></use>
                </svg>
            </button>
        </div>
    );
}
