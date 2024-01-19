import React from "react";
import './ExerciseItem.css';
//import ExerciseForm from "./ExerciseForm";

function ExerciseItem({ userExercise, exerciseName, exercises, formattedDate, onUpdate, onDelete, onCancelEdit, onExerciseNameChange, onWeightChange, onRepsChange, onSetsChange }) {

 //   const modify = false;

 const handleChange = (field, value) => {
    onUpdate({ ...userExercise, [field]: value });
 };


    return (
        <div>
            {!userExercise.editing ? 
            existingExerciseItem(userExercise, exerciseName, formattedDate, () => onUpdate({ ...userExercise, editing:true }), onDelete, onCancelEdit) 
            : exerciseItemToEdit(userExercise, exercises, onExerciseNameChange, () => onUpdate({ ...userExercise, editing:false }), onDelete, onWeightChange, onRepsChange, onSetsChange, onCancelEdit)} 
        </div> 

    );
}

function existingExerciseItem(userExercise, exerciseName, formattedDate, onEdit, onDelete) {
    return (
        <div className="record-item">
            <span className="record-attribute">{exerciseName}</span>
            <span className="record-attribute">{userExercise.Weight}kg</span>
            <span className="record-attribute">x{userExercise.Reps} reps</span>
            <span className="record-attribute">x{userExercise.Sets} sets</span>
            <span className="record-attribute">{formattedDate}</span>  
            <button onClick={onEdit} className="modify-button">Modify Record</button>
            <button onClick={() => onDelete(userExercise)} className="delete-button">Delete Record</button>  
        </div>
            )
}

function exerciseItemToEdit(userExercise, exercises, onExerciseNameChange, onUpdate, handleChange, onCancelEdit, onWeightChange, onRepsChange, onSetsChange) {

    console.log("to edit: ", userExercise)

    const handleWeightChange = (e) => {
        const updatedExercise = { ...userExercise, Weight: parseFloat(e.target.value) };
        onWeightChange(updatedExercise);
        console.log("on edit weight: ", updatedExercise.Weight)

    };  
    
    const handleRepsChange = (e) => {
        const updatedExercise = { ...userExercise, Reps: parseInt(e.target.value) };
        onRepsChange(updatedExercise);
    };

    const handleSetsChange = (e) => {
        const updatedExercise = { ...userExercise, Sets: parseInt(e.target.value) };
        onSetsChange(updatedExercise);
    };    



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
                    <div className="form-field">
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        value={userExercise.Weight}
                        onChange={handleWeightChange}
                        step="0.5" // To allow incrementing by 0.5
                        required
                        />
                    </div>
                    <div className="form-field">
                        <input
                        type="number"
                        placeholder="Reps"
                        value={userExercise.Reps}
                        onChange={handleRepsChange}
                        required
                        />
                    </div>
                    <div className="form-field">
                        <input
                        type="number"
                        placeholder="Sets"
                        value={userExercise.Sets}
                        onChange={handleSetsChange}
                        required
                        />
                    </div>

                <button onClick={onUpdate} className="modify-button">Update</button>
                <button onClick={onCancelEdit}className="delete-button">Cancel</button>
        </div>
            )
}

export default ExerciseItem;
