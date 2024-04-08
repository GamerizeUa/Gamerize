import { useState } from "react";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.css";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { DeliveryType } from "../DeliveryType/DeliveryType";
import { PaymentType } from "../PaymentType/PaymentType";

export const OrderForm = () => {
  const [userName, setUserName] = useState("");
  // const [userPhone, setUserPhone] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [paymentType, setPaymentType] = useState("");

  console.log(userName);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    // resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  const handleChange = (name) => {
    setUserName(name);
  };

  return (
    <div className={styles.orderContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
        <CustomerInfo onChange={handleChange} />
        <DeliveryType />
        <PaymentType />
        <div>
          <p className={styles.header}>Перегляньте та підтвердіть замовлення</p>
          <p className={styles.details}>
            Перегляньте дані свого замовлення та підтвердіть його, якщо все в
            порядку.
          </p>
          <div className={styles.textareaContainer}>
            <label htmlFor="comment" className={styles.textareaLabel}>
              Додати коментар до замовлення
            </label>
            <textarea
              id="comment"
              placeholder="Коментар"
              className={styles.textarea}
            />
          </div>
          <button className={styles.orderBtn} type="submit">
            Оформити замовлення
          </button>
        </div>
      </form>
    </div>
  );
};
