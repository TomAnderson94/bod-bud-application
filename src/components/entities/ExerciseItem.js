import React from "react";
import './ExerciseItem.css';
//import ExerciseForm from "./ExerciseForm";

function ExerciseItem({ userExercise, exerciseName, exercises, formattedDate, onUpdate, onDelete, onExerciseNameChange }) {
    
 //   const modify = false;
    return (
        <div>
            {!userExercise.editing ? existingExerciseItem(userExercise, exerciseName, formattedDate, onUpdate, onDelete) : exerciseItemToEdit(userExercise, exercises, onExerciseNameChange, onUpdate)}
        </div> 

    );
}

function existingExerciseItem(userExercise, exerciseName, formattedDate, onUpdate, onDelete) {
    return (
        <div className="record-item">
            <span className="record-attribute">{exerciseName}</span>
            <span className="record-attribute">{userExercise.Weight}kg</span>
            <span className="record-attribute">x{userExercise.Reps} reps</span>
            <span className="record-attribute">x{userExercise.Sets} sets</span>
            <span className="record-attribute">{formattedDate}</span>  
            <button onClick={onUpdate} className="modify-button">Modify Record</button>
            <button onClick={() => onDelete(userExercise)} className="delete-button">Delete Record</button>  
        </div>
            )
}

function exerciseItemToEdit(userExercise, exercises, onExerciseNameChange, onUpdate, onCancel) {
    console.log(userExercise)
    return (
        <div className="record-item">
            <div className='form-field'>
                    <select
                    id="exercise"
                    value={userExercise.ExerciseExerciseID}
                    required
                    onChange={(e) => onExerciseNameChange(e, userExercise.UserExerciseID)}
                    >
                        <option value="">Select Exercise</option>
                        {exercises.map((exercise) => (
                            <option key={exercise.ExerciseID} value={exercise.ExerciseID}>
                                {exercise.ExerciseName}
                            </option>
                        ))}
                    </select>

                </div>
                <button onClick={onUpdate} className="modify-button">Update</button>
                <button onClick={onCancel}className="delete-button">Cancel</button>
        </div>
            )
}

export default ExerciseItem;
