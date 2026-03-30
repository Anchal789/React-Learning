import styles from "../../styles/ExpenseTracker/ExpenseChart.module.css";

const ExpenseChart = ({
    data
}) => {
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return (
        <div className={styles.chart}>
            {months.map((month, index) => {
                const max = Math.max(...data.map((item) => item.amount));
                const height = data.filter(item => item.date.getMonth() === index).reduce((sum, item) => sum + item.amount, 0) / max * 100 || 0;
                return (
                    <div key={month} className={styles.month}>
                        <div className={styles.barContainer}>
                            <div
                                className={styles.barFill}
                                style={{ height: `${height}%` }}
                            ></div>
                        </div>

                        <span className={styles.monthName}>{month.slice(0, 3)}</span>
                    </div>
                )
            }
            )}
        </div>
    );
};

export default ExpenseChart;