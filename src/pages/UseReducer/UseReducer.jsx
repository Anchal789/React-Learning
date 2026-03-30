import { useReducer } from 'react'
import UserReducerStyle from "../../styles/UseReducerExample/UseReducer.module.css"
import { useNavigate } from 'react-router'

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") }
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") }
    }
}

// const passwordReducer
const UseReducerExample = () => {

    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null })

    const validEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" })
    }

    const navigate = useNavigate();

    return (
        <>
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
            <form className={UserReducerStyle["center"]}>
                <div className={UserReducerStyle["header"]}>
                    <h1 className={UserReducerStyle["title"]}>
                        Managing Form State with useReducer in React
                    </h1>
                    <p className={UserReducerStyle["description"]}>This page demonstrates how to manage form input state using React’s <code>useReducer</code> hook as an alternative to multiple <code>useState</code> hooks. It focuses on handling complex state logic for form fields such as email validation, improving scalability and maintainability when dealing with multiple related states.</p>
                </div>
                <div>
                    <label className={UserReducerStyle["label"]} htmlFor="email">Email</label>
                    <input id="email" className={`${UserReducerStyle["input"]} ${emailState.isValid === false ? UserReducerStyle.invalid : ""}`}
                        type="email"
                        value={emailState.value}
                        onChange={(event) => {
                            dispatchEmail({ type: "USER_INPUT", val: event.target.value })
                        }}
                        onBlur={validEmailHandler} />
                </div>
                <div>
                    <label className={UserReducerStyle["label"]} htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete='true' className={UserReducerStyle["input"]} />
                </div>
                <button
                    className={UserReducerStyle["login-button"]}
                >
                    Login
                </button>
            </form>
        </>
    )
}

export default UseReducerExample
