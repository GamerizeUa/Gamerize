import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./DeliveryType.module.css";
import { useEffect } from "react";
import {useSelector} from "react-redux";

export const AddressForm = ({ setAddressData }) => {
  const {profile} = useSelector((state) => state.profile);

  useEffect(() => {
    reset({
      city: profile.city,
      address: profile.deliveryAddress,
    });
  }, [profile]);

  const schema = yup.object().shape({
    city: yup
      .string()
      .nullable()
      .matches(
        /^[A-Za-zА-Яа-я\s]+$/,
        "Введіть коректну назву населеного пункту"
      )
      .required("Введіть населений пункт"),
    address: yup
      .string()
      .nullable()
      .matches(/(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]/, {
        message: "Адреса повинна мати назву вулиці та номер будинку",
        excludeEmptyString: true,
      })
      .required("Введіть адресу доставки"),
  });

  const {register, formState: { errors }, reset, watch} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const city = watch("city");
  const address = watch("address");

  useEffect(() => {
    setAddressData({ city, address });
  }, [city, address, setAddressData]);

  return (
    <div>
      <p className={styles.addressText}>Введіть адресу</p>
      <div className={styles.addressForm}>
        <label htmlFor="city" className={styles.label}>
          Місто*
        </label>
        <input
          id="city"
          type="text"
          className={`${styles.addressInput} ${
            errors.city && styles.errorInput
          }`}
          placeholder="Місто"
          {...register("city")}
        />
        {errors?.city && (
          <p className={styles.errorMessage}>{errors?.city.message}</p>
        )}
        <label htmlFor="address" className={styles.label}>
          Адреса*
        </label>
        <input
          id="address"
          type="text"
          className={`${styles.addressInput} ${
            errors.address && styles.errorInput
          }`}
          placeholder="Адреса"
          {...register("address")}
        />
        {errors?.address && (
          <p className={styles.errorMessage}>{errors?.address.message}</p>
        )}
      </div>
    </div>
  );
};
