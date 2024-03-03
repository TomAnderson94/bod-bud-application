import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../api/API.js';
import RoutineDetails from "../entities/RoutineDetails.js";

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

    if (!routine) {
        return <div>{loadingMessage}</div>;
    }

    return (
        <div>

            <RoutineDetails
            routine={routine}
            routineExercises={routineExercises}
            exercises={exercises}
            />
        </div>
    );
}

export default RoutineDetailsPage;
