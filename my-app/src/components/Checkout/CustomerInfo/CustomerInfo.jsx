import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./CustomerInfo.module.css";

export const CustomerInfo = ({ onSubmit, currentStep, setCurrentStep }) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-zА-Яа-я\s]+$/, "Введіть коректне ім'я")
      .required("Введіть ім'я"),
    phone: yup
      .string()
      .matches(
        /^\+380\d{9}$/,
        "Введіть коректний номер телефону (+380XXXXXXXXX)"
      )
      .required("Введіть номер телефону"),
    email: yup
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
        <label htmlFor="name" className={styles.orderText}>
          Ваше ім’я та прізвище
        </label>
        <div className={styles.inputBox}>
          <svg className={styles.inputIcon}>
            <use href={sprite + "#icon-user"} fill="#FEFEFE" stroke="#AAC4FF" />
          </svg>
          <input
            type="text"
            placeholder="Ім’я"
            id="name"
            className={`${styles.orderInput} ${
              errors.name && styles.errorInput
            }`}
            {...register("name")}
          />
        </div>
        <div>
          {errors?.name && (
            <p className={styles.errorMessage}>{errors?.name.message}</p>
          )}
        </div>
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
            id="phone"
            defaultValue="+380"
            className={`${styles.orderInput} ${
              errors.phone && styles.errorInput
            }`}
            {...register("phone")}
          />
        </div>
        <div>
          {errors?.phone && (
            <p className={styles.errorMessage}>{errors?.phone.message}</p>
          )}
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
          <input
            type="email"
            id="email"
            className={`${styles.orderInput} ${
              errors.email && styles.errorInput
            }`}
            {...register("email")}
          />
        </div>
        <div>
          {errors?.email && (
            <p className={styles.errorMessage}>{errors?.email.message}</p>
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
