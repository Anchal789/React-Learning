import { useEffect, useState } from "react";
import classes from "../../styles/Practice/Practice.module.css";
import { supabase } from "../../utils/supabase";
const Practice = () => {
    // useEffect(() => {
    // }, [])
    const fetchMeals = async () => {
        const { data, error } = await supabase
            .schema("public")
            .from('meals').select('*')
    }
    fetchMeals()

    return (
        <div className={classes.practice}>

        </div>
    );
};

export default Practice;