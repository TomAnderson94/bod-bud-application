import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../api/API.js';
import RoutineDetails from "../entities/RoutineDetails.js";
import Modal from "../UI/Modal.js";
import RoutineExerciseForm from "../entities/RoutineExercisesForm.js";

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
    const [newRoutineExercise, setNewRoutineExercise] = useState({
        ExerciseID: '',
        Order: '',
        CustomWeight: '',
        CustomReps: '',
        CustomSets: '',
        CusomDuration: '',
        CustomDistance: '',
        CustomAdditionalInfo: '',
     });



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
        toggleModal();
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoutineExercise({ ...newRoutineExercise, [name]: value }); 
     };

     const handleSubmitExercise = async (newRoutineExercise) => {
        setLoadingMessage('Adding routine exercise...');
        try {
            newRoutineExercise.RoutinesID = routineID;
            const response = await API.post('/routineExercises', newRoutineExercise);
            console.log("response = ", response); // Log the response
            console.log("newRoutineExercise = ", newRoutineExercise); 

            console.log("current routine exercise id = ", newRoutineExercise.RoutineExerciseID); 
            console.log("current routines id = ", newRoutineExercise.RoutinesID); 

            console.log("order = ", newRoutineExercise.Order); 
            console.log("selected exercise ID = ", newRoutineExercise.ExerciseID); 

            
            if (response.isSuccess) {
                setRoutineExercises([...routineExercises, newRoutineExercise]);
                setLoadingMessage('');
                setModalOpen(false);
                fetchExercises(exercisesEndpoint); // Refresh exercises details
            } else {
                setLoadingMessage('Exercise could not be added: ', response.message);
            }
        } catch (err) {
            console.log('An error occurred while adding the routine exercise', err);
            setLoadingMessage('An error occurred while adding the routine exercise.');
        }
     };


    const deleteRoutine = async (routineToDelete) => {
        console.log("body = ", routineToDelete); 
        console.log("user ID = ", routineToDelete.UserID); 
        console.log("routine ID = ", routineToDelete.RoutineID); 

        if (!window.confirm("Are you sure you want to delete this routine?")) return;

        setLoadingMessage('Deleting routine...');
        try {
            const response = await API.delete(`/routines/${routineToDelete.RoutineID}/${routineToDelete.UserID}`);
            if (response.isSuccess) {
                setRoutineExercises(routineExercises.filter(routine => 
                    routine.RoutineID !== routineToDelete.RoutineID
                ));
                setLoadingMessage('');
                console.log('routine deleted successfully'); 


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
                    <RoutineExerciseForm 
                    className="custom-form-styling"
                    exercises={exercises}
                    onSubmit={handleSubmitExercise}
                    />
                </Modal>
                )}
        </div>
    );
}

export default RoutineDetailsPage;
