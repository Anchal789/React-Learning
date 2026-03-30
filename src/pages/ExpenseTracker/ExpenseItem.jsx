import styles from "../../styles/ExpenseTracker/ExpenseItem.module.css";

const ExpenseItem = ({ expense }) => {
    const monthNameLong = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(expense.date);
    return (
        <li className={styles.item}>
            <div className={styles.left}>
                <div className={styles.dateBox}>
                    <div className={styles.month}>{monthNameLong}</div>
                    <div className={styles.year}>{expense.date.getFullYear()}</div>
                    <div className={styles.day}>{expense.date.getDate()}</div>
                </div>

                <h3 className={styles.title}>{expense.title}</h3>
            </div>

            <div className={styles.amount}>
                ${expense.amount.toFixed(2)}
            </div>
        </li>
    )
}

export default ExpenseItem;