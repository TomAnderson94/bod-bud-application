import { useState, useEffect } from 'react';
import ExerciseForm from '../entities/ExerciseForm';
import API from '../api/API';
import './StrengthTraining.css';

function StrengthTraining() {
    // Initialisation ----------------------------------------
    const endpoint = '/userExercises';

    // State -------------------------------------------------
    const [userExercises, setUserExercises] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');

    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            console.log(response); // Log the response

            if (response.isSuccess) {
                setUserExercises(response.result);
                setLoadingMessage(''); // Clear loading message on success
            } else {
                setLoadingMessage('No exercises found');
            }
        } catch (err) {
            setLoadingMessage(err.message || 'An error occurred while fetching exercises');
        }
    };

    const addExercise = async (newExercise) => {
        setLoadingMessage('Adding exercise...');
        try {
            const response = await API.post(endpoint, newExercise);
            console.log(response); // Log the response

            if (response.isSuccess) {
                // Functional update to handle potential null state
                setUserExercises(prevUserExercises => [...(prevUserExercises || []), response.result]);
                setLoadingMessage(''); 
            } else {
                // If response does not have data, log error and update loading message
                setLoadingMessage('Exercise could not be recorded: ' + response.message);
            }
        } catch (err) {
            // Log error and update loading message
            console.error('An error occurred while saving the exercise:', err);
            setLoadingMessage('An error occurred while saving the exercise.');
        }
    };

    useEffect(() => { apiCall(endpoint) }, [endpoint]);


    // View --------------------------------------------------
    return (
        <div className="strength-training-container">
            <h1>Strength Training</h1>
            <ExerciseForm onSubmit={addExercise} />
            {!userExercises
            ? (<p>{loadingMessage}</p>)
            : userExercises.length === 0
              ? (<p> No Exercises found</p>)

              : (<div className='records-container'>
                    {userExercises.map((userExercise) => (
                    <div key={userExercise.userExerciseID} className="record-item">
                        <span className="record-attribute">{userExercise.exerciseName}</span>
                        <span className="record-attribute">{userExercise.weight}kg</span>
                        <span className="record-attribute">x{userExercise.reps} reps</span>
                        <span className="record-attribute">x{userExercise.sets} sets</span>
                        <span className="record-attribute">{userExercise.date}</span>
                    </div>
                ))}
        </div>
    )}
</div>
    );
}

export default StrengthTraining;
