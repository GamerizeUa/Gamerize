import styles from "./StatusesTabs.module.css";
import {useState} from "react";
import {fetchOrders, fetchOrdersByStatus, setCurrentPage, setStatusId} from "@/redux/ordersSlice.js";
import {useDispatch, useSelector} from "react-redux";

export const StatusesTabs = () => {
    const [activeTab, setActiveTab] = useState('Всі замовлення');
    const {statusesOrder} = useSelector((state) => state.statusesOrder);
    const dispatch = useDispatch();

    const changeTab = (tab) => {
        dispatch(setStatusId(tab.id));
        dispatch(setCurrentPage(1));
        if(tab.id === 0){
            dispatch(fetchOrders())
        }else{
            dispatch(fetchOrdersByStatus(tab.id))
        }
        setActiveTab(tab.status)
    }

    return(
        <ul className={styles.statusesTabs}>
            {statusesOrder.map((tab, index) => (
                <li key={index} className={`${styles.statusesTabs_tab} ${
                    activeTab === tab.status ? styles.activeTab : ''
                }`}
                    onClick={() => changeTab(tab)}
                >
                    {tab.status}
                </li>
            ))}
        </ul>
    )
}