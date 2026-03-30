import classes from "../styles/FoodOrder/Card.module.css";

const FoodCard = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default FoodCard;
