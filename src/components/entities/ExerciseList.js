import React from "react";
import ExerciseItem from "./ExerciseItem";

function ExerciseList({ userExercises, exercises, onUpdate, onDelete }) {
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
            exerciseName={exerciseName}
            Weight={userExercise.Weight}
            Reps={userExercise.Reps}
            Sets={userExercise.Sets}
            formattedDate={formattedDate}
            onUpdate={() => onUpdate(userExercise)}
            onDelete={() => onDelete(userExercise.UserExerciseID)}
          />
        );
      })}
    </div>
  );
}

export default ExerciseList;
