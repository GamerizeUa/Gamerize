import { useState } from "react";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.css";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { DeliveryType } from "../DeliveryType/DeliveryType";
import { PaymentType } from "../PaymentType/PaymentType";

export const OrderForm = () => {
  // const [userName, setUserName] = useState("");
  // const [userPhone, setUserPhone] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [deliveryType, setDeliveryType] = useState("");
  // const [paymentType, setPaymentType] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

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

  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  //   reset();
  // };

  const onSubmit = (data) => {
    if (currentStep === 4) {
      const updatedFormData = { ...formData, ...data };
      setFormData(updatedFormData);
      console.log(updatedFormData);
      // відправити дані на бекенд
    } else {
      const updatedFormData = { ...formData, ...data };
      setFormData(updatedFormData);
      setCurrentStep(currentStep + 1);
    }
  };

  // const handleChange = (name) => {
  //   setUserName(name);
  // };

  const handleCustomerInfoChange = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
  };

  return (
    <div className={styles.orderContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
        {currentStep >= 1 && (
          <CustomerInfo
            onChange={handleCustomerInfoChange}
            onSubmit={onSubmit}
          />
        )}
        {currentStep >= 2 && <DeliveryType onSubmit={onSubmit} />}
        {currentStep >= 3 && <PaymentType onSubmit={onSubmit} />}
        {currentStep >= 4 && (
          <div>
            <p className={styles.header}>
              Перегляньте та підтвердіть замовлення
            </p>
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
        )}
      </form>
    </div>
  );
};
