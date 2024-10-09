import { forwardRef } from 'react';
import styles from './OrderDetails.module.css';
import { handleOverlayClick } from '@/utils/handlers';
import { OrderProductPreview } from './OrderItem/OrderProductPreview';

export const PaymentsSection = ({ order }) => {
    const { totalDiscount, totalPrice } = order;

    const paymentDetails = [
        { label: 'Вартість замовлення', value: `${totalPrice} ₴` },
        { label: 'Знижка', value: totalDiscount },
        { label: 'Доставка', value: 'Безкоштовна' },
        {
            label: 'Сума замовлення',
            value: `${totalPrice - totalDiscount} ₴`,
        },
    ];

    return (
        <section className={styles['payments']}>
            {paymentDetails.map(({ label, value }, index) => (
                <div className={styles['payment']} key={index}>
                    <p className={styles['payment__label']}>{label}:</p>
                    <p className={styles['payment__value']}>{value}</p>
                </div>
            ))}
        </section>
    );
};

export const FooterArticle = ({ title, subTitle, text }) => {
    return (
        <section className={styles['footer']}>
            <h2 className={styles['footer__title']}>{title}</h2>
            <article className={styles['footer__option']}>
                <h3 className={styles['footer__subtitle']}>{subTitle}</h3>
                {text && <p className={styles['footer__text']}>{text}</p>}
            </article>
        </section>
    );
};

export const OrderDetails = forwardRef(function OrderDetails(props, ref) {
    const { order, products } = props;
    const handleClose = () => ref.current.close();

    const {
        unregisteredUser: { city, deliveryAddress },
        paymentMethod,
        deliveryMethod,
    } = order || {};

    return (
        <dialog
            className={styles['order-details']}
            onClick={(e) => handleOverlayClick(e, handleClose)}
            ref={ref}
        >
            <header className={styles['order-details__header']}>
                <button
                    className={styles['order-details__btn-close']}
                    onClick={handleClose}
                >
                    <span className={styles['btn-close__cross']} />
                </button>
                <PaymentsSection order={order} />
            </header>
            <main className={styles['order-details__products']}>
                {products.map((product) => (
                    <OrderProductPreview {...product} key={product.id} />
                ))}
            </main>
            <footer className={styles['order-details__footer']}>
                <FooterArticle
                    title="Доставка"
                    subTitle={deliveryMethod.deliveryMethodName}
                    text={
                        city && deliveryAddress
                            ? `${city} | ${deliveryAddress}`
                            : ''
                    }
                />
                <FooterArticle
                    title="Оплата"
                    subTitle={paymentMethod.paymentMethodName}
                />
            </footer>
        </dialog>
    );
});
