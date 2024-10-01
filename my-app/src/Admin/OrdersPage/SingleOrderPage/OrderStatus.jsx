import styles from "@/Admin/OrdersPage/SingleOrderPage/SingleOrderPage.module.css";
import ArrowIconGallery from "@/assets/icons/ArrowGalleryIcon.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {updateOrderStatus} from "@/redux/ordersSlice.js";

export const OrderStatus = ({status, getOrderDetails}) => {
    const {id} = useParams();
    const [isSortingVisible, setIsSortingVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [chosenOption, setChosenOption] = useState('');
    const {statusesOrder} = useSelector((state) => state.statusesOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        setChosenOption(status);
    }, [status])

    const handleClickStatuses = () => {
        setIsSortingVisible(!isSortingVisible);
    };

    const handleOptionClick = (status) => {
        setChosenOption(status.status);
        setIsSortingVisible(false);
        if(status.status !== chosenOption){
            dispatch(updateOrderStatus({orderId: id, newStatusId: status.id})).unwrap()
                .then(() => {
                    setIsMessageVisible(true);
                    getOrderDetails();
                    setTimeout(() => {
                        setIsMessageVisible(false);
                    }, 3000);
                });
        }
    };

    return(
        <div>
            <p className={styles.singleOrderPage_text}><b>Статус</b></p>
            <div
                className={styles.singleOrderPage_status}
                onClick={handleClickStatuses}
            >
                {chosenOption}
                <ArrowIconGallery
                    style={{
                        transform: isSortingVisible
                            ? 'rotate(90deg)'
                            : 'rotate(-90deg)',
                    }}
                />
            </div>
            {isSortingVisible && (
                <div className={styles.singleOrderPage_statusOptions}>
                    {statusesOrder
                        .filter((status) => status.id !== 0)
                        .map((status, index) => (
                        <p onClick={() => handleOptionClick(status)} key={index}>
                            {status.status}
                        </p>
                    ))}
                </div>
            )}
            {isMessageVisible &&
                <p className={styles.singleOrderPage_text} style={{color: '#6566AC'}}>
                    Статус замовлення змінено!
                </p>
            }
        </div>
    )
}