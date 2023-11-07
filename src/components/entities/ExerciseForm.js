/*

const emptyExercise = {
    ExerciseName: "",
    Weight: 0,
    Reps: 0,
    Sets: 0,
    Date: "",
    Comments: "",

};


export default function ExerciseForm() {
    // Initialisation -------------------------------------------
    // State ----------------------------------------------------

    // Handlers -------------------------------------------------

    // View -----------------------------------------------------



} */


import React, { useState } from 'react';
import './ExerciseForm.css'; 

function ExerciseForm({ onSubmit }) {
// Initialisation -------------------------------------------

// State ----------------------------------------------------
const [userUserID, setUserUserID] = useState("");
const [exerciseExerciseID, setExerciseExerciseID] = useState("");
const [exerciseName, setExerciseName] = useState("");
const [weight, setWeight] = useState("");
const [reps, setReps] = useState("");
const [sets, setSets] = useState("");
const [date, setDate] = useState("");

// Handlers -------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userUserID, exerciseExerciseID, exerciseName, weight, reps, sets, date });
  };

// View -----------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-field">
        <input
          type="text"
          placeholder="Exercise Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
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
