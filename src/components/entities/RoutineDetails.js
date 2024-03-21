import React from 'react';
import './RoutineDetails.css';
import { useState } from 'react';

function RoutineDetails({ routine, routineExercises, exercises, onAddExercise, onDelete, onDeleteExercise, onClose, onUpdate }) {

    // State -------------------------------------------------
    const [editedRoutineExercise, setEditedRoutineExercise] = useState(null);

    // Handlers ----------------------------------------------
    const handleEdit = (exercise) => {
        console.log('exercise to edit: ', exercise)
        setEditedRoutineExercise({ 
            ...exercise,
            Order: exercise.Order || 0,
            CustomWeight: exercise.CustomWeight || 0,
            CustomReps: exercise.CustomReps || 0,
            CustomSets: exercise.CustomSets || 0,
            CustomDuration: exercise.CustomDuration || 0,
            CustomDistance: exercise.CustomDistance || 0,
            CustomAdditionalInfo: exercise.CustomAdditionalInfo || ''            
         });
    };

    const handleCancel = () => {
        setEditedRoutineExercise({ ...routineExercises, editing: false });
    };

    const handleUpdate = () => {
        onUpdate({ ...editedRoutineExercise, editing: false });
        setEditedRoutineExercise(null);
    };

    const handleOrderChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, Order: parseInt(e.target.value) });
    };   
    
    const handleExerciseIDChange = (e) => {
        const exerciseID = e.target.value;
        setEditedRoutineExercise(prevState => ({
            ...prevState,
            ExerciseID: exerciseID
        }));
    };

    const handleWeightChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomWeight: parseFloat(e.target.value) });
    };

    const handleRepsChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomReps: parseInt(e.target.value) });
    };

    const handleSetsChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomSets: parseInt(e.target.value) });
    };

    const handleDurationChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomDuration: parseFloat(e.target.value) });
    };

    const handleDistanceChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomDistance: parseFloat(e.target.value) });
    };

    const handleAdditionalInfoChange = (e) => {
        setEditedRoutineExercise({ ...editedRoutineExercise, CustomAdditionalInfo: e.target.value });
    }; 


    // View --------------------------------------------------
    if (!routine) {
        return <div>No routine details available</div>;
    }
    return (
        <div className='routine-details-container'>
            <div className='routine-details-header'>
                <h2>{routine.RoutineID}. {routine.RoutineName}</h2>
                <p>Description: {routine.RoutineDescription}</p>
            </div>
            <div className='routine-exercises'>
                <h3>Routine Exercises:</h3>
                <ul>
                    {routineExercises.map((exercise, index) => {
                    const exerciseName = exercises.find(item => item.ExerciseID === exercise.ExerciseID)?.ExerciseName || 'Exercise not found';
                    return (
                        <li key={index} className='routine-exercise-item'>
                        {editedRoutineExercise === null || editedRoutineExercise.RoutineExerciseID !== exercise.RoutineExerciseID ? (
                            <>
                                <p>{exercise.Order}) {exerciseName}</p>
                                <p>{exercise.CustomWeight} kg</p>
                                <p>{exercise.CustomReps} reps</p>
                                <p>{exercise.CustomSets} sets</p>
                                <p>{exercise.CustomDuration} minutes</p>
                                <p>{exercise.CustomDistance} km</p>
                                <p className='additional-info'>Additional Info: <br /> {exercise.CustomAdditionalInfo}</p>
                                <div className='exercise-actions'>
                                    <button onClick={() => handleEdit(exercise)} className='modify-button'>Edit</button>
                                    <button onClick={() => onDeleteExercise(exercise)} className='delete-button'>Delete</button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className='form-field'>
                                    <input 
                                        type='number' 
                                        placeholder='Order' 
                                        value={editedRoutineExercise.Order} 
                                        onChange={handleOrderChange} 
                                    />
                                </div>
                                <div className='form-field'>
                                    <select
                                        id='exercise'
                                        value={editedRoutineExercise.ExerciseID}
                                        onChange={handleExerciseIDChange}
                                    >
                                        <option value=''>Select Exercise</option>
                                        {exercises.map((exercise) => (
                                            <option key={exercise.ExerciseID} value={exercise.ExerciseID}>
                                                {exercise.ExerciseName}
                                            </option>
                                        ))}
                                    </select>
                                </div>                        
                                <div className='form-field'>
                                    <input 
                                    type='number' 
                                    placeholder='Custom Weight' 
                                    value={editedRoutineExercise.CustomWeight} 
                                    step={0.5}
                                    onChange={handleWeightChange} 
                                    />
                                </div>
                                <div className='form-field'>
                                    <input 
                                    type='number' 
                                    placeholder='Custom Reps' 
                                    value={editedRoutineExercise.CustomReps} 
                                    onChange={handleRepsChange} 
                                    />
                                </div>
                                <div className='form-field'>
                                    <input 
                                    type='number' 
                                    placeholder='Custom Sets' 
                                    value={editedRoutineExercise.CustomSets} 
                                    onChange={handleSetsChange} />
                                </div>
                                <div className='form-field'>
                                    <input 
                                    type='number' 
                                    name='CustomDuration' 
                                    placeholder='Custom Duration' 
                                    value={editedRoutineExercise.CustomDuration} 
                                    onChange={handleDurationChange} />
                                </div>
                                <div className='form-field'>
                                    <input 
                                    type='number' 
                                    name='CustomDistance' 
                                    placeholder='Custom Distance' 
                                    value={editedRoutineExercise.CustomDistance} 
                                    onChange={handleDistanceChange} />
                                </div>
                                <div className='form-field'>
                                    <input 
                                    type='text' 
                                    name='CustomAdditionalInfo' 
                                    placeholder='Custom Additional Info' 
                                    value={editedRoutineExercise.CustomAdditionalInfo} 
                                    onChange={handleAdditionalInfoChange} />
                                </div>
                                <button onClick={handleUpdate} className='modify-button'>Update</button>
                                <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                            </div>
                        )}
                        </li>
                    );
                })}
                </ul>
            </div>
            <button onClick={onClose} className='routine-details-button'>Back</button>
            <button onClick={onAddExercise} className='routine-details-button'>Add an Exercise</button>
            <button onClick={() => onDelete(routine)} className='routine-details-delete-button'>Delete Routine</button>
        </div>
    );
};

export default RoutineDetails;
