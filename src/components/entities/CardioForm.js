import React, { useState } from 'react';
import './CardioForm.css';

function CardioForm({ onSubmit, onCancel, exercises }) {
    const [exerciseExerciseID, setExerciseExerciseID] = useState("");
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            UserID: 1,
            ExerciseExerciseID: exerciseExerciseID,
            Duration: parseInt(duration),
            Distance: parseFloat(distance),
            AdditionalInfo: additionalInfo,
            Date: date
        });
    };

    return (
        <form onSubmit={handleSubmit} className="cardio-form-container">
            <div className='form-field'>
                <select
                    id="exercise"
                    value={exerciseExerciseID}
                    onChange={(e) => setExerciseExerciseID(e.target.value)}
                    required
                >
                    <option value="">Select Exercise</option>
                    {exercises.map((exercise) => (
                        <option key={exercise.ExerciseID} value={exercise.ExerciseID}>
                            {exercise.ExerciseName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-field">
                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <input
                    type="number"
                    placeholder="Distance (km)"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    step="0.1"
                    required
                />
            </div>
            <div className="form-field">
                <input
                    type="text" // Change to text input for additionalInfo
                    placeholder="Additional Info"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)} // Update additionalInfo state
                />
            </div>
            <div className="form-field">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <button type="submit" className="submit-button">Record Cardio</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default CardioForm;
