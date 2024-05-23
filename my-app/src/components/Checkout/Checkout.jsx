import { OrderCart } from "./OrderCart/OrderCart";
import { OrderForm } from "./OrderForm/OrderForm";
import styles from "./Checkout.module.css";

export const Checkout = () => {
  return (
    <div className={styles.checkoutContainer + " container"}>
      <OrderForm />
      <OrderCart />
    </div>
  );
};
