import classes from '../../../styles/FoodOrder/Cart.module.css';
import CartContext from '../../../store/CartContext';
import { useContext, useState } from 'react';
import CartItem from './CartItem';
import Modal from '../../../components/Modal';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../../utils/supabase';

const Cart = (props) => {
    const [checkOutData, setCheckoutData] = useState({
        name: "",
        street: "",
        postalCode: "",
        city: "",
        nameError: null,
        streetError: null,
        postalCodeError: null,
        cityError: null,
    });

    const [formSubmission, setFormSubmission] = useState({
        isSubmitting: false,
        errorMessage: null,
        successMessage: null,
        isSubmitted: false,
    });

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemovehandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddhandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };


    const fetchOrders = async () => {
        setFormSubmission(prev => ({ ...prev, isSubmitting: true }));
        const id = uuidv4()
        const { data, error } = await supabase
            .from('orders').insert({ id, name: checkOutData.name, street: checkOutData.street, postalCode: checkOutData.postalCode, city: checkOutData.city, orderedMeals: [...cartCtx.items], totalAmount: totalAmount, dateTime: new Date() }).select("*")
        if (error) {
            console.error("Error fetching orders:", error);
            setFormSubmission(prev => ({ ...prev, isSubmitting: false, errorMessage: error.message, successMessage: null, isSubmitted: false }));
        } else {
            console.log("Orders data:", data);
            setFormSubmission(prev => ({ ...prev, isSubmitting: false, errorMessage: null, successMessage: "Order submitted successfully!", isSubmitted: true }));
        }
    }

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartItemAddhandler.bind(null, item)}
                    onRemove={cartItemRemovehandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const validateFormInput = (name, value) => {
        if (value.trim().length === 0) {
            setCheckoutData((prevData) => ({
                ...prevData,
                [`${name}Error`]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`,
            }));
            return false;
        } else if (name === "postalCode" && value.length !== 5) {
            setCheckoutData((prevData) => ({
                ...prevData,
                postalCodeError: "Postal Code must be 5 characters long",
            }));
            return false;
        } else {
            setCheckoutData((prevData) => ({
                ...prevData,
                [`${name}Error`]: null,
            }));
            return true;
        }
    }

    const inputHandler = (event) => {
        const { name, value } = event.target;

        if (name === "name") {
            validateFormInput("name", value);
        }
        if (name === "street") {
            validateFormInput("street", value);
        }
        if (name === "postalCode") {
            validateFormInput("postalCode", value);
        }
        if (name === "city") {
            validateFormInput("city", value);
        }

        setCheckoutData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        let isFormValid = false;
        ["name", "street", "postalCode", "city"].forEach((field) => {
            isFormValid = validateFormInput(field, checkOutData[field]);
        });

        if (!isFormValid) {
            return;
        }

        await fetchOrders()
        setCheckoutData({
            name: "",
            street: "",
            postalCode: "",
            city: "",
        });
        cartCtx.items.forEach(item => cartItemRemovehandler(item.id));
    };

    return (
        <Modal onClick={props.onClick}>
            {formSubmission.isSubmitting ? <Spinner /> : formSubmission.errorMessage ? <p className={classes.error}>{formSubmission.errorMessage}</p> : formSubmission.successMessage ? <h3 className={classes.success}>{formSubmission.successMessage}</h3> : <>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                </div>
                {hasItems ? (

                    <div className={classes.checkout}>
                        <h4 className={classes["checkout-title"]}>Checkout</h4>
                        <form className={classes.checkOutForm}>
                            <div className={classes["form-control"]}>
                                <label htmlFor="name" className={classes.label}>Name</label>
                                <input type="text" name="name" className={classes.input} onChange={inputHandler} onBlur={inputHandler} />
                                {checkOutData.nameError && <p className={classes.error}>{checkOutData.nameError}</p>}
                            </div>
                            <div className={classes["form-control"]}>
                                <label htmlFor="street" className={classes.label}>Street</label>
                                <input type="text" name="street" className={classes.input} onChange={inputHandler} onBlur={inputHandler} />
                                {checkOutData.streetError && <p className={classes.error}>{checkOutData.streetError}</p>}
                            </div>
                            <div className={classes["form-control"]}>
                                <label htmlFor="postalCode" className={classes.label}>Postal Code</label>
                                <input type="number" name="postalCode" className={classes.input} onChange={inputHandler} onBlur={inputHandler} maxLength={5} min={10000} max={99999} />
                                {checkOutData.postalCodeError && <p className={classes.error}>{checkOutData.postalCodeError}</p>}
                            </div>
                            <div className={classes["form-control"]}>
                                <label htmlFor="city" className={classes.label}>City</label>
                                <input type="text" name="city" className={classes.input} onChange={inputHandler} onBlur={inputHandler} />
                                {checkOutData.cityError && <p className={classes.error}>{checkOutData.cityError}</p>}
                            </div>
                        </form>
                    </div>
                ) : <h3 className={classes["no-items"]}>No items in the cart.</h3>}</>}


            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>
                    Close
                </button>
                {hasItems && !formSubmission.isSubmitting && !formSubmission.isSubmitted && (
                    <button className={classes.button} onClick={submitHandler}>
                        Order
                    </button>
                )}
            </div>
        </Modal>
    );
};

export default Cart;

const Spinner = () => {
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.spinner}>
            </div>
            <p>Submitting your order...</p>
        </div >
    );
};