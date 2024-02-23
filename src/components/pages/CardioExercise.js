import ExerciseList from '../entities/ExerciseList';
import { useState, useEffect } from 'react';
import ExerciseForm from '../entities/ExerciseForm';
import API from '../api/API';
import './CardioExercise.css';



function CardioExercise() {

    const endpoint = `/cardioExercises`;
    const exerciseEndpoint = `/exercises`;

    const [cardioExercises, setCardioExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');
    const [showForm, setShowForm] = useState(false);
    const [editingExercise, setEditingExercise] = useState(null);


    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await API.get(exerciseEndpoint);
                if (response.isSuccess) {
                    setExercises(response.result);
                } else {
                    setLoadingMessage('Failed to load exercises: ' + response.message);
                }
            } catch (err) {
                setLoadingMessage('An error occurred while fetching exercises: ' + err.message);
            }
        };
        fetchExercises();
    }, [exerciseEndpoint]);


    const apiCall = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            if (response.isSuccess) {
                response.result.forEach((e) => {
                    e.editing = false;
                });
                setCardioExercises(response.result);
                console.log("Received cardio exercises:", response.result);
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
        
    
    
        const addExercise = async (newExercise) => {
            setLoadingMessage('Adding exercise...');
            try {
                const response = await API.post('/cardioExercises', newExercise);
                console.log("response = ", response); // Log the response
                console.log("newExercise = ", newExercise); 
    
                console.log("current exercise list = ", exercises); 
                console.log("selected exercise ID = ", newExercise.ExerciseExerciseID); 
    
    
                if (response.isSuccess) {
    
                    // Find the exercise name from the exercises list
                    const exerciseName = exercises.find(exercise => exercise.ExerciseID === parseInt(newExercise.ExerciseExerciseID))?.ExerciseName || 'Exercise not found';
                    console.log("Found exercise name = ", exerciseName); 
    
                    // Construct the new exercise with the necessary data
                    const addedExercise = {
                        ...newExercise,
                        ID: response.result.id,
                        ExerciseName: exerciseName,
                        formattedDate: new Date(newExercise.Date).toLocaleDateString()
                    };
                    // Add the new exercise to the list of user exercises
                    setCardioExercises([...cardioExercises, addedExercise]);
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
    
    
        const updateExercise = async (exerciseToUpdate) => {
            setEditingExercise(exerciseToUpdate)
            setLoadingMessage('Updating exercise...');
            console.log('update ID check: ', exerciseToUpdate.ID);
            console.log('update Exercise Name check: ', exerciseToUpdate.ExerciseExerciseID);
            console.log('before API call: ', exerciseToUpdate);
    
            exerciseToUpdate.editing = true;
    
            try {
                const response = await API.put(`/cardioExercises/${exerciseToUpdate.ID}/${exerciseToUpdate.UserID}`, exerciseToUpdate);
                if (response.isSuccess && response.result) {
                    const updatedExercises = cardioExercises.map(exercise => 
                        exercise.ID === exerciseToUpdate.ID ?  {...exercise, ...exerciseToUpdate, editing: false} : exercise
                    );
                    setCardioExercises(updatedExercises);
            console.log('Updated cardioExercises: ', updatedExercises);
    
                    setLoadingMessage('');
                } else {
                    setLoadingMessage('Exercise could not be updated: ' + response.message);
                }
            } catch (err) {
                console.error('An error occurred while updating the exercise:', err);
                setLoadingMessage('An error occurred while updating the exercise.');
            }
        };
    
        const handleUpdate = (updatedExercise) => {
            setCardioExercises(cardioExercises.map(exercise =>
                exercise.ID === updatedExercise.ID ? updatedExercise : exercise
            ));
        };
    
    
        const deleteExercise = async (exerciseToDelete) => {
            console.log('delete check: ', exerciseToDelete);
            console.log('delete ID check: ', exerciseToDelete.ID);
    
            if (!window.confirm("Are you sure you want to delete this exercise?")) return;
    
            setLoadingMessage('Deleting exercise...');
            try {
                const response = await API.delete(`/cardioExercises/${exerciseToDelete}/1`);
                if (response.isSuccess) {
                    setCardioExercises(cardioExercises.filter(exercise => 
                        exercise.ID !== exerciseToDelete
                    ));
                    setLoadingMessage('');
                } else {
                    setLoadingMessage('Exercise could not be deleted: ' + response.message);
                }
            } catch (err) {
                console.error('An error occurred while deleting the exercise:', err);
                setLoadingMessage('An error occurred while deleting the exercise.');
            }
        };
    
        const updateExerciseName = (e, cardioExercisesId) => {
            let newCardioExercises = cardioExercises.map(cardioExercises => {
                if (cardioExercises.ID === cardioExercisesId) {
                    cardioExercises.ExerciseExerciseID = e.target.value
                }
    
                return cardioExercises
            })
            setCardioExercises(newCardioExercises);
        }
    
        // Methods for handling edit changes
    
        const handleExerciseChange = (updatedExercise) => {
            setCardioExercises(cardioExercises.map(exercise =>
                exercise.ID === updatedExercise.UserExerciseID ? updatedExercise : exercise
                ));
        };

        const cancelEdit = () => {
            setEditingExercise(null);
            setCardioExercises(cardioExercises.map(ex => {
                return { ...ex, editing: false };
            }));
    
        };

        useEffect(() => {
            apiCall(endpoint);
        }, [endpoint]);

    return (
        <div className="cardio-exercise-container">
            <h1>Cardio Exercise</h1>
            <p>Run away from your problems... but keep running</p>

            {!showForm && (
                <button className="record-button" onClick={() => setShowForm(true)}>Record New Exercise</button>
            )}
            {showForm && (
                <ExerciseForm onSubmit={addExercise} exercises={exercises} onCancel={() => setShowForm(false)} />
            )}
            {!cardioExercises ? (
                <p>{loadingMessage}</p>
            ) : cardioExercises.length === 0 ? (
                <p>No Exercises found</p>
            ) : (
                <ExerciseList 
                    cardioExercises={cardioExercises}
                    exercises={exercises}
                    onUpdate={updateExercise}
                    onDelete={deleteExercise}
                    onExerciseNameChange={updateExerciseName}
                    onCancelEdit={cancelEdit}
                />
            )}

        </div>
        )
}

export default CardioExercise;
