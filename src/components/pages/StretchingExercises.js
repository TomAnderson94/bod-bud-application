import StretchingList from '../entities/StretchingList';
import { useState, useEffect } from 'react';
import StretchingForm from '../entities/StretchingForm';
import API from '../api/API';
import './StretchingExercises.css';

function StretchingExercises() {
    
    const endpoint = `/stretchingExercises/1`;

    const [stretchingExercises, setStretchingExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');
    const [showForm, setShowForm] = useState(false);
    const [editingExercise, setEditingExercise] = useState(null);

    const apiCall = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            if (response.isSuccess) {
                console.log("success: ", response.result);  
                response.result.forEach((e) => {
                    e.editing = false;
                })
                setStretchingExercises(response.result);
                console.log("Received stretching exercises:", response.result);
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
            const response = await API.post('/stretchingExercises', newExercise);
            console.log("response = ", response); // Log the response
            console.log("newExercise = ", newExercise); 

            console.log("current stretch id = ", newExercise.StretchingID); 
            console.log("selected user ID = ", newExercise.UserID); 


            if (response.isSuccess) {

                // Add the new exercise to the list of user exercises
                setStretchingExercises([...stretchingExercises, newExercise]);
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
        console.log('update ID check: ', exerciseToUpdate.StretchingID);
        console.log('before API call: ', exerciseToUpdate);

        exerciseToUpdate.editing = true;

        try {
            const response = await API.put(`/stretchingExercises/${exerciseToUpdate.StretchingID}/${exerciseToUpdate.UserID}`, exerciseToUpdate);
            if (response.isSuccess && response.result) {
                const updatedExercises = stretchingExercises.map(exercise => 
                    exercise.StretchingID === exerciseToUpdate.StretchingID ?  {...exercise, ...exerciseToUpdate, editing: false} : exercise
                );
                setStretchingExercises(updatedExercises);
                console.log('Updated stretchingExercises: ', updatedExercises);

                setLoadingMessage('');
            } else {
                setLoadingMessage('Exercise could not be updated: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while updating the exercise:', err);
            setLoadingMessage('An error occurred while updating the exercise.');
        }
    };

    const deleteExercise = async (exerciseToDelete) => {
        console.log("unique ID = ", exerciseToDelete); 

        if (!window.confirm("Are you sure you want to delete this exercise?")) return;

        setLoadingMessage('Deleting exercise...');
        try {
            const response = await API.delete(`/stretchingExercises/${exerciseToDelete}/1`);
            if (response.isSuccess) {
                setStretchingExercises(stretchingExercises.filter(exercise => 
                    exercise.StretchingID !== exerciseToDelete
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
    
    const handleExerciseChange = (updatedExercise) => {
        setStretchingExercises(stretchingExercises.map(exercise =>
            exercise.StretchingID === updatedExercise.StretchingID ? updatedExercise : exercise                ));
    };

    const cancelEdit = () => {
        setEditingExercise(null);
        setStretchingExercises(stretchingExercises.map(ex => {
            return { ...ex, editing: false };
        }));

    };

    useEffect(() => {
        apiCall(endpoint);
    }, [endpoint]);

    return (
        <div className="stretching-exercise-container">
            <h1>StretchZone</h1>
            <p>We're flexible... are you?</p>

            {!showForm && (
                <button className="rehab-record-button" onClick={handleAdd}>Record New Exercise</button>
            )}
            {showForm && (
                <StretchingForm onSubmit={addExercise} onCancel={handleCancel} />
            )}
            {!stretchingExercises ? (
                <p>{loadingMessage}</p>
            ) : stretchingExercises.length === 0 ? (
                <p>No Exercises found</p>
            ) : (
                <StretchingList 
                    stretchingExercises={stretchingExercises}
                    onUpdate={updateExercise}
                    onDelete={deleteExercise}
                    onDurationChange={handleExerciseChange}
                    onSetsChange={handleExerciseChange}
                    onAdditionalInfoChange={handleExerciseChange}
                    onCancelEdit={cancelEdit}
                />
            )}
        </div>
    );
}

export default StretchingExercises;
