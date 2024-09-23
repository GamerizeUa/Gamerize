import { OrderCart } from "./OrderCart/OrderCart.jsx";
import { OrderForm } from "./OrderForm/OrderForm.jsx";
import styles from "./Checkout.module.css";

export const Checkout = () => {
  return (
    <div className={styles.checkoutContainer + " container"}>
      <OrderForm />
      <OrderCart />
    </div>
  );
};
