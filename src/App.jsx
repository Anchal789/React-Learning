import { BrowserRouter, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard/Dashboard"
import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker"
import UseReducerExample from "./pages/UseReducer/UseReducer"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/useReducer" element={<UseReducerExample />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
