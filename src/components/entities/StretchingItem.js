import React, { useState, useEffect } from 'react';
import './StretchingItem.css';

function StretchingItem({ stretchingExercise, onUpdate, onDelete, formattedDate }) {

    // State -------------------------------------------------
    const [editedExercise, setEditedExercise] = useState({ ...stretchingExercise });

    // Methods -----------------------------------------------
    useEffect(() => {
        setEditedExercise({ ...stretchingExercise });
    }, [stretchingExercise]);

    // Handlers ----------------------------------------------
    const handleEdit = () => {
        setEditedExercise({ ...stretchingExercise, editing: true });
    };

    const handleCancel = () => {
        setEditedExercise({ ...stretchingExercise, editing: false });
    };

    const handleUpdate = () => {
        onUpdate({ ...editedExercise, editing: false });
    };

    const handleFieldChange = (field, value) => {
        let parsedValue = value;
        if (field === 'Duration' || field === 'Sets') {
            parsedValue = parseInt(value);
        }
        setEditedExercise(prevState => ({
            ...prevState,
            [field]: parsedValue
        }));
    };

    // View --------------------------------------------------
    return (
        <div>
            {!editedExercise.editing ? (
                <div className='stretch-item'>
                    <span className='stretch-attribute'>{editedExercise.StretchingBodyPart} </span>
                    <span className='stretch-attribute'>{editedExercise.Duration} seconds</span>
                    <span className='stretch-attribute'>{editedExercise.Sets} sets</span>
                    <span className='stretch-attribute-additional-info'>{editedExercise.AdditionalInfo} </span>
                    <span className='stretch-attribute'>{formattedDate}</span>
                    <button onClick={handleEdit} className='modify-button'>Modify Record</button>
                    <button onClick={() => onDelete(stretchingExercise)} className='delete-button'>Delete Record</button>
                </div>
            ) : (
                <div className='stretch-item'>
                    <div className='form-field'>
                        <input
                        id='bodypart'
                        placeholder='Body Part'
                        value={editedExercise.StretchingBodyPart}
                        onChange={(e) => handleFieldChange('StretchingBodyPart', e.target.value)}
                        required
                    />
                    </div>
                    <div className='form-field'>
                        <input
                            type='number'
                            placeholder='Duration (minutes)'
                            value={editedExercise.Duration}
                            onChange={(e) => handleFieldChange('Duration', e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='number'
                            placeholder='Sets'
                            value={editedExercise.Sets}
                            onChange={(e) => handleFieldChange('Sets', e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='text'
                            placeholder='Additional Info'
                            value={editedExercise.AdditionalInfo}
                            onChange={(e) => handleFieldChange('AdditionalInfo', e.target.value)}
                        />
                    </div>
                    <button onClick={handleUpdate} className='modify-button'>Update</button>
                    <button onClick={handleCancel} className='delete-button'>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default StretchingItem;
