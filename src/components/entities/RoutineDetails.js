import React from 'react';
import './RoutineDetails.css';
import { useState, useEffect } from 'react';

function RoutineDetails({ routine, routineExercises, exercises, onAddExercise, onDelete, onClose, onUpdate }) {

  const [editedRoutineExercise, setEditedRoutineExercise] = useState({...routineExercises});


  useEffect(() => {
      setEditedRoutineExercise({ ...routineExercises });
  }, [routineExercises]);

  /*const handleEdit = (index) => {
      const routineExercisesToEdit = routineExercises[index];
      setEditedRoutineExercise({ ...routineExercisesToEdit, editing: true });
      console.log("editing: ", routineExercises.RoutineExerciseID)
  };*/

  const handleEdit = () => {
    setEditedRoutineExercise({ ...routineExercises, editing: true });
    console.log("editing: ", routineExercises);
};

/*const handleEdit = (index) => {
  const updatedRoutineExercises = [...editedRoutineExercise];
  console.log(updatedRoutineExercises);
  updatedRoutineExercises[index] = { ...updatedRoutineExercises[index], editing: true };
  setEditedRoutineExercise(updatedRoutineExercises);
  console.log("editing: ", routineExercises);
  console.log("editing: ", updatedRoutineExercises);


};*/


  const handleCancel = () => {
      setEditedRoutineExercise({ ...routineExercises, editing: false });
  };

  const handleUpdate = () => {
      onUpdate({ ...editedRoutineExercise, editing: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoutineExercise(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRepsChange = (e) => {
      setEditedRoutineExercise({ ...editedRoutineExercise, CustomReps: e.target.value });
  };

  const handleDescriptionChange = (e) => {
      setEditedRoutineExercise({ ...editedRoutineExercise, RoutineDescription: e.target.value });
  };






    // Check if routine is null or undefined
    if (!routine) {
        return <div>No routine details available</div>;
    }

    return (
    <div className='routine-details-container'>
        <div className='routine-details-header'>
          <h2>{routine.RoutineID}. {routine.RoutineName}</h2>
          <p>Description: {routine.RoutineDescription}</p>
        <div className='routine-exercises'>
          <h3>Routine Exercises:</h3>
          <ul>
              {routineExercises.map((exercise, index) => {
                const exerciseName = exercises.find(item => item.ExerciseID === exercise.ExerciseID)?.ExerciseName || 'Exercise not found';
                
                return (
                  <li key={index} className='routine-exercise-item'>
                    {!editedRoutineExercise.editing ? (
                      <>
                          <p>{exercise.Order}) {exerciseName}</p>
                          <p>{exercise.CustomWeight} kg</p>
                          <p>{exercise.CustomReps} reps</p>
                          <p>{exercise.CustomSets} sets</p>
                          <p>{exercise.CustomDuration} minutes</p>
                          <p>{exercise.CustomDistance} km</p>
                          <p className='additional-info'>Additional Info: {exercise.CustomAdditionalInfo}</p>
                          <div className='exercise-actions'>
                              <button onClick={() => handleEdit(index)} className='modify-button'>Edit</button>
                              <button onClick={() => onDelete(routineExercises)} className='delete-button'>Delete</button>
                          </div>
                      </>
                  ) : (
                      <div>
                          <div className='form-field'>
                              <select
                                  id="exercise"
                                  value={editedRoutineExercise.ExerciseID}
                                  onChange={(e) => setEditedRoutineExercise({ ...editedRoutineExercise, ExerciseID: e.target.value })}
                              >
                                  <option value="">Select Exercise</option>
                                  {exercises.map((exercise) => (
                                      <option key={exercise.ExerciseID} value={exercise.ExerciseID}>
                                          {exercise.ExerciseName}
                                      </option>
                                  ))}
                              </select>
                          </div>                        
                          <div className='form-field'>
                              <input 
                              type='number' 
                              placeholder='Custom Weight' 
                              value={editedRoutineExercise.CustomWeight} 
                              onChange={handleInputChange} 
                              />
                          </div>
                          <div className='form-field'>
                              <input 
                              type='number' 
                              placeholder='Custom Reps' 
                              value={editedRoutineExercise.CustomReps} 
                              onChange={handleInputChange} 
                              />
                          </div>
                          <div className='form-field'>
                              <input 
                              type='number' 
                              placeholder='Custom Sets' 
                              value={editedRoutineExercise.CustomSets} 
                              onChange={handleInputChange} />
                          </div>
                          <div className='form-field'>
                              <input 
                              type='number' 
                              name='CustomDuration' 
                              placeholder='Custom Duration' 
                              value={editedRoutineExercise.CustomDuration} 
                              onChange={handleInputChange} />
                          </div>
                          <div className='form-field'>
                              <input 
                              type='number' 
                              name='CustomDistance' 
                              placeholder='Custom Distance' 
                              value={editedRoutineExercise.CustomDistance} 
                              onChange={handleInputChange} />
                          </div>
                          <div className='form-field'>
                              <input 
                              type='text' 
                              name='CustomAdditionalInfo' 
                              placeholder='Custom Additional Info' 
                              value={editedRoutineExercise.CustomAdditionalInfo} 
                              onChange={handleInputChange} />
                          </div>
                          <button onClick={handleUpdate} className='modify-button'>Update</button>
                          <button onClick={handleCancel} className='cancel-button'>Cancel</button>
                      </div>
                                      )}
                                  </li>
                              );
                          })}
                      </ul>
                </div>
            </div>
            <button onClick={onClose} className='routine-details-button'>Back</button>
            <button onClick={onAddExercise} className='routine-details-button'>Add an Exercise</button>
            <button onClick={() => onDelete(routine)} className='routine-details-delete-button'>Delete Routine</button>
        </div>
    );
}

export default RoutineDetails;
