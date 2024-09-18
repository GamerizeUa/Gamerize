import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./CustomerInfo.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProfileInfo} from "../../../redux/profileSlice.js";
import {setUserInfo} from "../../../redux/orderSlice.js";

export const CustomerInfo = ({ currentStep, setCurrentStep }) => {
  const {profile} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileInfo());
  }, []);

  useEffect(() => {
    reset({
      customerName: profile.name,
      customerPhone: profile.phoneNumber,
      customerEmail: profile.email,
    });
  }, [profile]);

  const schema = yup.object().shape({
    customerName: yup
      .string()
      .matches(/^[a-zA-Zа-яіА-ЯІ'\-]+\s[a-zA-Zа-яіА-ЯІ'\-]+$/i, "Введіть ім'я та прізвище")
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

  const {register, handleSubmit, formState: { errors, isValid }, reset} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleContinue = (data) => {
    dispatch(setUserInfo({name: data.customerName, email: data.customerEmail, phoneNumber: data.customerPhone}));
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
