import React, { useState, useEffect } from 'react';
import './StretchingItem.css';

function StretchingItem({ stretchingExercise, onUpdate, onDelete, formattedDate }) {
    const [editedExercise, setEditedExercise] = useState({ ...stretchingExercise });

    useEffect(() => {
        setEditedExercise({ ...stretchingExercise });
    }, [stretchingExercise]);

    const handleEdit = () => {
        setEditedExercise({ ...stretchingExercise, editing: true });
    };

    const handleCancel = () => {
        setEditedExercise({ ...stretchingExercise, editing: false });
    };

    const handleUpdate = () => {
        onUpdate({ ...editedExercise, editing: false });
    };

    const handleBodyPartChange = (e) => {
        setEditedExercise({ ...editedExercise, StretchingBodyPart: e.target.value });
    };

    const handleDurationChange = (e) => {
        setEditedExercise({ ...editedExercise, Duration: parseInt(e.target.value) });
    };

    const handleSetsChange = (e) => {
        setEditedExercise({ ...editedExercise, Sets: parseInt(e.target.value) });
    };

    const handleAdditionalInfoChange = (e) => {
        setEditedExercise({ ...editedExercise, AdditionalInfo: e.target.value });
    }; 

    return (
        <div>
            {!editedExercise.editing ? (
                <div className="stretch-item">
                    <span className="stretch-attribute">{editedExercise.StretchingBodyPart} </span>
                    <span className="stretch-attribute">{editedExercise.Duration} seconds</span>
                    <span className="stretch-attribute">{editedExercise.Sets} sets</span>
                    <span className="stretch-attribute-additional-info">{editedExercise.AdditionalInfo} </span>
                    <span className="stretch-attribute">{formattedDate}</span>
                    <button onClick={handleEdit} className="modify-button">Modify Record</button>
                    <button onClick={() => onDelete(stretchingExercise)} className="delete-button">Delete Record</button>
                </div>
            ) : (
                <div className="stretch-item">
                    <div className='form-field'>
                        <input
                        id="bodypart"
                        placeholder="Body Part"
                        value={editedExercise.StretchingBodyPart}
                        onChange={handleBodyPartChange}
                        required
                    />
                    </div>
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
                            placeholder="Sets"
                            value={editedExercise.Sets}
                            onChange={handleSetsChange}
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

export default StretchingItem;
