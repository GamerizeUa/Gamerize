import { OrderCart } from "./OrderCart/OrderCart";
import { OrderForm } from "./OrderForm/OrderForm";

export const Checkout = () => {
  return (
    <div>
      <OrderForm />
      <OrderCart />
    </div>
  );
};
