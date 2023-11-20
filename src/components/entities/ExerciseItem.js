import React from "react";
import './ExerciseItem.css';

function ExerciseItem({ exerciseName, Weight, Reps, Sets, formattedDate }) {
    return (
        <div className="record-item">
            <span className="record-attribute">{exerciseName}</span>
            <span className="record-attribute">{Weight}kg</span>
            <span className="record-attribute">x{Reps} reps</span>
            <span className="record-attribute">x{Sets} sets</span>
            <span className="record-attribute">{formattedDate}</span>
        </div>
    );
}

export default ExerciseItem;
