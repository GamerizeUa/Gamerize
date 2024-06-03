import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./CustomerInfo.module.css";

export const CustomerInfo = ({ onSubmit, currentStep, setCurrentStep }) => {
  const schema = yup.object().shape({
    customerName: yup
      .string()
      .matches(/^[A-Za-zА-Яа-я\s]+$/, "Введіть коректне ім'я")
      .required("Введіть ім'я"),
    customerPhone: yup
      .string()
      .matches(
        /^\+380\d{9}$/,
        "Введіть коректний номер телефону (+380XXXXXXXXX)"
      )
      .required("Введіть номер телефону"),
    customerEmail: yup
      .string()
      .email("Введіть коректну електронну пошту")
      .required("Введіть електронну пошту"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleContinue = (data) => {
    onSubmit(data);
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <p className={styles.header}>1. Дані клієнта</p>
      <div className={styles.orderElement}>
        <label htmlFor="customerName" className={styles.orderText}>
          Ваше ім’я та прізвище
        </label>
        <div className={styles.inputBox}>
          <svg className={styles.inputIcon}>
            <use href={sprite + "#icon-user"} fill="#FEFEFE" stroke="#AAC4FF" />
          </svg>
          <input
            type="text"
            placeholder="Ім’я"
            id="customerName"
            className={`${styles.orderInput} ${
              errors.customerName && styles.errorInput
            }`}
            {...register("customerName")}
          />
        </div>
        <div>
          {errors?.customerName && (
            <p className={styles.errorMessage}>
              {errors?.customerName.message}
            </p>
          )}
        </div>
      </div>
      <div className={styles.orderElement}>
        <label htmlFor="customerPhone" className={styles.orderText}>
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
            id="customerPhone"
            defaultValue="+380"
            className={`${styles.orderInput} ${
              errors.customerPhone && styles.errorInput
            }`}
            {...register("customerPhone")}
          />
        </div>
        <div>
          {errors?.customerPhone && (
            <p className={styles.errorMessage}>
              {errors?.customerPhone.message}
            </p>
          )}
        </div>
      </div>
      <div className={styles.orderElement}>
        <label htmlFor="customerEmail" className={styles.orderText}>
          Електронна пошта
        </label>
        <div className={styles.inputBox}>
          <svg className={styles.inputIcon}>
            <use href={sprite + "#icon-email"} />
          </svg>
          <input
            type="email"
            id="customerEmail"
            className={`${styles.orderInput} ${
              errors.customerEmail && styles.errorInput
            }`}
            {...register("customerEmail")}
          />
        </div>
        <div>
          {errors?.customerEmail && (
            <p className={styles.errorMessage}>
              {errors?.customerEmail.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        className={styles.orderBtn}
        disabled={!isValid || currentStep != 1}
        onClick={handleSubmit(handleContinue)}
      >
        Продовжити
      </button>
    </div>
  );
};
