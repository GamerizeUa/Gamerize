import { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { DeliveryType } from "../DeliveryType/DeliveryType";
import { PaymentType } from "../PaymentType/PaymentType";
import styles from "./OrderForm.module.css";
import {
  selectCart,
  selectGiftCard,
  selectPromoCode,
} from "../../../redux/selectors";

export const OrderForm = () => {
  const { productList, total } = useSelector(selectCart);
  const promoCode = useSelector(selectPromoCode);
  const giftCard = useSelector(selectGiftCard);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const schema = yup.object().shape({
    comment: yup
      .string()
      .max(200, "Коментар повинен бути не більше 200 символів"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const updatedFormData = {
      ...formData,
      ...data,
      productList,
      total,
      promoCode,
      giftCard,
    };
    setFormData(updatedFormData);
    if (isReadyToSubmit) {
      //Відправка даних на бек
      console.log(updatedFormData);
      reset();
      setCurrentStep("1");
      setIsReadyToSubmit(false);
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
        <p className={styles.header}>2. Спосіб доставки</p>
        {currentStep >= 2 && (
          <DeliveryType
            onSubmit={onSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        <p className={styles.header}>3. Оплата</p>
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
                {...register("comment")}
              />
            </div>
            <div>
              {errors?.comment && (
                <p className={styles.errorMessage}>{errors?.comment.message}</p>
              )}
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
