import React, { useState } from 'react';
import './Rehabilitation.css';
import { useNavigate } from 'react-router-dom';


function Rehabilitation() {

    // Initialisation ---------------------------------------
    const navigate = useNavigate();

    // State ------------------------------------------------
    const [injury, setInjury] = useState('');
    const [recoveryTime, setRecoveryTime] =useState('');
    const [message, setMessage] = useState('');

    // Handlers ---------------------------------------------
    const handleOnClick = () => {
        navigate('/nutrition'); 
    };

    const handleRehabCalculate = () => {
        if (injury.includes('break') && recoveryTime > 4) {
            setMessage('The best recommendation is not to exercise yet, let the bone heal completely before any weight bearing.');
         } else if (injury.includes('sprain') && recoveryTime < 8) {
            setMessage('You may exercise keeping the weight low, please refer to the Light Weight Plan.');
        } else if (injury.includes('strain') && recoveryTime < 8) {
            setMessage('You may exercise keeping the weight low, please refer to the Light Weight Plan.');
        } else if (injury.includes('') && recoveryTime > 10) {
            setMessage('You must keep resting for now, please refer to Netflix.');
        } else {
            setMessage('Magic sponge can fix it');
        } 
    };

    // View -------------------------------------------------
    return (
        <div className='rehab-container'>
            <div className='rehab-header-container'>
                <h1>Rehabilitation</h1>
                <img src= 'https://img.freepik.com/free-photo/gorilla_23-2148167319.jpg?t=st=1741258145~exp=1741261745~hmac=b0010e80d128e5085e8dbe605032751af4f8f9b0a748606476f55fc5461d9fb6&w=1060' alt='rehab' className='rehab-img' />
            </div>
            <h2>Help Yourself</h2>
            <button className='nutrition-button' onClick={handleOnClick}>Nutrition</button>
            <div className='rehab-input-container'>
                <label htmlFor='Injury'> Injury:</label>
                <input
                    type='text'
                    placeholder='Type of injury'
                    value={injury}
                    onChange={(e) => setInjury(e.target.value)}
                />
            </div>
            <div className='rehab-input-container'>
                <label htmlFor='recovery-time'>Recovery Time:</label>
                <input
                    type='number'
                    placeholder='Recovery time (weeks)'
                    value={recoveryTime}
                    step={0.5}
                    onChange={(e) => setRecoveryTime(e.target.value)}
                />
            </div>
            <button className='rehab-calculate-button' onClick={handleRehabCalculate}>Calculate</button>
            {message && <p className='rehab-message'>{message}</p>}        
        </div>
    );
}

export default Rehabilitation;
