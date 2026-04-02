import MealItem from './MealItem/MealItem';
import classes from '../../../styles/FoodOrder/AvailableMeals.module.css'
import FoodCard from '../../../components/FoodCard';
import { supabase } from '../../../utils/supabase';
import { useEffect, useState } from 'react';

function AvailableMeals() {

    const [availableMeals, setAvailableMeals] = useState([]);
    const [status, setStatus] = useState({ isLoading: false, error: null });

    useEffect(() => {
        const fetchMeals = async () => {
            setStatus({ isLoading: true, error: null });
            const { data, error } = await supabase
                .schema("public")
                .from('meals').select('*')
            if (error) {
                console.error("Error fetching meals:", error);
                setStatus({ isLoading: false, error: error.message });
            } else if (data) {
                setStatus({ isLoading: false, error: null });
                setAvailableMeals(data);
            } else {
                setStatus({ isLoading: false, error: "Unknown error occurred" });
            }
        }
        fetchMeals()
    }, [])

    const mealsList = availableMeals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <FoodCard>
                {status.isLoading && <p>Loading meals...</p>}
                <ul>
                    {mealsList}
                </ul>
            </FoodCard>
        </section>
    )
}

export default AvailableMeals;