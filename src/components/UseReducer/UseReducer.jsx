import { useReducer } from 'react'
import UserReducerStyle from "./UseReducer.module.css"

const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") }
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") }
    }
}

// const passwordReducer
const UseReducer = () => {

    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null })

    const validEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" })
    }

    return (
        <>
            <form className={UserReducerStyle["center"]}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" className={`${emailState.isValid === false ? UserReducerStyle.invalid : ""}`}
                        type="email"
                        value={emailState.value}
                        onChange={(event) => {
                            dispatchEmail({ type: "USER_INPUT", val: event.target.value })
                        }}
                        onBlur={validEmailHandler} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" autoComplete='true' />
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

export default UseReducer
