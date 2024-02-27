import React from 'react';
import RoutineItem from './RoutineItem';

function RoutineList({ routines, onItemClick, onSubmit, onUpdate }) {
    if (!Array.isArray(routines)) {
        return <div>No routines available</div>;
    }
    return (
        <div className="routine-list-container">
            {routines.map(routine => (
                <RoutineItem 
                    key={routine.RoutineID} 
                    routine={routine} 
                    onClick={onItemClick} 
                    onSubmit={onSubmit}
                    onUpdate={onUpdate}
                    />
            ))}
        </div>
    );
}

export default RoutineList;
