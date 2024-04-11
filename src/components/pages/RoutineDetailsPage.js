import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/API.js';
import RoutineDetails from '../entities/RoutineDetails.js';
import Modal from '../UI/Modal.js';
import RoutineExerciseForm from '../entities/RoutineExercisesForm.js';

function RoutineDetailsPage() {

    // Initialisation ----------------------------------------
    const { routineID, userID } = useParams();
    console.log('routineID: ', routineID, '+ userID: ', userID);
    const routineEndpoint = `/routines/${routineID}/${userID}`;
    const routineExercisesEndpoint = `/routineexercises/${routineID}`;
    const exercisesEndpoint ='/exercises';


    // State -------------------------------------------------
    const [routine, setRoutine] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading routine details...');
    const [modalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    // Methods -----------------------------------------------
    const fetchRoutine = async () => {
        try {
            const response = await API.get(routineEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                setRoutine(response.result[0]);
                console.log('specific routine GET result: ', response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage('An error occurred while fetching routines data.')
        }
    };

    const fetchRoutineExercises = async () => {
        try {
            const response = await API.get(routineExercisesEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                setRoutineExercises(response.result);
                console.log('routine exercises for the specific routine: ', response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routine exercises.');
            }
        } catch (error) {
            setLoadingMessage('An error occurred while fetching routine exercises data.')
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
    }, [routineEndpoint]);

    useEffect(() => {
        fetchRoutineExercises();
    }, [routineExercisesEndpoint]);

    useEffect(() => {
        fetchExercises();
    }, [exercisesEndpoint]);

    const toggleModal = () => setModalOpen(!modalOpen);

    // Handlers ----------------------------------------------
    const handleAddExercise = () => {
        toggleModal();
    };

    const handleBack = () => {
        navigate(`/myprofile/${routine.UserID}`)
    };

    const handleSubmitExercise = async (newRoutineExercise) => {
        setLoadingMessage('Adding routine exercise...');
        try {
            newRoutineExercise.RoutinesID = routineID;
            const response = await API.post('/routineExercises', newRoutineExercise);
            console.log('response = ', response); 
            console.log('new routine exercise = ', newRoutineExercise); 
            console.log('current routines id = ', newRoutineExercise.RoutinesID); 
            console.log('current weight = ', newRoutineExercise.CustomWeight); 
            console.log('order = ', newRoutineExercise.Order); 
            console.log('selected exercise ID = ', newRoutineExercise.ExerciseID); 
            
            if (response.isSuccess) {
                setRoutineExercises([...routineExercises, newRoutineExercise]);
                fetchRoutineExercises();
                setLoadingMessage('');
                setModalOpen(false);
            } else {
                setLoadingMessage('Exercise could not be added: ', response.message);
            }
        } catch (err) {
            console.log('An error occurred while adding the routine exercise', err);
            setLoadingMessage('An error occurred while adding the routine exercise.');
        }
    };

    const handleRoutineExerciseUpdate = async (updatedRoutineExercise) => {
        setLoadingMessage('Updating routine exercise...');
        console.log('updated routine exercise: ', updatedRoutineExercise);

        try {
            const response = await API.put(`/routineexercises/${updatedRoutineExercise.RoutineExerciseID}/${updatedRoutineExercise.RoutinesID}`, updatedRoutineExercise);
            if (response.isSuccess && response.result) {
                const updatedExercise = routineExercises.map(routineExercise => 
                    routineExercise.RoutineExerciseID === updatedRoutineExercise.RoutineExerciseID ? updatedRoutineExercise : routineExercise
                );
                setRoutineExercises(updatedExercise);
                fetchRoutineExercises();
                console.log('updated routine exercises: ', updatedExercise);
                setLoadingMessage('');
            } else {
                setLoadingMessage('Routine exercise could not be updated: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while updating the routine exercise:', err);
            setLoadingMessage('An error occurred while updating the routine exercise.');
        }
    };

    const deleteRoutine = async (routineToDelete) => {
        console.log('body = ', routineToDelete); 
        console.log('user ID = ', routineToDelete.UserID); 
        console.log('routine ID = ', routineToDelete.RoutineID); 

        if (!window.confirm('Are you sure you want to delete this routine and all of its exercises?')) return;

        setLoadingMessage('Deleting routine...');
        try {
            const response = await API.delete(`/routines/${routineToDelete.RoutineID}/${routineToDelete.UserID}`);
            if (response.isSuccess) {
                setRoutineExercises(routineExercises.filter(routine => 
                    routine.RoutineID !== routineToDelete.RoutineID
                ));
                setLoadingMessage('');
                navigate(`/myprofile/${routineToDelete.UserID}`);
                console.log('routine deleted successfully'); 
            } else {
                setLoadingMessage('Routine could not be deleted: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while deleting the routine:', err);
            setLoadingMessage('An error occurred while deleting the routine.');
        }
    };

    const deleteRoutineExercise = async (routineExerciseToDelete) => {
        console.log('body = ', routineExerciseToDelete); 
        console.log('user ID = ', routineExerciseToDelete.RoutinesID); 
        console.log('routine exercise ID = ', routineExerciseToDelete.RoutineExerciseID); 

        if (!window.confirm('Are you sure you want to delete this routine exercise?')) return;

        setLoadingMessage('Deleting routine exercise...');
        try {
            const response = await API.delete(`/routineexercises/${routineExerciseToDelete.RoutineExerciseID}/${routineExerciseToDelete.RoutinesID}`);
            if (response.isSuccess) {
                setRoutineExercises(routineExercises.filter(routine => 
                    routine.RoutineExerciseID !== routineExerciseToDelete.RoutineExerciseID
                ));
                setLoadingMessage('');
                console.log('routine exercise deleted successfully'); 
            } else {
                setLoadingMessage('Routine exercise could not be deleted: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while deleting the routine exercise:', err);
            setLoadingMessage('An error occurred while deleting the routine exercise.');
        }
    };

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
            onDeleteExercise={deleteRoutineExercise}
            onUpdate={handleRoutineExerciseUpdate}
            onClose={handleBack}
            />
            {modalOpen && (
                <Modal onClose={toggleModal}>
                    <RoutineExerciseForm 
                    exercises={exercises}
                    onSubmit={handleSubmitExercise}
                    />
                </Modal>
                )}
        </div>
    );
}

export default RoutineDetailsPage;
