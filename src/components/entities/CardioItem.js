import React, { useState, useEffect } from 'react';
import './CardioItem.css';

function CardioItem({ cardioExercise, exerciseName, exercises, onUpdate, onDelete, formattedDate }) {
    const [editedExercise, setEditedExercise] = useState({ ...cardioExercise });

    useEffect(() => {
        setEditedExercise({ ...cardioExercise });
    }, [cardioExercise]);

    const handleEdit = () => {
        setEditedExercise({ ...cardioExercise, editing: true });
    };

    const handleCancel = () => {
        setEditedExercise({ ...cardioExercise, editing: false });
    };

    const handleUpdate = () => {
        onUpdate({ ...editedExercise, editing: false });
    };

    const handleDurationChange = (e) => {
        setEditedExercise({ ...editedExercise, Duration: parseInt(e.target.value) });
    };

    const handleDistanceChange = (e) => {
        setEditedExercise({ ...editedExercise, Distance: parseFloat(e.target.value) });
    };

    const handleAdditionalInfoChange = (e) => {
        setEditedExercise({ ...editedExercise, AdditionalInfo: e.target.value });
    }; 

    return (
        <div>
            {!editedExercise.editing ? (
                <div className="cardio-item">
                    <span className="cardio-attribute">{exerciseName} </span>
                    <span className="cardio-attribute">{editedExercise.Duration} minutes</span>
                    <span className="cardio-attribute">{editedExercise.Distance} km</span>
                    <span className="cardio-attribute">{editedExercise.AdditionalInfo} </span>
                    <span className="cardio-attribute">{formattedDate}</span>
                    <button onClick={handleEdit} className="modify-button">Modify Record</button>
                    <button onClick={() => onDelete(cardioExercise.ID)} className="delete-button">Delete Record</button>
                </div>
            ) : (
                <div className="cardio-item">
                    <div className="form-field">
                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            value={editedExercise.Duration}
                            onChange={handleDurationChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="number"
                            placeholder="Distance (km)"
                            value={editedExercise.Distance}
                            onChange={handleDistanceChange}
                            step="0.1"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="text"
                            placeholder="Additional Info"
                            value={editedExercise.AdditionalInfo}
                            onChange={handleAdditionalInfoChange}
                        />
                    </div>
                    <button onClick={handleUpdate} className="modify-button">Update</button>
                    <button onClick={handleCancel} className="delete-button">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default CardioItem;
