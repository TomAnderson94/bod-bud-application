import React, { useState } from 'react';

function RoutineExerciseForm({ exercises, onSubmit }) {
    const [routinesID, setRoutinesID] = useState('');
    const [exerciseID, setExerciseID] = useState('');
    const [order, setOrder] = useState('');
    const [customWeight, setCustomWeight] = useState('');
    const [customReps, setCustomReps] = useState('');
    const [customSets, setCustomSets] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [customDistance, setCustomDistance] = useState('');
    const [customAdditionalInfo, setCustomAdditionalInfo] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const exerciseData = {
            RoutinesID: routinesID,                
            ExerciseID: exerciseID,
            Order: parseInt(order),
            CustomWeight: parseInt(customWeight),
            CustomReps: parseInt(customReps),
            CustomSets: parseInt(customSets),
            CustomDuration: parseInt(customDuration),
            CustomDistance: parseFloat(customDistance),
            CustomAdditionalInfo:customAdditionalInfo
        };
        onSubmit(exerciseData);
        // Clear input fields after submission
        setRoutinesID('');
        setExerciseID('');
        setOrder('');
        setCustomWeight('');
        setCustomReps('');
        setCustomSets('');
        setCustomDuration('');
        setCustomDistance('');
        setCustomAdditionalInfo('');
    };

    return (
        <div className="routine-exercise-form">
            <h3>Add Exercise to Routine</h3>
            <form className="routine-form-container" onSubmit={handleFormSubmit}>
                <div className='form-field'>
                    <label htmlFor="routine">Routine:</label>
                    <input
                        type="number"
                        id="routine"
                        value={routinesID}
                        onChange={(e) => setRoutinesID(e.target.value)}
                        required
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="ExerciseName">Exercise Name:</label>
                    <select
                    id="exercise"
                    value={exerciseID}
                    onChange={(e) => setExerciseID(e.target.value)}
                    required
                    >
                        <option value="">Select Exercise</option>
                        console.log(exercises);
                        {exercises.map((exercise) => (
                            <option key={exercise.ExerciseID} value={exercise.ExerciseID}>
                                {exercise.ExerciseName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-field'>            
                    <label htmlFor="order">Order:</label>
                    <input
                        type="number"
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        required
                    />
                </div>
                <div className='form-field'>            
                    <label htmlFor="customWeight">Custom Weight:</label>
                    <input
                        type="number"
                        id="customWeight"
                        value={customWeight}
                        onChange={(e) => setCustomWeight(e.target.value)}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="customReps">Custom Reps:</label>
                    <input
                        type="number"
                        id="customReps"
                        value={customReps}
                        onChange={(e) => setCustomReps(e.target.value)}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="customSets">Custom Sets:</label>
                    <input
                        type="number"
                        id="customSets"
                        value={customSets}
                        onChange={(e) => setCustomSets(e.target.value)}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="customDuration">Custom Duration:</label>
                    <input
                        type="number"
                        id="customDuration"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="customDistance">Custom Distance:</label>
                    <input
                        type="number"
                        id="customDistance"
                        value={customDistance}
                        onChange={(e) => setCustomDistance(e.target.value)}
                    />
                </div>
                <div className='form-field'>
                    <label htmlFor="customAdditionalInfo">Custom Additional Info:</label>
                    <textarea
                        id="customAdditionalInfo"
                        value={customAdditionalInfo}
                        onChange={(e) => setCustomAdditionalInfo(e.target.value)}
                    ></textarea>
                </div>
                <div className='form-field'>
                <button type="submit" className="submit-button">Add Exercise</button>
                </div>
            </form>
        </div>
    );
}

export default RoutineExerciseForm;
