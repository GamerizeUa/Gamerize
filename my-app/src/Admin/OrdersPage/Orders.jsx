import {StatusesTabs} from "@/Admin/OrdersPage/StatusesTabs/StatusesTabs.jsx";
import {OrdersTable} from "@/Admin/OrdersPage/OrdersTable/OrdersTable.jsx";
import {Pagination} from "@/Admin/Pagination/Pagination.jsx";

export const Orders = () => {

    return(
        <div>
            <StatusesTabs />
            <OrdersTable />
            <Pagination />
        </div>
    )
}