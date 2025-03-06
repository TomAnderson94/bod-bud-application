import StretchingList from '../entities/StretchingList';
import { useState, useEffect } from 'react';
import API from '../api/API';
import './StretchingExercises.css';
import GenericForm from '../UI/GenericForm';

function StretchingExercises() {
    
    // Initialisation ----------------------------------------
    const endpoint = `/stretchingExercises/1`;

    // Constructing Stretch Data for the generic form
    const constructStretchingData = (formData) => {
        return {
            UserID: 1,
            StretchingBodyPart: formData.StretchingBodyPart,
            Duration: parseInt(formData.Duration),
            Sets: parseInt(formData.Sets),
            AdditionalInfo: formData.AdditionalInfo || '',
            Date: formData.Date            
        };
    };
    
    // Stretching form fields for the generic form
    const formFields = [
        { name: 'StretchingBodyPart', type: 'text', placeholder: 'Body Part', required: true },
        { name: 'Duration', type: 'number', placeholder: 'Duration(seconds)', required: true },
        { name: 'Sets', type: 'number', placeholder: 'Sets', required: true },
        { name: 'AdditionalInfo', type: 'text', placeholder: 'Additional Info', required: false },
        { name: 'Date', type: 'date', placeholder: 'Date', required: true },
    ];    

    // State -------------------------------------------------
    const [stretchingExercises, setStretchingExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading exercises...');
    const [showForm, setShowForm] = useState(false);
    
    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            if (response.isSuccess) {
                response.result.forEach((e) => {
                    e.editing = false;
                })
                setStretchingExercises(response.result);
                console.log('Received stretching exercises:', response.result);
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
            const response = await API.post('/stretchingExercises', newExercise);
            console.log('response = ', response);
            console.log('new exercise = ', newExercise); 
            console.log('selected user ID = ', newExercise.UserID); 

            if (response.isSuccess) {
                setStretchingExercises([newExercise, ...stretchingExercises]);
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
        console.log('update exercise ID check: ', exerciseToUpdate.StretchingID);
        console.log('updated exercise: ', exerciseToUpdate);

        exerciseToUpdate.editing = true;

        try {
            const response = await API.put(`/stretchingExercises/${exerciseToUpdate.StretchingID}/${exerciseToUpdate.UserID}`, exerciseToUpdate);
            if (response.isSuccess && response.result) {
                const updatedExercises = stretchingExercises.map(exercise => 
                    exercise.StretchingID === exerciseToUpdate.StretchingID ?  {...exercise, ...exerciseToUpdate, editing: false} : exercise
                );
                setStretchingExercises(updatedExercises);
                console.log('Updated stretching exercises: ', updatedExercises);

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
        setStretchingExercises(stretchingExercises.map(ex => {
            return { ...ex, editing: false };
        }));

    };

    // View --------------------------------------------------
    return (
        <div className='stretching-exercise-container'>
            <div className='header-container'>
                <h1>StretchZone</h1> 
                <img src='https://img.freepik.com/free-photo/silver-tabby-cat-lying-floor-inside-room_198169-1.jpg?t=st=1741262789~exp=1741266389~hmac=a38812d54d0e0e97134ddd52bc6477793ab065aed23e953055714ff52f82b91f&w=1060' alt='stretching' className='header-image'/> 
            </div>
            <p>We're flexible... are you?</p>
                
            {!showForm && (
                <button className='stretch-record-button' onClick={handleAdd}>Record New Exercise</button>
            )}
            {showForm && (
                <GenericForm 
                formFields={formFields} 
                onSubmit={addExercise} 
                onCancel={handleCancel}
                formClassName={'stretch-form-container'}
                fieldClassName={'form-field'}
                submitButtonClassName={'stretch-submit-button'}
                cancelButtonClassName={'stretch-cancel-button'}
                constructData={constructStretchingData}
                />
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
