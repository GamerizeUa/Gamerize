import styles from "./StatusesTabs.module.css";
import {useState} from "react";
import {fetchOrdersByStatus} from "@/redux/ordersSlice.js";
import {useDispatch} from "react-redux";

export const StatusesTabs = () => {
    const [activeTab, setActiveTab] = useState('Всі замовлення');
    const dispatch = useDispatch();
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

    const changeTab = (tab) => {
        dispatch(fetchOrdersByStatus(tab.statusId));
        setActiveTab(tab.name)
    }

    return(
        <ul className={styles.statusesTabs}>
            {statusesTabs.map((tab, index) => (
                <li key={index} className={`${styles.statusesTabs_tab} ${
                    activeTab === tab.name ? styles.activeTab : ''
                }`}
                    onClick={() => changeTab(tab)}
                >
                    {tab.name}
                </li>
            ))}
        </ul>
    )
}