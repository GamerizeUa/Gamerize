import styles from "@/Admin/OrdersPage/SingleOrderPage/SingleOrderPage.module.css";
import ArrowIconGallery from "@/assets/icons/ArrowGalleryIcon.jsx";
import {useEffect, useState} from "react";

export const OrderStatus = ({status}) => {
    const [isSortingVisible, setIsSortingVisible] = useState(false);
    const [chosenOption, setChosenOption] = useState('');
    const statuses = [
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

    useEffect(() => {
        setChosenOption(status);
    }, [status])

    const handleClickStatuses = () => {
        setIsSortingVisible(!isSortingVisible);
    };

    const handleOptionClick = (status) => {
        setChosenOption(status.name);
        setIsSortingVisible(false);
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
                    {statuses.map((status, index) => (
                        <p onClick={() => handleOptionClick(status)} key={index}>
                            {status.name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}