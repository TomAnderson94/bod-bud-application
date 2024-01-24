import React, { useState, useEffect } from "react";
import './ExerciseItem.css';
//import ExerciseForm from "./ExerciseForm";


function ExerciseItem({ userExercise, exerciseName, exercises, formattedDate, onUpdate, onDelete }) {
    const [editedExercise, setEditedExercise] = useState({ ...userExercise });

    useEffect(() => {
        setEditedExercise({ ...userExercise });
    }, [userExercise]);

    const handleWeightChange = (e) => {
        setEditedExercise({ ...editedExercise, Weight: parseFloat(e.target.value) });
    };

    const handleRepsChange = (e) => {
        setEditedExercise({ ...editedExercise, Reps: parseInt(e.target.value) });
    };

    const handleSetsChange = (e) => {
        setEditedExercise({ ...editedExercise, Sets: parseInt(e.target.value) });
    };

    const handleEdit = () => {
        setEditedExercise({ ...userExercise, editing: true });
    };

    const handleCancel = () => {
        setEditedExercise({ ...userExercise, editing: false });
    };

    const handleUpdate = () => {
        console.log("handle update check: ", editedExercise)
        onUpdate({...editedExercise, editing: false });
    };

    return (
        <div>
            {!editedExercise.editing ? (
                <div className="record-item">
                    <span className="record-attribute">{exerciseName}</span>
                    <span className="record-attribute">{editedExercise.Weight}kg</span>
                    <span className="record-attribute">x{editedExercise.Reps} reps</span>
                    <span className="record-attribute">x{editedExercise.Sets} sets</span>
                    <span className="record-attribute">{formattedDate}</span>
                    <button onClick={handleEdit} className="modify-button">Modify Record</button>
                    <button onClick={() => onDelete(userExercise)} className="delete-button">Delete Record</button>
                </div>
            ) : (
                <div className="record-item">
                    <div className='form-field'>
                        <select
                            id="exercise"
                            value={editedExercise.ExerciseExerciseID}
                            onChange={(e) => setEditedExercise({ ...editedExercise, ExerciseExerciseID: e.target.value })}
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
                            value={editedExercise.Weight}
                            onChange={handleWeightChange}
                            step="0.5"
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="number"
                            placeholder="Reps"
                            value={editedExercise.Reps}
                            onChange={handleRepsChange}
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="number"
                            placeholder="Sets"
                            value={editedExercise.Sets}
                            onChange={handleSetsChange}
                        />
                    </div>
                    <button onClick={handleUpdate} className="modify-button">Update</button>
                    <button onClick={handleCancel} className="delete-button">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default ExerciseItem;
