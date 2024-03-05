import { OrderCart } from "./OrderCart/OrderCart";
import { OrderForm } from "./OrderForm/OrderForm";
import { OrderModal } from "./OrderModal/OrderModal";
import styles from "./Checkout.module.css";

export const Checkout = () => {
  return (
    <div className={styles.checkoutContainer + " container"}>
      <OrderForm />
      <OrderCart />
      <OrderModal />
    </div>
  );
};
