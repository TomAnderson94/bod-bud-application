import React, { useState } from 'react';
import './RoutineForm.css';
import RoutineExerciseForm from './RoutineExercisesForm';

function RoutineForm({ onSubmit, onCancel, exercises }) {
    const [routineName, setRoutineName] = useState("");
    const [routineDescription, setRoutineDescription] = useState("");
    const [routineExercises, setRoutineExercises] = useState([]);


    const handleRoutineExerciseSubmit = (exerciseData) => {
        setRoutineExercises([...routineExercises, exerciseData]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            routineName,
            routineDescription,
            routineExercises
        });
        // Clear input fields after submission
        setRoutineName('');
        setRoutineDescription('');
        setRoutineExercises([]);
    };
    /*
    const handleRemoveExercise = (index) => {
        const updatedExercises = [...routineExercises];
        updatedExercises.splice(index, 1);
        setRoutineExercises(updatedExercises);
    };

    const handleExerciseChange = (index, exerciseID) => {
        const updatedExercises = [...routineExercises];
        updatedExercises[index].exerciseID = exerciseID;
        setRoutineExercises(updatedExercises);
    };

    const handleCustomDetailsChange = (index, details) => {
        const updatedExercises = [...routineExercises];
        updatedExercises[index].customDetails = details;
        setRoutineExercises(updatedExercises);
    }; */

    return (
        <div className="routine-form-container">
            <h2> Create Custom Routine</h2>
            <form onSubmit={(e) => handleSubmit(e)} >
                <label>Routine Name:</label>
                <input 
                type="text" 
                value={routineName} 
                onChange={(e) => setRoutineName(e.target.value)} required 
                />
                <label>Routine Description:</label>
                <textarea  
                value={routineDescription} 
                onChange={(e) => setRoutineDescription(e.target.value)} required 
                />
                <button type="submit" onSubmit={handleSubmit}>Save Routine</button>
            </form>

            
            <RoutineExerciseForm exercises={exercises} onSubmit={handleRoutineExerciseSubmit} />

            <h3>Added Routine Exercises:</h3>
            <ul>
                {routineExercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.ExerciseID} 
                        - {exercise.CustomWeight}kg - {exercise.CustomReps} reps - {exercise.CustomSets} sets - 
                    </li>
                ))}
            </ul>

            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default RoutineForm;
