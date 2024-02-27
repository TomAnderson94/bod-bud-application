import React from 'react';
import CardioItem from './CardioItem';

function CardioList({ cardioExercises, exercises, onUpdate, onDelete, onExerciseNameChange, onCancelEdit }) {
   
    // Filter exercise names to include only the relevant names for the page
    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeTypeID === 1);
   
    return (
        <div className='cardio-list-container'>
            {Array.isArray(cardioExercises) && cardioExercises.map((cardioExercise) => {
                const exerciseName = filteredExercises.find(exercise => exercise.ExerciseID === parseInt(cardioExercise.ExerciseExerciseID))?.ExerciseName || 'Exercise not found';
                const date = new Date(cardioExercise.Date);
                const formattedDate = date.toLocaleDateString();

                return (                             
                    <CardioItem
                        key={cardioExercise.ID}
                        cardioExercise={cardioExercise}
                        exerciseName={exerciseName}
                        exercises={filteredExercises}
                        formattedDate={formattedDate}
                        onUpdate={(updatedExercise) => onUpdate(updatedExercise)}
                        onDelete={() => onDelete(cardioExercise.ID)}
                        onExerciseNameChange={(e, cardioExerciseId) => onExerciseNameChange(e, cardioExerciseId)}
                        onCancelEdit={onCancelEdit}
                    />
                );
            })}
        </div>
    );
}

export default CardioList;
