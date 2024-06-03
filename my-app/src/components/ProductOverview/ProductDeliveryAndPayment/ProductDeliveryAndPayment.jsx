import { useEffect, useRef, useState } from 'react';
import styles from './ProductDeliveryAndPayment.module.css';
import DeliveryIcon from '../icons/DeliveryIcon.jsx';
import ReturnIcon from '../icons/ReturnIcon.jsx';
import NonCashPaymentIcon from '../icons/NonCashPaymentIcon.jsx';
import PostPaymentIcon from '../icons/PostPaymentIcon.jsx';
import { InfoSection } from '../InfoSection/InfoSection';

export const ProductDeliveryAndPayment = () => {
    const [activeTab, setActiveTab] = useState({ id: 1, translation: 0 });
    const [lineWidth, setLineWidth] = useState(null);
    const navLineRef = useRef(null);

    const tabs = [
        { id: 1, name: 'Доставка' },
        { id: 2, name: 'Оплата' },
    ];

    const deliveryItems = [
        {
            icon: <DeliveryIcon />,
            title: 'Нова пошта',
            description:
                'Доставка здійснюється по всій Україні (Безкоштовна доставка при замовленні на суму 1900 грн)',
        },
        {
            icon: <DeliveryIcon />,
            title: 'Укрпошта',
            description:
                'Доставка здійснюється по всій Україні (Безкоштовна доставка при замовленні на суму 1900 грн)',
            underlined: true,
        },
        {
            icon: <ReturnIcon />,
            title: 'Повернення',
            description:
                'Безкоштовне повернення протягом 14 днів з моменту покупки',
        },
    ];

    const paymentItems = [
        {
            icon: <NonCashPaymentIcon />,
            title: 'Безготівкова оплата',
            description:
                'Оплата замовлення здійснюється на сайті під час оформлення',
        },
        {
            icon: <PostPaymentIcon />,
            title: 'Накладеним платежем',
            description:
                'Ви оплачуєте замовлення після отримання: У відділенні перевізника (вартість послуги: "Нова пошта": 20 грн. + 2% від суми замовлення). Кур\'єру при доставці (по Україні, згідно з тарифами перевізника).',
        },
    ];

    useEffect(() => {
        const updateWidth = () => {
            if (navLineRef.current) {
                setLineWidth(navLineRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    const handleChangeActive = (tabId) => {
        if (activeTab.id === tabId) return;

        const newTranslation =
            tabId > activeTab.id
                ? activeTab.translation + lineWidth
                : activeTab.translation - lineWidth;

        setActiveTab({ id: tabId, translation: newTranslation });
    };

    const isActiveTab = (tabId) => activeTab.id === tabId;

    return (
        <section className={styles['delivery-and-payment']}>
            <nav className={styles['delivery-and-payment__navbar']}>
                <ul className={styles['delivery-and-payment__nav-list']}>
                    {tabs.map(({ id, name }) => (
                        <li
                            key={id}
                            onClick={() => handleChangeActive(id)}
                            className={`${
                                styles['delivery-and-payment__item']
                            } ${
                                isActiveTab(id)
                                    ? styles[
                                          'delivery-and-payment__item--disabled'
                                      ]
                                    : ''
                            }`}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
                <div className={styles['delivery-and-payment__nav-line']}>
                    <span
                        ref={navLineRef}
                        className={
                            styles['delivery-and-payment__nav-line-indicator']
                        }
                        style={{
                            transform: `translateX(${activeTab.translation}px)`,
                        }}
                    ></span>
                </div>
            </nav>
            <div className={styles['delivery-and-payment__details']}>
                <InfoSection
                    items={activeTab.id === 1 ? deliveryItems : paymentItems}
                />
            </div>
        </section>
    );
};
