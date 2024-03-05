import css from "./Dropdown.module.css";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import { useState } from "react";

const Dropdown = ({ children, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={css.details}>
      <div>
        <div className={css.item}>
          <p className={css.dataTitle} onClick={toggleVisibility}>
            {title}
          </p>
          <button
            type="button"
            className={css.button}
            onClick={toggleVisibility}
            style={{
              transform: isVisible ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <ArrowDownIcon />
          </button>
        </div>
        <div
          className={`${css.children} ${
            isVisible ? css["children-visible"] : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
