import {StatusesTabs} from "@/Admin/OrdersPage/StatusesTabs/StatusesTabs.jsx";
import {OrdersTable} from "@/Admin/OrdersPage/OrdersTable/OrdersTable.jsx";
import {Pagination} from "@/Admin/Pagination/Pagination.jsx";
import styles from './Orders.module.css'
import {fetchOrders, fetchOrdersByStatus, setCurrentPage} from "@/redux/ordersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {SearchAndFilterPanel} from "@/Admin/OrdersPage/SearchAndFilterPanel/SearchAndFilterPanel.jsx";

export const Orders = () => {
    const {orders, totalOrders, totalPages, currentPage, loading, statusId}
        = useSelector((state) => state.orders);
    const [isTermSearched, setIsTermSearched] = useState(false);
    const ordersOnPage = 10;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isTermSearched) {
            if (statusId === 0) {
                dispatch(fetchOrders())
            } else {
                dispatch(fetchOrdersByStatus(statusId))
            }
        }
    }, [currentPage, isTermSearched]);

    return (
        <>
            <div className={styles.orders}>
                <div className={styles.orders_container}>
                    <StatusesTabs/>
                    <SearchAndFilterPanel setIsTermSearched={setIsTermSearched}/>
                    {loading && orders.length === 0
                        ? <p className={styles.orders_text}>Завантаження замовлень... </p>
                        : <OrdersTable/>
                    }
                    {orders.length === 0 && !loading
                        &&
                        <p className={styles.orders_text}>Замовлень за запитом не знайдено!</p>
                    }
                </div>
            </div>
            <Pagination
                totalItems={totalOrders}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={(nextPage) =>
                    dispatch(setCurrentPage(nextPage))
                }
                itemsOnPage={ordersOnPage}
            />
        </>

    )
}