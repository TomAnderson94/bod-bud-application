import React from 'react';
import './RoutineDetails.css';

function RoutineDetails({ routine, routineExercises, exercises, handleEdit, onDelete, onClose }) {
 
    // Check if routine is null or undefined
    if (!routine) {
        return <div>No routine details available</div>;
    }

    return (
    <div className='routine-details-container'>
        <div className='routine-details-header'>
        <h2>{routine.RoutineName}</h2>
        <p>Description: {routine.RoutineDescription}</p>
        <div className='routine-exercises'>
        <h3>Routine Exercises:</h3>
        <ul>
            {routineExercises.map((exercise, index) => {
              const exerciseName = exercises.find(item => item.ExerciseID === exercise.ExerciseID)?.ExerciseName || 'Exercise not found';
              
              return (
                <li key={index} className='routine-exercise-item'>
                    <p> {exercise.Order} ) </p>                   
                    <p> {exerciseName}</p>
                    <p> {exercise.CustomWeight} kg</p>
                    <p> {exercise.CustomReps} reps</p>
                    <p> {exercise.CustomSets} sets</p>
                    <p> {exercise.CustomDuration} minutes</p>
                    <p> {exercise.CustomDistance} km</p>
                    <p className='additional-info' >Additional Info: {exercise.CustomAdditionalInfo}</p>
                </li>
              );
            })}
        </ul>
        </div>
    </div>

      <button onClick={onClose} className='routine-details-button'>Back</button>
      <button onClick={handleEdit} className='routine-details-button'>Add an Exercise</button>
      <button onClick={() => onDelete(routine)} className='routine-details-delete-button'>Delete Routine</button>
    </div>
  );
}

export default RoutineDetails;
