import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from '../api/API.js';
import RoutineDetails from "../entities/RoutineDetails.js";

function RoutineDetailsPage() {
    const { routineID } = useParams();
    const routineEndpoint = `/routines/${routineID}`;
    const routineExercisesEndpoint = `/routineexercises/${routineID}`;


    const [routine, setRoutine] = useState(null);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading routine details...');

    const fetchRoutine = async () => {
        try {
            const response = await API.get(routineEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the routine
                setRoutine(response.result);
                console.log("routines GET result: ", response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching routines data.")
        }
    };


    useEffect(() => {
        fetchRoutine();
    }, [routineID]);

    if (!routine) {
        return <div>{loadingMessage}</div>;
    }

    return (
        <div>

            <RoutineDetails
            routine={routine}
            routineExercises={routineExercises}
            />
        </div>
    );
}

export default RoutineDetailsPage;
