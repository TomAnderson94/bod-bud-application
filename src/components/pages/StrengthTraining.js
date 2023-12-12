import ExerciseList from '../entities/ExerciseList';
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
    const [showForm, setShowForm] = useState(false);

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


    // Handlers ------------------------------------------------
    const handleAdd = () => setShowForm(true);
    const handleCancel = () => setShowForm(false);
 //   const handleSuccess = () => {
 //       handleCancel();
    


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


  //  const updateExercise = () => { }

  //  const deleteExercise = () => { }

  const updateExercise = async (UserExerciseID, UserUserID, updatedExercise) => {
    setLoadingMessage('Updating exercise...');
    console.log(UserExerciseID, "and", UserUserID);
    try {
        const response = await API.put(`/userExercises/${UserExerciseID}/${UserUserID}`, updatedExercise);
        if (response.isSuccess) {
            setUserExercises(userExercises.map(exercise => 
                exercise.UserExerciseID === UserExerciseID ? { ...exercise, ...updatedExercise } : exercise
            ));
            setLoadingMessage('');
        } else {
            setLoadingMessage('Exercise could not be updated: ' + response.message);
        }
    } catch (err) {
        console.error('An error occurred while updating the exercise:', err);
        setLoadingMessage('An error occurred while updating the exercise.');
    }
};


    
const deleteExercise = async (UserExerciseID, UserUserID) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
        try {
            const response = await API.delete(`/userExercises/${UserExerciseID}/${UserUserID}`);
            if (response.isSuccess) {
                setUserExercises(userExercises.filter(ex => ex.UserExerciseID !== UserExerciseID));
            } else {
                console.error('Failed to delete:', response.message);
            }
        } catch (err) {
            console.error('Error deleting exercise:', err);
        }
    }
};




    useEffect(() => { apiCall(endpoint) }, [endpoint]);


    // View --------------------------------------------------
    return (
        <div className="strength-training-container">
            <h1>Strength Training</h1>

            {!showForm && (
                <button onClick={handleAdd}>Record New Exercise</button>
            )}

            {showForm && (
                <ExerciseForm onSubmit={addExercise} exercises={exercises} onCancel={handleCancel}/>
            )}
            
            {!userExercises
                ? (<p>{loadingMessage}</p>)
                : userExercises.length === 0
                    ? (<p> No Exercises found</p>)
                    : (<ExerciseList 
                        userExercises={userExercises}
                        exercises={exercises}
                        onUpdate={updateExercise}
                        onDelete={deleteExercise}
                    />)
            }
        </div>
    );}


export default StrengthTraining;
