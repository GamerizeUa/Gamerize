import { useState } from "react";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.css";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { DeliveryType } from "../DeliveryType/DeliveryType";
import { PaymentType } from "../PaymentType/PaymentType";

export const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [comment, setComment] = useState("");
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

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

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (data) => {
    const updatedFormData = { ...formData, ...data, comment };
    setFormData(updatedFormData);
    if (isReadyToSubmit) {
      //Відправка даних на бек
      console.log(updatedFormData);
    }
  };

  return (
    <div className={styles.orderContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
        {currentStep >= 1 && (
          <CustomerInfo
            onSubmit={onSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep >= 2 && (
          <DeliveryType
            onSubmit={onSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep >= 3 && (
          <PaymentType
            onSubmit={onSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && (
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
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <button
              className={styles.orderBtn}
              type="submit"
              onClick={() => setIsReadyToSubmit(true)}
            >
              Оформити замовлення
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
