import React from 'react'
import { useDispatch } from 'react-redux'
import { counterActions } from '../../store/store';

const ReduxButtonComponent = () => {

    const dispatch = useDispatch();
    return (
        <div>
            {/* // --------------------- CORE FUNCTIONALITY WITH REDUX ONLY or WITHOUT REDUX TOOLKIT ---------------------- // */}
            {/* <button type='button' onClick={() => dispatch({ type: "increment" })}>Increment</button>
            <button type='button' onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
            <button type='button' onClick={() => dispatch({ type: "increase", amount: 10 })}>Increase</button>
            <button type='button' onClick={() => dispatch({ type: "toggleCounter" })}>Toggle Counter</button> */}

            <button type='button' onClick={() => dispatch(counterActions.increment())}>Increment</button>
            <button type='button' onClick={() => dispatch(counterActions.decrement())}>Decrement</button>
            <button type='button' onClick={() => dispatch(counterActions.increase(10))}>Increase</button>
            <button type='button' onClick={() => dispatch(counterActions.toggleCounter())}>Toggle Counter</button>

        </div>
    )
}

export default ReduxButtonComponent