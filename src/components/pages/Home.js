import { useEffect, useState } from "react";

import API from '../api/API.js';

function Home() {
    // Initialisation ----------------------------------------
    //const loggedInUserID = 279;
    const endpoint = `/exerciseTypes`;

    // State -------------------------------------------------
    const [exerciseTypes, setExerciseTypes] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');




    // Context -----------------------------------------------
    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        response.isSuccess
          ? setExerciseTypes(response.result)
          : setLoadingMessage(response.message) 
    };

    useEffect(() => { apiCall(endpoint) }, [endpoint]);


    // View --------------------------------------------------
    return (
        <section>
        <h1>Exercise Types</h1>
        {
          !exerciseTypes
            ? <p>{loadingMessage}</p>
            : exerciseTypes.length === 0
              ? <p> No Exercise Types found</p>
              : exerciseTypes.map((exerciseType) => (
                <p key={exerciseType.ExerciseTypeID}>{exerciseType.exerciseTypeName}</p>
              ))

        }
        </section>
    )
}

export default Home;
