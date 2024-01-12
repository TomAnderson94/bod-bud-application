import React from "react";
import ExerciseItem from "./ExerciseItem";

function ExerciseList({ userExercises, exercises, onUpdate, onDelete, onExerciseNameChange, onWeightChange, onRepsChange, onSetsChange, onCancelEdit }) {
  return (
    <div className='records-container'>
      {Array.isArray(userExercises) && userExercises.map((userExercise) => {
        // Find the matching exercise name
        const exerciseName = exercises.find(exercise => exercise.ExerciseID === userExercise.ExerciseExerciseID)?.ExerciseName || 'Exercise not found';
        const date = new Date(userExercise.Date);
        const formattedDate = date.toLocaleDateString();

        return (
          <ExerciseItem
            key={userExercise.UserExerciseID}
            userExercise={userExercise}
            exerciseName={exerciseName}
            exercises={exercises}
            formattedDate={formattedDate}
            onUpdate={() => onUpdate(userExercise)}
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
}

export default ExerciseList;
