import StarIcon from "../../icons/StarIcon";
import styles from "./RateStars.module.css";

export default function RateStars({
  filledStarsAmount = 5,
  color = "#84A9FC",
}) {
  return (
    <div className={styles.container}>
      {[...new Array(5)].map((_, index) =>
        index + 1 <= filledStarsAmount ? (
          <StarIcon key={index} color={color} />
        ) : (
          <StarIcon isEmpty={true} color={color} key={index} />
        )
      )}
    </div>
  );
}
