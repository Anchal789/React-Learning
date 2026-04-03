import classes from "../../styles/Practice/Practice.module.css";
import ReduxButtonComponent from "./ReduxButtonComponent";
import ReduxPracticeComponent from "./ReduxPracticeComponent";

const Practice = () => {

    return (
        <div className={classes.practice}>
            <ReduxPracticeComponent />
            <ReduxButtonComponent />
        </div>
    );
};

export default Practice;