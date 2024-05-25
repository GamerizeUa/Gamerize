import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CustomerInfo } from "../CustomerInfo/CustomerInfo";
import { DeliveryType } from "../DeliveryType/DeliveryType";
import { PaymentType } from "../PaymentType/PaymentType";
import {
  selectCart,
  selectGiftCard,
  selectPromoCode,
} from "../../../redux/selectors";
import { clearCart } from "../../../redux/cartSlice";
import { clearDiscounts } from "../../../redux/discountSlice";
import { OrderModal } from "../OrderModal/OrderModal";
import styles from "./OrderForm.module.css";

export const OrderForm = () => {
  const dispatch = useDispatch();
  const { productList, total } = useSelector(selectCart);
  const promoCode = useSelector(selectPromoCode);
  const giftCard = useSelector(selectGiftCard);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const isSubmissionReady = () => {
    if (productList.length === 0) {
      alert(
        "Ваш кошик порожній. Будь ласка, додайте товари перед відправкою замовлення."
      );
      return false;
    }
    if (currentStep === 4) {
      setIsReadyToSubmit(true);
      return true;
    }
    return false;
  };

  const onSubmit = (data) => {
    const updatedFormData = {
      ...formData,
      ...data,
      productList,
      total,
      promoCode,
      giftCard,
      status: "Замовлення оформлено",
    };
    setFormData(updatedFormData);
    if (isReadyToSubmit) {
      //Відправка даних на бек
      console.log(updatedFormData);
      dispatch(clearCart());
      dispatch(clearDiscounts());
      reset();
      setCurrentStep("1");
      setIsReadyToSubmit(false);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  };

  return (
    <>
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
                Перегляньте дані свого замовлення та підтвердіть його, якщо все
                в порядку.
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
                  <p className={styles.errorMessage}>
                    {errors?.comment.message}
                  </p>
                )}
              </div>
              <button
                className={styles.orderBtn}
                type="submit"
                onClick={isSubmissionReady}
              >
                Оформити замовлення
              </button>
            </div>
          )}
        </form>
      </div>
      {isModalOpen && <OrderModal />}
    </>
  );
};
