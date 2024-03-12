import React, { useState } from 'react';
import './StretchingForm.css';

function StretchingForm({ onSubmit, onCancel }) {

    // State -------------------------------------------------
    const [stretchingBodyPart, setstretchingBodyPart] = useState("");
    const [duration, setDuration] = useState("");
    const [sets, setSets] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [date, setDate] = useState("");


    // Handlers ----------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            UserID: 1,
            StretchingBodyPart: stretchingBodyPart,
            Duration: parseInt(duration),
            Sets: parseInt(sets),
            AdditionalInfo: additionalInfo,
            Date: date
        });
    };

    // View --------------------------------------------------
    return (
        <form onSubmit={handleSubmit} className="stretch-form-container">
            <div className='form-field'>
                <input
                    id="bodypart"
                    placeholder="Body Part"
                    value={stretchingBodyPart}
                    onChange={(e) => setstretchingBodyPart(e.target.value)}
                    required
                />
            </div>
            <div className="form-field">
                <input
                    type="number"
                    placeholder="Duration(seconds)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
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
                    type="text" 
                    placeholder="Additional Info"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)} 
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
                <button type="submit" className="stretch-submit-button">Record Stretch</button>
                <button className="stretch-cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default StretchingForm;
