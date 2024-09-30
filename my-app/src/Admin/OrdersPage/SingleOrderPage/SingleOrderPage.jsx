import axios from "axios";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styles from "./SingleOrderPage.module.css";
import {OrderItems} from "@/Admin/OrdersPage/SingleOrderPage/OrderItems.jsx";
import {CustomerDetails} from "@/Admin/OrdersPage/SingleOrderPage/CustomerDetails.jsx";
import {formatDate} from "@/utils/formatDate.js";
import {Breadcrumbs} from "@/components/ProductOverview/Breadcrumbs/Breadcrumbs.jsx";
import {OrderStatus} from "@/Admin/OrdersPage/SingleOrderPage/OrderStatus.jsx";

export const SingleOrderPage = () => {
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getOrderDetails();
    }, []);

    const getOrderDetails = () => {
        axios
            .get(`https://gamerize.ltd.ua/api/Order/GetByOrderId/${id}`)
            .then((res) => {
                setOrder(res.data);
                setUserInfo(res.data.unregisteredUser)
            })
    }

    const breadcrumbDetails = {
        name: ['Замовлення', `#${order.id}`],
        link: ['/admin', `/admin/orders/${id}`],
    };

    return (
        <>
            <Breadcrumbs page={breadcrumbDetails} isAdminPage={true}/>
            <p className={styles.singleOrderPage_mainTitle} >#{order?.id}</p>
            <div className={styles.singleOrderPage}>
                <div className={styles.singleOrderPage_leftPart}>
                    <div className={styles.singleOrderPage_detailsGroup}>
                        <p className={styles.singleOrderPage_title}>Інформація про замовлення </p>
                        <div className={styles.singleOrderPage_details}>
                            <p>Дата замовлення</p>
                            <p>{formatDate(new Date(order?.createdAt))}</p>
                        </div>
                        <div className={styles.singleOrderPage_details}>
                            <p>Статус замовлення</p>
                            <p>{order.status?.status}</p>
                        </div>
                        <OrderStatus status={order.status?.status} getOrderDetails={getOrderDetails}/>
                    </div>
                    <div className={styles.singleOrderPage_detailsGroup}>
                        <p className={styles.singleOrderPage_title}>Інформація про адресу доставки </p>
                        <p className={styles.singleOrderPage_text}>{order.deliveryMethod?.deliveryMethodName}</p>
                        {order.deliveryMethod?.id === 2 && (
                            <>
                                <p className={styles.singleOrderPage_text}>Місто: {userInfo?.city}</p>
                                <p className={styles.singleOrderPage_text}>Адреса: {userInfo?.deliveryAddress}</p>
                            </>
                        )}
                    </div>
                    <div className={styles.singleOrderPage_detailsGroup}>
                        <p className={styles.singleOrderPage_title}>Інформація про оплату</p>
                        <span className={`${styles[`status${order.paymentMethod?.id}`]}`}>
                            {order.paymentMethod?.paymentMethodName}
                        </span>
                        {order.paymentMethod?.id === 1 && (
                            <>
                                <p className={styles.singleOrderPage_text}>Електронний платіж за реквізитами</p>
                                <p className={styles.singleOrderPage_text}>UA232322432432424242442434353</p>
                            </>
                        )}
                    </div>
                    <div className={styles.singleOrderPage_detailsGroup}>
                        <p className={styles.singleOrderPage_title}>Замовлені товари</p>
                        <OrderItems
                            productsIds={order.productId}
                            quantity={order.quantity}
                            discount={order.totalDiscount}
                            total={order.totalPrice}
                        />
                    </div>
                </div>
                <CustomerDetails userInfo={userInfo} comment={order.comment}/>
            </div>
        </>
    )
}