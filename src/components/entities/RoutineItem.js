import React from 'react';
import { useState, useEffect } from 'react';
import './RoutineItem.css';

function RoutineItem({ routine, onClick, onUpdate, onDelete }) {
    const [editedRoutine, setEditedRoutine] = useState({...routine});


    useEffect(() => {
        setEditedRoutine({ ...routine });
    }, [routine]);

    const handleEdit = () => {
        setEditedRoutine({ ...routine, editing: true });
    };

    const handleCancel = () => {
        setEditedRoutine({ ...routine, editing: false });
    };

    const handleUpdate = () => {
        onUpdate({ ...editedRoutine, editing: false });
    };

    const handleNameChange = (e) => {
        setEditedRoutine({ ...editedRoutine, RoutineName: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setEditedRoutine({ ...editedRoutine, RoutineDescription: e.target.value });
    };

    return (
        <div>
        {!editedRoutine.editing ? (
            <div className="routine-item" onClick={() => onClick(routine.RoutineID)}>
                <h3>{editedRoutine.RoutineName}</h3>
                <p>{editedRoutine.RoutineDescription}</p>
                <button onClick={handleEdit} className="modify-button">Modify Routine</button>
                <button onClick={() => onDelete(routine)} className="delete-button">Delete Routine</button>
            </div>
        ) : (
            <div className="routine-item">
                <div className="form-field">
                    <input
                        type="text"
                        placeholder="Routine Name"
                        value={editedRoutine.RoutineName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-field">
                    <input
                        type="text"
                        placeholder="Routine Description"
                        value={editedRoutine.RoutineDescription}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <button onClick={handleUpdate} className="modify-button">Update</button>
                <button onClick={handleCancel} className="delete-button">Cancel</button>
            </div>
        )}
    </div>
);
}

export default RoutineItem;
