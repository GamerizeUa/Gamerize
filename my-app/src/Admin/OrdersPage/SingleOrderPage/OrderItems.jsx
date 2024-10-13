import axios from "axios";
import {useEffect, useState} from "react";
import styles from "@/Admin/OrdersPage/SingleOrderPage/SingleOrderPage.module.css";
import {calculateTotalDiscount} from "@/utils/discounts.js";

export const OrderItems = ({productsIds, quantity, discount, total}) => {
    const [productsItems, setProductsItems] = useState([]);

    useEffect(() => {
        fetchProductsDetails()
    }, [productsIds])

    const fetchProductsDetails = () => {
        if(productsIds){
            axios.post('https://gamerize.ltd.ua/api/Product/GetProductsByIds', productsIds)
                .then((res) => {
                    setProductsItems(res.data);
                })
        }
    }

    return(
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Назва</th>
                    <th>Кількість</th>
                    <th>Ціна</th>
                </tr>
                </thead>
                <tbody>
                {productsItems.map((product, index) => (
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{quantity[index]}x</td>
                        <td>{calculateTotalDiscount(product.price, product.discounts)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                {discount !== 0 && (
                    <>
                        <div className={styles.singleOrderPage_details}>
                            <p>Сума</p>
                            <p>{total} ₴</p>
                        </div>
                        <div className={styles.singleOrderPage_details}>
                            <p>Знижка</p>
                            <p>-{discount} ₴</p>
                        </div>
                    </>
                )}
                <div className={styles.singleOrderPage_details}>
                    <p><b>Підсумок</b></p>
                    <p><b>
                        {discount ? total - discount : total} ₴
                    </b></p>
                </div>
            </div>
        </>
    )
}