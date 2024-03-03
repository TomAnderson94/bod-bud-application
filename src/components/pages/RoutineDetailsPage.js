import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../api/API.js';
import RoutineDetails from "../entities/RoutineDetails.js";
import Modal from "../UI/Modal.js";

function RoutineDetailsPage() {
    const { routineID, userID, routinesID } = useParams();
    console.log("routineID: ",routineID, "+ userID: ", userID, "+ routinesID: ", routinesID)
    const routineEndpoint = `/routines/${routineID}/${userID}`;
    const routineExercisesEndpoint = `/routineexercises/${routineID}`;
    const exercisesEndpoint ='/exercises';


    const [routine, setRoutine] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading routine details...');
    const [modalOpen, setModalOpen] = useState(false);



    const fetchRoutine = async () => {
        try {
            const response = await API.get(routineEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the routine
                setRoutine(response.result[0]);
                console.log("routine id GET result: ", response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching routines data.")
        }
    };

    const fetchRoutineExercises = async () => {
        try {
            const response = await API.get(routineExercisesEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the routine
                setRoutineExercises(response.result);
                console.log("routine exercise id GET result: ", response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routine exercises.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching routine exercises data.")
        }
    };

    const fetchExercises = async () => {
        try {
            const response = await API.get(exercisesEndpoint);
            if (response.isSuccess) {
                setExercises(response.result);
            } else {
                setLoadingMessage('Failed to load exercises: ' + response.message);
            }
        } catch (err) {
            setLoadingMessage('An error occurred while fetching exercises: ' + err.message);
        }
    };


    useEffect(() => {
        fetchRoutine();
    }, [routineID]);

    useEffect(() => {
        fetchRoutineExercises();
    }, [routinesID]);

    useEffect(() => {
        fetchExercises();
    }, [exercisesEndpoint]);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleAddExercise = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    // const handleExerciseSubmit =


    const deleteRoutine = async (routineToDelete) => {
        console.log("unique ID = ", routineToDelete); 

        if (!window.confirm("Are you sure you want to delete this routine?")) return;

        setLoadingMessage('Deleting routine...');
        try {
            const response = await API.delete(`/routineExercises/${routineToDelete}/1`);
            if (response.isSuccess) {
                setRoutineExercises(routineExercises.filter(routine => 
                    routine.RoutineID !== routineToDelete
                ));
                setLoadingMessage('');
            } else {
                setLoadingMessage('Routine could not be deleted: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while deleting the routine:', err);
            setLoadingMessage('An error occurred while deleting the routine.');
        }
    };

    // Handlers ------------------------------------------------

    // View --------------------------------------------------

    if (!routine) {
        return <div>{loadingMessage}</div>;
    }

    return (
        <div>

            <RoutineDetails
            routine={routine}
            routineExercises={routineExercises}
            exercises={exercises}
            onAddExercise={handleAddExercise}
            onDelete={deleteRoutine}
            />
                 {modalOpen && (
                <Modal onClose={toggleModal}>
                    <form >
                        <label>Name:</label>
                        <label>Goals:</label>
                        <label>Interests:</label>
                        <label>Profile URL:</label>
                        <button type="submit" className="modal-save-button">Save Changes</button>
                    </form>
                </Modal>
                )}
        </div>
    );
}

export default RoutineDetailsPage;
