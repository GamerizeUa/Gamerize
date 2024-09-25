import styles from './StatusField.module.css';

export const StatusField = ({status}) => {

    return(
        <td>
            <span className={`${styles.orderStatus} ${styles[`status${status.id}`]}`}>{status.name}</span>
        </td>
    )
}