import { useEffect, useState } from "react";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import ArrowUpIcon from "../../icons/ArrowUpIcon";
import styles from "./GameFeaturePicker.module.css";

export default function GameFeaturePicker({
    zIndex,
    featureKey,
    featureTitle,
    featureItems,
    checkedFeature,
    setCheckedFeature,
}) {
    const menuUniqueCSSClass = `${featureKey}Container`;
    let [isMenuActive, setIsMenuActive] = useState(false);
    function toggleMenuOnClick() {
        setIsMenuActive(!isMenuActive);
    }
    function closeMenuOnclick(e) {
        if (!e.target.closest("." + menuUniqueCSSClass)) {
            setIsMenuActive(false);
        }
    }
    function chooseItem(item) {
        setCheckedFeature(item);
        setIsMenuActive(false);
    }
    useEffect(() => {
        window.addEventListener("click", closeMenuOnclick, { capture: true });
        return () =>
            window.removeEventListener("click", closeMenuOnclick, {
                capture: true,
            });
    }, []);
    return (
        <div className={styles.wrap}>
            <div
                style={{ zIndex: zIndex }}
                className={styles.container + " " + menuUniqueCSSClass}
            >
                <div onClick={toggleMenuOnClick} className={styles.header}>
                    <p className={styles.title}>
                        {featureTitle +
                            (checkedFeature ? ": " + checkedFeature : "")}
                    </p>
                    <div className={styles.icon}>
                        {isMenuActive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                    </div>
                </div>
                {isMenuActive && (
                    <div
                        className={styles.items_container}
                        style={{
                            overflow: `${
                                featureItems.length >= 5 ? "scroll" : "visible"
                            }`,
                        }}
                    >
                        <div
                            onClick={(e) => {
                                chooseItem(null);
                                e.stopPropagation();
                            }}
                            className={styles.item}
                        >
                            <p>Скинути</p>
                        </div>
                        {featureItems.map((item) => {
                            function chooseItemOnclick(e) {
                                chooseItem(item);
                                e.stopPropagation();
                            }
                            return (
                                <div
                                    key={`${menuUniqueCSSClass}_${item}`}
                                    onClick={chooseItemOnclick}
                                    className={styles.item}
                                >
                                    <p>{item}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
