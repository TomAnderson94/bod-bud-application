import { useState, useEffect } from 'react';
import ExerciseForm from '../entities/ExerciseForm';
import API from '../api/API';
import './StrengthTraining.css';

function StrengthTraining() {
    // Initialisation ----------------------------------------
    const endpoint = `/userExercises`;
    const exerciseEndpoint = `/exercises`;


    // State -------------------------------------------------
    const [userExercises, setUserExercises] = useState([]);
    const [exercises, setExercises] = useState([]); // Holds the list of exercises for the dropdown
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');

    // Fetch available exercises
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await API.get(exerciseEndpoint);
                console.log(response);
                response.isSuccess
                ? setExercises(response.result)         
                : 
                setLoadingMessage('Failed to load exercises: ' + response.message)
            } catch (err) {
                setLoadingMessage('An error occurred while fetching exercises: ' + err.message);
            }
            
        };
        fetchExercises();
    }, [exerciseEndpoint]);



    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        try {
          const response = await API.get(endpoint);
          if (response.isSuccess) {
            setUserExercises(response.result);
            console.log("Received exercises:", response.result);
          } else {
            setLoadingMessage(response.message);
          }
        } catch (err) {
          setLoadingMessage(err.message || 'An error occurred while fetching exercises');
        }
      };

/*
    response.isSuccess
    ? setUserExercises(response.result)
    : setLoadingMessage(response.message) 
}

*/


    const addExercise = async (newExercise) => {
        setLoadingMessage('Adding exercise...');
        try {
            const response = await API.post('/userExercises', newExercise);
            console.log(response); // Log the response

            if (response.isSuccess) {
                // Add the new exercise to the list of user exercises
                setUserExercises([...userExercises, response.result]);
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
            <ExerciseForm onSubmit={addExercise} exercises={exercises} />
            {!userExercises
            ? (<p>{loadingMessage}</p>)
            : userExercises.length === 0
              ? (<p> No Exercises found</p>)

              : (<div className='records-container'>
                {Array.isArray(userExercises) && userExercises.map((userExercise) => {
                    // Find the matching exercise name 
                    const exerciseName = exercises.find(exercise => exercise.ExerciseID === userExercise.ExerciseExerciseID)?.ExerciseName || 'Exercise not found';
                    const date = new Date(userExercise.Date);
                    const formattedDate = date.toLocaleDateString();

                    return (
                        <div key={userExercise.UserExerciseID} className="record-item">
                            <span className="record-attribute">{exerciseName}</span>
                            <span className="record-attribute">{userExercise.Weight}kg</span>
                            <span className="record-attribute">x{userExercise.Reps} reps</span>
                            <span className="record-attribute">x{userExercise.Sets} sets</span>
                            <span className="record-attribute">{formattedDate}</span>
                        </div>
                    );
                })}
        </div>)
    }
</div>
    );}


export default StrengthTraining;
