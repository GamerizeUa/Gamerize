import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOrders} from "@/redux/ordersSlice.js";
import styles from "./OrdersTable.module.css";
import {formatDate} from "@/utils/formatDate.js";
import {StatusField} from "@/Admin/OrdersPage/OrdersTable/StatusField/StatusField.jsx";

export const OrdersTable = () => {
    const {orders} = useSelector((state) => state.orders);

    return (
        <table className={styles.table_orders}>
            <thead className={styles.column_names}>
            <tr>
                <th>ID</th>
                <th>Замовник</th>
                <th>Дата</th>
                <th>Оплата</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {orders?.map((order, index) => (
                <tr key={index} className={styles.row_order}>
                    <td>{order.id}</td>
                    <td>{order.unregisteredUser?.name}</td>
                    {}
                    <td>{formatDate(new Date(order.createdAt))}</td>
                    <td>Ааааааааааа</td>
                    <StatusField status={{id: 1, name: "Очікується"}}/>
                </tr>
            ))}
            </tbody>
        </table>
    )
}