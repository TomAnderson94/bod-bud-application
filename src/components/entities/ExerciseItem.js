import React from "react";
import './ExerciseItem.css';
//import ExerciseForm from "./ExerciseForm";

function ExerciseItem({ exerciseName, Weight, Reps, Sets, formattedDate, onUpdate, onDelete }) {
 //   const modify = false;
    return (
        <div className="record-item">
            <span className="record-attribute">{exerciseName}</span>
            <span className="record-attribute">{Weight}kg</span>
            <span className="record-attribute">x{Reps} reps</span>
            <span className="record-attribute">x{Sets} sets</span>
            <span className="record-attribute">{formattedDate}</span>
            <button onClick={onUpdate} className="modify-button">Modify Record</button>
            <button onClick={onDelete} className="delete-button">Delete Record</button>
        </div> 

    );
}

export default ExerciseItem;
