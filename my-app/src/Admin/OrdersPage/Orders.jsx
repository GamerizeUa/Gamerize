import {StatusesTabs} from "@/Admin/OrdersPage/StatusesTabs/StatusesTabs.jsx";
import {OrdersTable} from "@/Admin/OrdersPage/OrdersTable/OrdersTable.jsx";
import {Pagination} from "@/Admin/Pagination/Pagination.jsx";
import styles from './Orders.module.css'
import {fetchOrders, fetchOrdersByStatus, setCurrentPage} from "@/redux/ordersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {SearchAndFilterPanel} from "@/Admin/OrdersPage/SearchAndFilterPanel/SearchAndFilterPanel.jsx";

export const Orders = () => {
    const {totalOrders, totalPages, currentPage, loading, statusId} = useSelector((state) => state.orders);
    const ordersOnPage = 10;
    const dispatch = useDispatch();

    useEffect(() => {
        if(statusId === 0){
            dispatch(fetchOrders())
        }else{
            dispatch(fetchOrdersByStatus(statusId))
        }
    }, [currentPage]);

    return (
        <>
            <div className={styles.orders}>
                <div className={styles.orders_container}>
                    <StatusesTabs/>
                    <SearchAndFilterPanel />
                    <OrdersTable/>
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