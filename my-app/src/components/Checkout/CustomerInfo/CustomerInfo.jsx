import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import sprite from "../../../assets/icons/sprite.svg";
import styles from "./CustomerInfo.module.css";

export const CustomerInfo = ({ onChange, onSubmit }) => {
  const schema = yup.object().shape({
    name: yup.string().required("Введіть ім'я"),
    phone: yup.string().required("Введіть номер телефону"),
    email: yup.string().email().required("Введіть електронну пошту"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // const onSubmit = (data) => {
  //   console.log(JSON.stringify(data));
  //   setUserName(data.name);
  //   setUserPhone(data.phone);
  //   setUserEmail(data.email);
  // };

  const onSubmitStep = (data) => {
    onChange(data); // зворотній зв'язок для передачі даних
    onSubmit(data); // onSubmit з батьківської форми
  };

  const handleNameChange = (event) => {
    onChange(event.target.value);
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
            className={styles.orderInput}
            {...register("name")}
            onChange={handleNameChange}
          />
          <div>{errors?.name && <p>{errors?.userName.message}</p>}</div>
          {/* <div>{errors?.name && <p>Введіть ім'я</p>}</div> */}
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
              className={styles.orderInput}
              {...register("phone")}
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
            <input
              type="email"
              id="email"
              className={styles.orderInput}
              {...register("email")}
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.orderBtn}
          // disabled={!isValid}
          onClick={handleSubmit(onSubmitStep)}
        >
          Продовжити
        </button>
      </div>
    </div>
  );
};
