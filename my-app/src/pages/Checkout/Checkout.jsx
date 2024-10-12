import { OrderCart } from "./OrderCart/OrderCart.jsx";
import { OrderForm } from "./OrderForm/OrderForm.jsx";
import styles from "./Checkout.module.css";
import useScrollToTop from "@/hooks/useScrollToTop.js";
import {clearDiscounts} from "@/redux/discountSlice.js";
import {useDispatch} from "react-redux";
import {clearNewOrder} from "@/redux/newOrderSlice.js";

export const Checkout = () => {
    const dispatch = useDispatch();
    dispatch(clearDiscounts());
    dispatch(clearNewOrder())
   useScrollToTop();

  return (
    <div className={styles.checkoutContainer + " container"}>
      <OrderForm />
      <OrderCart />
    </div>
  );
};
