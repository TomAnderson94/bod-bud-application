import React, { useState } from 'react';
import './RoutineForm.css';
import RoutineExerciseForm from './RoutineExercisesForm';

function RoutineForm({ onSubmit, onCancel, exercises }) {
    const [routineName, setRoutineName] = useState("");
    const [routineDescription, setRoutineDescription] = useState("");
    
/*    
    const [routineExercises, setRoutineExercises] = useState([]);

    const [exerciseID, setExerciseID] = useState("");
    const [order, setOrder] = useState('');
    const [customWeight, setCustomWeight] = useState('');
    const [customReps, setCustomReps] = useState('');
    const [customSets, setCustomSets] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [customDistance, setCustomDistance] = useState('');
    const [customAdditionalInfo, setCustomAdditionalInfo] = useState('');


    const handleRoutineExerciseSubmit = (exerciseData) => {
        setRoutineExercises([...routineExercises, exerciseData]);
    };

    const handleAddExercise = (exerciseID) => {
        setRoutineExercises([...routineExercises, exerciseID]);
    };

    const handleRemoveExercise = (exerciseID) => {
        setRoutineExercises(routineExercises.filter((id) => id !== exerciseID));
    };
*/


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            UserID: 1, // Hard coding the user ID for demonstration purposes
            RoutineName: routineName,
            RoutineDescription: routineDescription,
        });
        // Clear input fields after submission
        setRoutineName('');
        setRoutineDescription('');
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
        <form onSubmit={handleSubmit} className="routine-form-container">
            <div className='form-field'>
                <input
                    type="text"
                    placeholder="Routine Name"
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <input
                    type="text"
                    placeholder="Routine Description"
                    value={routineDescription}
                    onChange={(e) => setRoutineDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <button type="submit" className="submit-button">Create Routine</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default RoutineForm;
