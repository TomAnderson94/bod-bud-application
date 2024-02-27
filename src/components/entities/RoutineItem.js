import React from 'react';
import { useState, useEffect } from 'react';
import './RoutineItem.css';

function RoutineItem({ routine, onItemClick, onUpdate, onDelete, handleRoutineSelect }) {
    const [editedRoutine, setEditedRoutine] = useState({...routine});
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [loadingExercises, setLoadingExercises] = useState(false);





    useEffect(() => {
        setEditedRoutine({ ...routine });
    }, [routine]);

    const handleEdit = () => {
        setEditedRoutine({ ...routine, editing: true });
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


       /* try {
            setLoadingExercises(true);
            const response = await API.get(`/routineexercises/${routine.RoutinesID}`);
            if (response.isSuccess) {
                setRoutineExercises(response.result);
                console.log("item click : ", response.result);
                setShowDetailsModal(true);
            } else {
                console.error('Failed to fetch routine exercises:', response.message);
            }
        } catch (error) {
            console.error('An error occurred while fetching routine exercises:', error);
        } finally {
            setLoadingExercises(false);
        }
    };*/

    return (
        <div>
            {!editedRoutine.editing ? (
                <div className="routine-item" onClick={() => onItemClick(routine)}>
                    <h3>{editedRoutine.RoutineName}</h3>
                    <p>{editedRoutine.RoutineDescription}</p>              
        </div>

            ) : (
                <div className="routine-item">
                    <div className="form-field">
                        <input
                            type="text"
                            placeholder="Routine Name"
                            value={editedRoutine.RoutineName}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <input
                            type="text"
                            placeholder="Routine Description"
                            value={editedRoutine.RoutineDescription}
                            onChange={handleDescriptionChange}
                        />
                    </div>
        
                    <button onClick={() => setShowDetailsModal(true)} className="modify-button">Show Details</button>
                    <button onClick={handleUpdate} className="modify-button">Update</button>
                    <button onClick={handleCancel} className="delete-button">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default RoutineItem;
