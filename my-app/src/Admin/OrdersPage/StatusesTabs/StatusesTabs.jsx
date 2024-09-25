import styles from "./StatusesTabs.module.css";
import {useState} from "react";

export const StatusesTabs = () => {
    const [activeTab, setActiveTab] = useState('Всі замовлення');
    const statusesTabs = [
        {
            name: 'Всі замовлення'
        },
        {
            statusId: 1,
            name: 'Очікується'
        },
        {
            statusId: 2,
            name: 'Відправлено'
        },
        {
            statusId: 3,
            name: 'Доставлено'
        }
    ]

    return(
        <ul className={styles.statusesTabs}>
            {statusesTabs.map((tab, index) => (
                <li key={index} className={`${styles.statusesTabs_tab} ${
                    activeTab === tab.name ? styles.activeTab : ''
                }`}
                    onClick={() => setActiveTab(tab.name)}
                >
                    {tab.name}
                </li>
            ))}
        </ul>
    )
}