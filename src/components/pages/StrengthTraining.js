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
    const [editingExercise, setEditingExercise] = useState(null); // State for exercise record being edited
    const [selectedExerciseName, setSelectedExerciseName] = useState(null);


    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        try {
          const response = await API.get(endpoint);
          if (response.isSuccess) {
            response.result.forEach((e) => {
                e.editing = false;
            })
            setUserExercises(response.result);
            console.log("Received exercises:", response.result);
          } else {
            setLoadingMessage(response.message);
          }
        } catch (err) {
          setLoadingMessage(err.message || 'An error occurred while fetching exercises');
        }
    };

    useEffect(() => { 
        apiCall(endpoint) 
    }, [endpoint]);

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


    // Handlers ----------------------------------------------
    const handleAdd = () => setShowForm(true);
    const handleCancel = () => setShowForm(false);
    

    const addExercise = async (newExercise) => {
        setLoadingMessage('Adding exercise...');
        try {
            const response = await API.post('/userExercises', newExercise);
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
                    UserExerciseID: response.result.id,
                    ExerciseName: exerciseName,
                    formattedDate: new Date(newExercise.Date).toLocaleDateString()
                };
                // Add the new exercise to the list of user exercises
                setUserExercises([...userExercises, addedExercise]);
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
        setEditingExercise(exerciseToUpdate)
        setLoadingMessage('Updating exercise...');
        console.log('update userExerciseID check: ', exerciseToUpdate.UserExerciseID);
        console.log('update Exercise Name check: ', exerciseToUpdate.ExerciseExerciseID);
        console.log('before API call: ', exerciseToUpdate);

        exerciseToUpdate.editing = true;

        try {
            const response = await API.put(`/userExercises/${exerciseToUpdate.UserExerciseID}/${exerciseToUpdate.UserUserID}`, exerciseToUpdate);
            if (response.isSuccess && response.result) {
                const updatedExercises = userExercises.map(exercise => 
                    exercise.UserExerciseID === exerciseToUpdate.UserExerciseID ?  {...exercise, ...exerciseToUpdate, editing: false} : exercise
                );
                setUserExercises(updatedExercises);
        console.log('Updated userExercises: ', updatedExercises);

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
        console.log('delete check: ', exerciseToDelete);

        if (!window.confirm("Are you sure you want to delete this exercise?")) return;

        setLoadingMessage('Deleting exercise...');
        try {
            const response = await API.delete(`/userExercises/${exerciseToDelete}/1`);
            if (response.isSuccess) {
                setUserExercises(userExercises.filter(exercise => 
                    exercise.UserExerciseID !== exerciseToDelete
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

    const updateExerciseName = (e, userExerciseId) => {
        let newUserExercises = userExercises.map(userExercise => {
            if (userExercise.UserExerciseID === userExerciseId) {
                userExercise.ExerciseExerciseID = e.target.value
            }

            return userExercise
        })
        setUserExercises(newUserExercises);
    }

    // Method for handling edit changes
    const handleExerciseChange = (updatedExercise) => {
        setUserExercises(userExercises.map(exercise =>
            exercise.UserExerciseID === updatedExercise.UserExerciseID ? updatedExercise : exercise
            ));
    };

    const cancelEdit = () => {
        setEditingExercise(null);
        setUserExercises(userExercises.map(ex => {
            return { ...ex, editing: false };
        }));
    };

    // Filter exercises to show only exercise type 3
    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeTypeID === 3);
   
    // Sort exercises by their name
    const sortByExerciseName = selectedExerciseName 
    ? userExercises.filter(userExercise => {
        const exercise = exercises.find(exercise => exercise.ExerciseName === selectedExerciseName);
        return exercise && userExercise.ExerciseExerciseID === exercise.ExerciseID;
    }) : userExercises;
    console.log("name is :", sortByExerciseName);

    const handleSortChange = (e) => {
        setSelectedExerciseName(e.target.value);
    }

    // View --------------------------------------------------
    return (
        <div className="strength-training-container">
            <h1>Strength Training</h1>

            {!showForm && (
                <button className="record-button" onClick={handleAdd}>Record New Exercise</button>
                
            )}  
            <div className='dropdown-container'>
                <select onChange={handleSortChange} value={selectedExerciseName}>
                    <option value="">Select All Exercises</option>
                    {filteredExercises.map(exercise => (
                        <option key={exercise.ExerciseID} value={exercise.ExerciseName}>{exercise.ExerciseName}</option>
                    ))}
                </select>   
            </div>         
            {showForm && (
                <ExerciseForm onSubmit={addExercise} exercises={filteredExercises} onCancel={handleCancel}/>
            )}
            
            {!userExercises
                ? (<p>{loadingMessage}</p>)
                : userExercises.length === 0
                    ? (<p> No Exercises found</p>)
                    : (<ExerciseList 
                        userExercises={sortByExerciseName}
                        exercises={exercises}
                        onUpdate={updateExercise}
                        onDelete={deleteExercise}
                        onExerciseNameChange={updateExerciseName}

                        onWeightChange={handleExerciseChange}
                        onRepsChange={handleExerciseChange}
                        onSetsChange={handleExerciseChange}
                        onCancelEdit={cancelEdit}

                    />)
            }
        </div>
    );}


export default StrengthTraining;
