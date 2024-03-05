import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import sprite from "../../../assets/icons/sprite.svg";
import visa from "../../../assets/images/Visa.png";
import mastercard from "../../../assets/images/Mastercard.png";
import styles from "./OrderForm.module.css";

export const OrderForm = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const schema = yup.object().shape({
    userName: yup.string().required("Введіть ім'я"),
    userPhone: yup.string().required("Введіть номер телефону"),
    userEmail: yup.string().email().required("Введіть електронну пошту"),
  });

  // const {
  //   handleSubmit,
  //   watch,
  //   control,
  //   formState: { errors, isDirty, isValid },
  // } = useForm
  // {
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  //   defaultValues: defaultValues
  // };

  // const currentValues = watch();

  return (
    <div className={styles.orderContainer}>
      <form>
        <div className={styles.headerWrapper}>
          <p className={styles.header}>1. Дані клієнта</p>
          <p className={styles.orderText}>Змінити</p>
        </div>
        <div className={styles.orderElement}>
          <label htmlFor="name" className={styles.orderText}>
            Ваше ім’я та прізвище
          </label>
          <div className={styles.inputBox}>
            <svg className={styles.inputIcon}>
              <use
                href={sprite + "#icon-user"}
                fill="#FEFEFE"
                stroke="#AAC4FF"
              />
            </svg>
            <input
              type="text"
              placeholder="Ім’я"
              id="name"
              className={styles.orderInput}
            />
          </div>
          <div className={styles.orderElement}>
            <label htmlFor="tel" className={styles.orderText}>
              Контактний номер телефону
            </label>
            <div className={styles.inputBox}>
              <svg className={styles.inputIcon}>
                <use
                  href={sprite + "#icon-phone"}
                  stroke="#AAC4FF"
                  fill="#FEFEFE"
                />
              </svg>
              <input
                type="tel"
                placeholder="+380"
                id="tel"
                className={styles.orderInput}
              />
            </div>
          </div>
          <div className={styles.orderElement}>
            <label htmlFor="email" className={styles.orderText}>
              Електронна пошта
            </label>
            <div className={styles.inputBox}>
              <svg className={styles.inputIcon}>
                <use href={sprite + "#icon-email"} />
              </svg>
              <input type="email" id="email" className={styles.orderInput} />
            </div>
          </div>
          <button className={styles.orderBtn}>Продовжити</button>
        </div>
        <div className={styles.headerWrapper}>
          <p className={styles.header}>2. Спосіб доставки</p>
        </div>
        <div className={styles.selectElement}>
          <div>
            <div className={styles.radioInputBox}>
              <div className={styles.inputWrapper}>
                <span className={styles.fakeInput} />
                <input
                  type="radio"
                  id="pickup"
                  value="pickup"
                  name="deliveryMethod"
                  className={styles.selectorInput}
                />
              </div>
              <label htmlFor="pickup" className={styles.orderText}>
                Самовивіз
              </label>
            </div>
            <p className={styles.details}>
              Ви можете самостійно забрати ваше замовлення за адресою м. Київ,
              вул. Ярославська, 9. Самовивезення приймаємо з 11:00 –
              22:00/Пн-Нд.
            </p>
          </div>
          <p className={styles.orderText}>Безкоштовно</p>
        </div>
        <div className={styles.selectElement}>
          <div className={styles.radioInputBox}>
            <div className={styles.inputWrapper}>
              <span className={styles.fakeInput} />
              <input
                type="radio"
                id="delivery"
                value="delivery"
                name="deliveryMethod"
                className={styles.selectorInput}
              />
            </div>
            <label htmlFor="delivery" className={styles.orderText}>
              Доставка
            </label>
          </div>
          <p className={styles.orderText}>Безкоштовно</p>
        </div>
        <button className={styles.orderBtn}>Продовжити</button>
        <div className={styles.headerWrapper}>
          <p className={styles.header}>3. Оплата</p>
        </div>
        <div className={styles.selectElement}>
          <div>
            <div className={styles.radioInputBox}>
              <div className={styles.inputWrapper}>
                <span className={styles.fakeInput} />
                <input
                  type="radio"
                  id="cod"
                  value="cod"
                  name="payment"
                  className={styles.selectorInput}
                />
              </div>
              <label htmlFor="cod" className={styles.orderText}>
                Накладений платіж
              </label>
            </div>
            <p className={styles.details}>
              Оплата кур’єру при отриманні. Можлива як готівкою, так і
              безготівково
            </p>
          </div>
          <svg width={24} height={24}>
            <use href={sprite + "#icon-wallet_payment"} />
          </svg>
        </div>
        <div className={styles.selectElement}>
          <div className={styles.radioInputBox}>
            <div className={styles.inputWrapper}>
              <span className={styles.fakeInput} />
              <input
                type="radio"
                id="electronic"
                value="electronic"
                name="payment"
                className={styles.selectorInput}
              />
            </div>
            <label htmlFor="electronic" className={styles.orderText}>
              Електронна оплата
            </label>
          </div>
          <div className={styles.paymentImg}>
            <img src={mastercard} />
            <img src={visa} />
          </div>
        </div>
        <button className={styles.orderBtn}>Продовжити</button>
        <div className={styles.headerWrapper}>
          <p className={styles.header}>Перегляньте та підтвердіть замовлення</p>
        </div>
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
        <button className={styles.orderBtn}>Оформити замовлення</button>
      </form>
    </div>
  );
};
