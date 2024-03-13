import React from 'react';
import CardioItem from './CardioItem';

function CardioList({ cardioExercises, exercises, onUpdate, onDelete, onExerciseNameChange, onCancelEdit }) {
   
    // Handlers -------------------------------------------------
    // Filter exercise names to include only the relevant names for the page
    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeID === 1);
   
    // View -----------------------------------------------------
    return (
        <div className='cardio-list-container'>
            {Array.isArray(cardioExercises) && cardioExercises.map((cardioExercise) => {
                const exerciseName = filteredExercises.find(exercise => exercise.ExerciseID === parseInt(cardioExercise.ExerciseID))?.ExerciseName || 'Exercise not found';
                const date = new Date(cardioExercise.Date);
                const formattedDate = date.toLocaleDateString();

                return (                             
                    <CardioItem
                        key={cardioExercise.CardioExerciseID}
                        cardioExercise={cardioExercise}
                        exerciseName={exerciseName}
                        exercises={filteredExercises}
                        formattedDate={formattedDate}
                        onUpdate={(updatedExercise) => onUpdate(updatedExercise)}
                        onDelete={() => onDelete(cardioExercise.CardioExerciseID)}
                        onExerciseNameChange={(e, cardioExerciseId) => onExerciseNameChange(e, cardioExerciseId)}
                        onCancelEdit={onCancelEdit}
                    />
                );
            })}
        </div>
    );
}

export default CardioList;
