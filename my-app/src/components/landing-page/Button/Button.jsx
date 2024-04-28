import React from 'react';
import styles from './Button.module.css'

export const Button = (props) => {
    return(
        <button className={styles.landingPage_button} type="submit">
            {props.buttonText}
        </button>
    )
}