import { useForm } from "react-hook-form";
import styles from "./ReviewForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StarIcon from "../../icons/StarIcon";
import { useState } from "react";

const ReviewForm = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const schema = yup.object().shape({
    review: yup
      .string()
      .min(3, "Відгук має містити мінімум 3 символи")
      .max(1500, "Відгук має містити максимум 1500 символів")
      .required("Введіть текст відгуку"),
    rating: yup.number().required("Вкажіть рейтинг"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.reviewFormSection + " container"}>
      <div className={styles.reviewFormBloc}>
        <p className={styles.reviewFormTitle}>Написати відгук</p>
        <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.reviewFormText}>Оцініть продукт</p>
          <div className={styles.rating}>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      {...register("rating")}
                      className={styles.ratingItem}
                      onClick={() => setRating(currentRating)}
                    />
                    <div
                      className={styles.starIcon}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    >
                      <StarIcon
                        color={"#6566AC"}
                        isEmpty={
                          currentRating <= (hover || rating) ? false : true
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
          <div>
            <p className={styles.reviewFormText}>Відгук</p>
            <div className={styles.textareaContainer}>
              <textarea
                placeholder="Текст відгуку"
                {...register("review")}
                aria-invalid={errors.review ? true : false}
                className={styles.textarea}
              />
              <div className={styles.symbolsAmount}>
                {`${watch("review") ? watch("review").length : 0}`}/1500
              </div>
            </div>
            <p className={styles.textareaError}>{errors.review?.message}</p>
          </div>
          <button className={styles.reviewFormBtn}>Відправити</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
