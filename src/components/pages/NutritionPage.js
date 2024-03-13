import { useState } from "react";
import './NutritionPage.css';



function NutritionPage() {

    // Initialisation ------------------------------------

    // State ---------------------------------------------
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    // Methods -------------------------------------------



    // Handlers ------------------------------------------

    const handleCalculate = () => {
        if (weight > 90 && age > 25 && height < 6) {
            setMessage("It seems like you might be slightly overweight. Please refer to the Weight Loss Plan.");
        } else if (weight > 80 && age > 21 && height < 6) {
            setMessage("It seems like you might be slightly overweight. Please refer to the Weight Loss Plan.");
        } else if (weight > 100 && age > 0 && height > 0) {
            setMessage("Well damnnnnn... I mean... let me refer you to the Extreme Weight Loss Plan.");
        } else if ((weight > 60 && weight < 90) && (age > 18) && (height > 5.5 && height < 6.6)) {
        setMessage("Don't worry you're optimal. Please refer to yourself as King.");
        } else {
            setMessage("Do you really want to know?");
        }
    };

    // View ----------------------------------------------
    return (
        <div className="nutrition-container">
            <div className="header-container">
            <h1>Nutrition</h1>
            <img src='https://loremflickr.com/320/240/healthyfood' alt='nutrition' className='nutrition-header-image' />
            </div>
            <h2>Input your weight, height and age to calculate your Nutrition factor</h2>
            <div className="input-container">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    placeholder="Weight in kilograms"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="height">Height (ft):</label>
                <input
                    type="number"
                    placeholder="Height in feet"
                    value={height}
                    step={0.1}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    placeholder="Age in years"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <button className="calculate-button" onClick={handleCalculate}>Calculate</button>
            {message && <p>{message}</p>}
        </div>
    );

}

export default NutritionPage;
