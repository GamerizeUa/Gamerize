import {useSelector} from "react-redux";
import styles from "./OrdersTable.module.css";
import {formatDate} from "@/utils/formatDate.js";
import {StatusField} from "@/Admin/OrdersPage/OrdersTable/StatusField/StatusField.jsx";
import {useNavigate} from "react-router-dom";

export const OrdersTable = () => {
    const {orders} = useSelector((state) => state.orders);
    const navigate = useNavigate();

    const handleRowClick = (orderId) => {
        navigate(`/admin/orders/${orderId}`);
    }

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
                <tr key={index}
                    className={styles.row_order}
                    onClick={() => handleRowClick(order.id)}
                >
                    <td>{order.id}</td>
                    <td>{order.unregisteredUser?.name}</td>
                    {}
                    <td>{formatDate(new Date(order.createdAt))}</td>
                    <td>{order.paymentMethod.paymentMethodName}</td>
                    <StatusField status={order.status}/>
                </tr>
            ))}
            </tbody>
        </table>
    )
}