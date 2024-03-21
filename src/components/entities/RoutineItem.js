import React from 'react';
import { useState, useEffect } from 'react';
import './RoutineItem.css';

function RoutineItem({ routine, onItemClick, onUpdate, onDelete }) {
    
    // State -------------------------------------------------
    const [editedRoutine, setEditedRoutine] = useState({...routine});

    // Methods -----------------------------------------------
    useEffect(() => {
        setEditedRoutine({ ...routine });
    }, [routine]);

    // Handlers ------------------------------------------------
    const handleEdit = () => {
        setEditedRoutine({ ...routine, editing: true });
        console.log('editing: ', routine)
        console.log('editing ID: ', routine.RoutineID)

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

    // View --------------------------------------------------
    return (
        <div className='routine-item'>
            {!editedRoutine.editing ? (
                <>
                    <div onClick={() => onItemClick(routine)}>
                        <h3>- {editedRoutine.RoutineName} -</h3>
                        <div className='description-wrapper'>
                            <p>{editedRoutine.RoutineDescription}</p>              
                        </div>
                    </div>
                    <div className='routine-actions'>
                        <button onClick={handleEdit} className='modify-button'>Edit Routine</button>
                        <button onClick={() => onDelete(routine)} className='delete-button'>Delete Routine</button>
                    </div>
                </>

            ) : (
                <>
                    <div className='form-field'>
                        <input
                            type='text'
                            placeholder='Routine Name'
                            value={editedRoutine.RoutineName}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='text'
                            placeholder='Routine Description'
                            value={editedRoutine.RoutineDescription}
                            onChange={handleDescriptionChange}
                        />
                    </div>
        
                    <button onClick={handleUpdate} className='modify-button'>Update</button>
                    <button onClick={handleCancel} className='delete-button'>Cancel</button>
                </>
            )}
        </div>
    );
}

export default RoutineItem;
