import React from 'react';
import StretchingItem from './StretchingItem.js';

function StretchingList({ stretchingExercises, onUpdate, onDelete, onExerciseNameChange, onCancelEdit }) {

    // View --------------------------------------------------
    return (
        <div className='stretch-list-container'>
            {Array.isArray(stretchingExercises) && stretchingExercises.map((stretchingExercise) => {
                const date = new Date(stretchingExercise.Date);
                const formattedDate = date.toLocaleDateString();

                return (                             
                    <StretchingItem
                        key={stretchingExercise.StretchingID}
                        stretchingExercise={stretchingExercise}
                        formattedDate={formattedDate}
                        onUpdate={(updatedExercise) => onUpdate(updatedExercise)}
                        onDelete={() => onDelete(stretchingExercise.StretchingID)}
                        onExerciseNameChange={(e, stretchingExerciseId) => onExerciseNameChange(e, stretchingExerciseId)}
                        onCancelEdit={onCancelEdit}
                    />
                );
            })}
        </div>
    );
}

export default StretchingList;
