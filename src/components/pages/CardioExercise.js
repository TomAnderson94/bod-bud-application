import CardioList from '../entities/CardioList';
import { useState, useEffect } from 'react';
import API from '../api/API';
import './CardioExercise.css';
import GenericForm from '../UI/GenericForm';


function CardioExercise() {
    
    // Initialisation ----------------------------------------
    const endpoint = `/cardioExercises`;
    const exerciseEndpoint = `/exercises`;

    // State -------------------------------------------------
    const [cardioExercises, setCardioExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');
    const [showForm, setShowForm] = useState(false);

    // Methods -----------------------------------------------
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await API.get(exerciseEndpoint);
                if (response.isSuccess) {
                    setExercises(response.result);
                    console.log('All exercise names: ', response.result);
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
                console.log('Received cardio exercises:', response.result);
            } else {
                setLoadingMessage(response.message);
            }
        } catch (err) {
            setLoadingMessage(err.message || 'An error occurred while fetching exercises');
        }
    };

    useEffect(() => {
        apiCall(endpoint);
    }, [endpoint]);

    // Handlers ----------------------------------------------
    const handleAdd = () => setShowForm(true);
    const handleCancel = () => setShowForm(false);
    
    const addExercise = async (newExercise) => {
        setLoadingMessage('Adding exercise...');
        try {
            const response = await API.post('/cardioExercises', newExercise);
            console.log('response = ', response);
            console.log('new cardio exercise = ', newExercise); 
            console.log('selected exercise ID = ', newExercise.ExerciseID); 

            if (response.isSuccess) {

                // Find the exercise name from the exercises list
                const exerciseName = exercises.find(exercise => exercise.ExerciseID === parseInt(newExercise.ExerciseID))?.ExerciseName || 'Exercise not found';
                console.log('Found exercise name = ', exerciseName); 

                // Construct the new exercise with the necessary data
                const addedExercise = {
                    ...newExercise,
                    ExerciseName: exerciseName,
                    formattedDate: new Date(newExercise.Date).toLocaleDateString()
                };
                console.log('new exercise: ', addedExercise);
                // Add the new exercise to the list of user exercises
                setCardioExercises([addedExercise, ...cardioExercises]);
                setLoadingMessage(''); 
            } else {
                setLoadingMessage('Exercise could not be recorded: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while saving the exercise:', err);
            setLoadingMessage('An error occurred while saving the exercise.');
        }
    };
    
    const updateExercise = async (exerciseToUpdate) => {
        setLoadingMessage('Updating exercise...');
        console.log('update ID check: ', exerciseToUpdate.CardioExerciseID);
        console.log('update Exercise Name check: ', exerciseToUpdate.ExerciseID);

        exerciseToUpdate.editing = true;

        try {
            const response = await API.put(`/cardioExercises/${exerciseToUpdate.CardioExerciseID}/${exerciseToUpdate.UserID}`, exerciseToUpdate);
            if (response.isSuccess && response.result) {
                const updatedExercises = cardioExercises.map(exercise => 
                    exercise.CardioExerciseID === exerciseToUpdate.CardioExerciseID ?  {...exercise, ...exerciseToUpdate, editing: false} : exercise
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

    const deleteExercise = async (exerciseToDelete) => {
        console.log('unique ID = ', exerciseToDelete); 

        if (!window.confirm('Are you sure you want to delete this exercise?')) return;

        setLoadingMessage('Deleting exercise...');
        try {
            const response = await API.delete(`/cardioExercises/${exerciseToDelete}/1`);
            if (response.isSuccess) {
                setCardioExercises(cardioExercises.filter(exercise => 
                    exercise.CardioExerciseID !== exerciseToDelete
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
        const newCardioExercises = cardioExercises.map(cardioExercise => {
            if (cardioExercise.CardioExerciseID === cardioExercisesId) {
                return {
                    ...cardioExercise,
                    ExerciseID: e.target.value
                };
            }
            return cardioExercise;
        });
        setCardioExercises(newCardioExercises);
    };
    
    // Methods for handling edit changes
    const handleExerciseChange = (updatedExercise) => {
        setCardioExercises(cardioExercises.map(exercise =>
            exercise.CardioExerciseID === updatedExercise.CardioExerciseID ? updatedExercise : exercise                
            ));
    };

    const cancelEdit = () => {
        setCardioExercises(cardioExercises.map(ex => {
            return { ...ex, editing: false };
        }));

    };

    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeID === 1);

    const constructCardioData = (formData) => {
        return {
            UserID: 1,
            ExerciseID: parseInt(formData.ExerciseID),
            Duration: parseFloat(formData.Duration),
            Distance: parseFloat(formData.Distance),
            AdditionalInfo: formData.AdditionalInfo || '',
            Date: formData.Date            
        };
    };

    const formFields = [
        { name: 'ExerciseID', type: 'select', placeholder: 'Select Exercise', required: true, options: filteredExercises.map(exercise => ({ value: exercise.ExerciseID, label: exercise.ExerciseName })) },
        { name: 'Duration', type: 'number', placeholder: 'Duration(minutes)', required: true },
        { name: 'Distance', type: 'number', placeholder: 'Distance(km)', required: true },
        { name: 'AdditionalInfo', type: 'text', placeholder: 'Additional Info', required: false },
        { name: 'Date', type: 'date', placeholder: 'Date', required: true },
    ];

    // View --------------------------------------------------
    return (
        <div className='cardio-exercise-container'>
            <div className='cardio-header-container'>
                <h1>Cardio Exercise</h1>
                <img src='https://loremflickr.com/320/240/cardio' alt='cardio' className='cardio-header-image'/>
            </div>
            <p>Run away from your problems... but keep running</p>

            {!showForm && (
                <button className='record-button' onClick={handleAdd}>Record New Exercise</button>
            )}
            {showForm && (
                <GenericForm 
                formFields={formFields} 
                onSubmit={addExercise} 
                onCancel={handleCancel}
                formClassName={'cardio-form-container'}
                fieldClassName={'form-field'}
                submitButtonClassName={'cardio-submit-button'}
                cancelButtonClassName={'cancel-button'}
                constructData={constructCardioData}
                />
            )}
            {!cardioExercises ? (
                <p>{loadingMessage}</p>
            ) : cardioExercises.length === 0 ? (
                <p>No Exercises found</p>
            ) : (
                <CardioList 
                    cardioExercises={cardioExercises}
                    exercises={exercises}
                    onUpdate={updateExercise}
                    onDelete={deleteExercise}
                    onExerciseNameChange={updateExerciseName}
                    onDurationChange={handleExerciseChange}
                    onDistanceChange={handleExerciseChange}
                    onAdditionalInfoChange={handleExerciseChange}
                    onCancelEdit={cancelEdit}
                />
            )}
        </div>
    )
}

export default CardioExercise;
