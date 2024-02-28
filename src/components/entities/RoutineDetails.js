import React from 'react';

function RoutineDetails({ routine, routineExercises, handleEdit, onDelete, onClose }) {
 
    // Check if routine is null or undefined
    if (!routine) {
        return <div>No routine details available</div>;
    }

    return (
    <div className="routine-details">
        <div className="routine-details-header">
        <h2>{routine.RoutineName}</h2>
        <p>Description: {routine.RoutineDescription}</p>
        <div className="routine-exercises">
        <h3>Routine Exercises:</h3>
        <ul>
            {routineExercises.map((exercise, index) => (
            <li key={index} className="routine-exercise-item">
                <p>Exercise Name: {exercise.ExerciseID}</p>
                <p>Order: {exercise.Order}</p>
                <p>Custom Weight: {exercise.CustomWeight}</p>
                <p>Custom Reps: {exercise.CustomReps}</p>
                <p>Custom Sets: {exercise.CustomSets}</p>
                <p>Custom Duration: {exercise.CustomDuration}</p>
                <p>Custom Distance: {exercise.CustomDistance}</p>
                <p>Custom Additional Info: {exercise.CustomAdditionalInfo}</p>
            </li>
            ))}
        </ul>
        </div>
      </div>

      <button onClick={onClose} className="modify-button">Close</button>
      <button onClick={handleEdit} className="modify-button">Modify Routine</button>
      <button onClick={() => onDelete(routine)} className="delete-button">Delete Routine</button>
    </div>
  );
}

export default RoutineDetails;
