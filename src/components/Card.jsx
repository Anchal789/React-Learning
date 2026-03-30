import styles from '../styles/components/Card.module.css';

const Card = ({ title, subtitle, image, children, footer, onClick }) => {
    const containerClasses = `${styles.cardContainer} ${onClick ? styles.isClickable : ''}`;

    return (
        <div className={containerClasses} onClick={onClick}>
            {image && <div className={styles.cardImage}><img src={image} alt={title} /></div>}
            <div className={styles.cardContent}>
                {title && <h2 className={styles.cardTitle}>{title}</h2>}
                {subtitle && <h3 className={styles.cardSubtitle}>{subtitle}</h3>}
                <div className={styles.cardBody}>{children}</div>
            </div>
            {footer && <div className={styles.cardFooter}>{footer}</div>}
        </div>
    );
};

export default Card