import React, { useState } from 'react';
import './RoutineForm.css';

function RoutineForm({ onSubmit, onCancel }) {

    // State -------------------------------------------------
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDescription] = useState('');
    
    // Handlers ----------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            UserID: 1, // Hard coding the user ID for demonstration purposes
            RoutineName: routineName,
            RoutineDescription: routineDescription,
        });
        // Clear input fields after submission
        setRoutineName('');
        setRoutineDescription('');
    };

    // View --------------------------------------------------
    return (
        <form onSubmit={handleSubmit} className='routine-form-container'>
            <div className='form-field'>
                <input
                    type='text'
                    placeholder='Routine Name'
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    required
                />
            </div>
            <div className='form-field'>
                <input
                    type='text'
                    placeholder='Routine Description'
                    value={routineDescription}
                    onChange={(e) => setRoutineDescription(e.target.value)}
                    required
                />
            </div>
            <div className='form-field'>
                <button type='submit' className='submit-button'>Create Routine</button>
                <button className='cancel-button' onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default RoutineForm;
