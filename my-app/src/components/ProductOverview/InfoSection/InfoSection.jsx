import styles from './InfoSection.module.css';

export const InfoSection = ({ items }) => {
    return (
        <section className={styles['info-section']}>
            {items.map((item, index) => (
                <article
                    key={index}
                    className={
                        item.underlined
                            ? styles['info-section__item'] +
                              ' ' +
                              styles['info-section__item--underlined']
                            : styles['info-section__item']
                    }
                >
                    <div className={styles['info-section__icon']}>
                        {item.icon}
                    </div>
                    <div className={styles['info-section__details']}>
                        <h3 className={styles['info-section__title']}>
                            {item.title}
                        </h3>
                        <p className={styles['info-section__description']}>
                            {item.description}
                        </p>
                    </div>
                </article>
            ))}
        </section>
    );
};
