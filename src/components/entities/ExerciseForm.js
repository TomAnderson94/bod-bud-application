import React, { useState } from 'react';
import './ExerciseForm.css'; 

function ExerciseForm({ onSubmit, exercises }) {
// Initialisation -------------------------------------------

// State ----------------------------------------------------
const [exerciseExerciseID, setExerciseExerciseID] = useState("");
const [weight, setWeight] = useState("");
const [reps, setReps] = useState("");
const [sets, setSets] = useState("");
const [date, setDate] = useState("");

// Handlers -------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
        UserUserID: 1,
        ExerciseExerciseID: exerciseExerciseID,
        Weight: parseFloat(weight),
        Reps: parseInt(reps),
        Sets: parseInt(sets),
        Date: date
      });
  };

// View -----------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className="form-container">
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
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          step="0.5" // To allow incrementing by 0.5
          required
        />
      </div>
      <div className="form-field">
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          required
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
        <button type="submit" className="submit-button">Record Exercise</button>
      </div>
    </form>
  );
}

export default ExerciseForm;
