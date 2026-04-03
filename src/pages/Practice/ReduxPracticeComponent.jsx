import React from 'react'
import { useSelector } from 'react-redux'

const ReduxPracticeComponent = () => {
    const { counter, showCounter } = useSelector(state => state.counter)

    return (
        <div>
            {showCounter ? counter : "Counter is hidden"}
        </div>
    )
}

export default ReduxPracticeComponent