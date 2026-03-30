import { useState } from "react";
import AddExpense from "./AddExpense";
import ExpenseItem from "./ExpenseItem";
import expenses from "./expenses";
import styles from "../../styles/ExpenseTracker/ExpenseTracker.module.css";
import ExpenseChart from "./ExpenseChart";
import { useNavigate } from "react-router";

const ExpenseTracker = () => {
    const [filteredExpenses, setFilteredExpenses] = useState({
        year: "2026",
        expenses: expenses.filter((expense) => expense.date.getFullYear().toString() === "2026")
    });
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <a
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    zIndex: 100,
                    background: "#333",
                    color: "white",
                    padding: "5px 15px",
                    textDecoration: "none",
                    borderRadius: "20px",
                    fontSize: "14px",
                    cursor: "pointer"
                }}
                onClick={() => navigate("/")}
            >← Back
            </a>
            <h1>Expense Tracker</h1>
            <AddExpense expenses={expenses} setFilteredExpenses={setFilteredExpenses} />
            <ExpenseChart data={filteredExpenses.expenses} />
            <div className={styles.filter}>
                <label className={styles.filterLabel} htmlFor="year">Filter by Year</label>
                <select className={styles.select} id="year" value={filteredExpenses.year} onChange={(e) => setFilteredExpenses({
                    year: e.target.value,
                    expenses: expenses.filter((expense) => expense.date.getFullYear().toString() === e.target.value)
                })}>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2024">2023</option>
                    <option value="2024">2022</option>
                    <option value="2024">2021</option>
                </select>
            </div>
            <ul className={styles.expenseList}>
                {filteredExpenses.expenses.sort((a, b) => b.date - a.date).map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} />
                ))}
            </ul>
        </div>
    )
}

export default ExpenseTracker