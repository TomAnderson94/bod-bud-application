import React from 'react';
import ExerciseItem from './ExerciseItem';

function ExerciseList({ userExercises, exercises, onUpdate, onDelete, onExerciseNameChange, onWeightChange, onRepsChange, onSetsChange, onCancelEdit }) {
  
    // Handlers ----------------------------------------------
    // Filter exercise names to include only the relevant names for the page
    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeID === 3);
  

    // View --------------------------------------------------
    return (
      <div className='records-container'>
        {Array.isArray(userExercises) && userExercises.map((userExercise) => {
          // Find the matching exercise name
          const exerciseName = filteredExercises.find(exercise => exercise.ExerciseID === parseInt(userExercise.ExerciseID))?.ExerciseName || 'Exercise not found';
          const date = new Date(userExercise.Date);
          const formattedDate = date.toLocaleDateString();

          return (
            <ExerciseItem
              key={userExercise.UserExerciseID}
              userExercise={userExercise}
              exerciseName={exerciseName}
              exercises={filteredExercises}
              formattedDate={formattedDate}
              onUpdate={(updatedExercise) => onUpdate(updatedExercise)}
              onDelete={() => onDelete(userExercise.UserExerciseID)}
              onExerciseNameChange={(e, userExerciseId) => onExerciseNameChange(e, userExerciseId)}
              onWeightChange={onWeightChange}
              onRepsChange={onRepsChange}
              onSetsChange={onSetsChange}
              onCancelEdit={onCancelEdit}
            />
          );
        })}
      </div>
    );
};

export default ExerciseList;
