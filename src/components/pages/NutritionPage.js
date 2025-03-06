import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NutritionPage.css';
import API from '../api/API';
import RoutineList from '../entities/RoutineList';

function NutritionPage() {

    // Initialisation ------------------------------------

    const navigate = useNavigate();

    // State ---------------------------------------------
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');
    const [routine, setRoutine] = useState(null);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

    // Methods -------------------------------------------

    const fetchRoutineByName = async (routineName) => {
        try {
            console.log("by name: ", routineName);
            const encodedRoutineName = encodeURIComponent(routineName);
            const response = await API.get(`/routines/RoutineName/${encodedRoutineName}`);
            if (response.isSuccess && response.result.length > 0) {
                return response.result;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching routine by name: ', error);
            return null;
        }
    };

    // Handlers ------------------------------------------
    const handleCalculate = async () => {
        try {
            if (weight > 90 && age > 20 && height < 6.1) {
                const routineName = 'Weight Loss Plan';
                console.log("routine Name: ", routineName);
                const foundRoutine = await fetchRoutineByName(routineName);
                console.log("found routine is: ", foundRoutine);
                setMessage('It seems like you might be slightly overweight. Please refer to the Weight Loss Plan.');
                setRoutine(foundRoutine);
                } else if (weight > 100 && age > 0 && height > 0) {
                    const extremeRoutineName = 'Extreme Weight Loss Plan';
                    const newFoundRoutine = await fetchRoutineByName(extremeRoutineName);
                    setMessage('Well damnnnnn... I mean... let me refer you to the Extreme Weight Loss Plan.');
                    setRoutine(newFoundRoutine);                    
                } else if ((weight > 60 && weight < 90) && (age > 18) && (height > 5.5 && height < 6.6)) {
                    setMessage("Don't worry you're optimal. Please refer to yourself as King.");
                    setRoutine(null);                    
                } else {
                    setMessage('Do you really want to know?');
                    setRoutine(null);                    
                }
        } catch (error) {
            console.error('Error fetching routine: ', error);
        }
    };

    const handleRoutineClick = (routine) => {
        setSelectedRoutine(routine);
        console.log('clicked: ', routine);
        const routineDetailsURL = `/routines/${routine.RoutineID}`;
        navigate(routineDetailsURL);
    };

    // View ----------------------------------------------
    return (
        <div className='nutrition-container'>
            <div className='header-container'>
                <h1>Nutrition</h1>
                <img src='https://img.freepik.com/free-photo/cute-elephant-holding-green-leaves-with-trunk-walking-reserve_181624-42787.jpg?t=st=1741262927~exp=1741266527~hmac=29cd1e0aecf1ba2d589abbcde578beec508c4ca7cae971cd953f9fb06c6288ac&w=996' alt='nutrition' className='nutrition-header-image' />
            </div>
            <h2>Input your weight, height and age to calculate your Nutrition factor</h2>
            <div className='input-container'>
                <label htmlFor='weight'>Weight (kg):</label>
                <input
                    type='number'
                    placeholder='Weight in kilograms'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </div>
            <div className='input-container'>
                <label htmlFor='height'>Height (ft):</label>
                <input
                    type='number'
                    placeholder='Height in feet'
                    value={height}
                    step={0.1}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className='input-container'>
                <label htmlFor='age'>Age:</label>
                <input
                    type='number'
                    placeholder='Age in years'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <button className='calculate-button' onClick={handleCalculate}>Calculate</button>
            {message && <p>{message}</p>}
            {routine && (
                <div className='recommended-plan-container'>
                    <h2>Recommended Plan:</h2>
                    <RoutineList
                    routines={routine}
                    onItemClick={handleRoutineClick}
                    />
                </div>
            )}
        </div>
    );

}

export default NutritionPage;
