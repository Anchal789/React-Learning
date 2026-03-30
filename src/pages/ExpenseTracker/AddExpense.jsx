import styles from "../../styles/ExpenseTracker/AddExpense.module.css";

const AddExpense = ({ expenses, setFilteredExpenses }) => {
    const addExpenseHandler = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const amount = e.target.amount.value;
        const date = new Date(e.target.date.value);
        const expense = { id: expenses.length + 1, title, amount: parseFloat(amount), date };
        const updatedExpenses = [...expenses, expense];
        setFilteredExpenses(prevState => ({
            ...prevState,
            expenses: updatedExpenses.filter((expense) => expense.date.getFullYear().toString() === prevState.year)
        }));
        e.target.reset();
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={addExpenseHandler}>

                <div className={styles.row}>
                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="title">Title</label>
                        <input className={styles.input} id="title" type="text" required/>
                    </div>

                    <div className={styles.control}>
                        <label className={styles.label} htmlFor="amount">Amount</label>
                        <input className={styles.input} id="amount" type="number" required/>
                    </div>

                <div className={styles.control}>
                    <label className={styles.label + " " + styles.date} htmlFor="date">Date</label>
                    <input className={styles.input} id="date" type="date" required/>
                </div>

                </div>
                <div className={styles.actions}>
                    <button className={styles.button} type="submit">Add Expense</button>
                </div>

            </form>
        </div>
    );
};

export default AddExpense;