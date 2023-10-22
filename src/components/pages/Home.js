import { useEffect, useState } from "react";
import callFetch from "../api/API.js";

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
        const result = await callFetch(endpoint, 'GET');
        setExerciseTypes(result);
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
              : exerciseTypes.map((exerciseType) => 
                <p> key={exerciseType.id}{exerciseType.exerciseTypeName}</p>)
        }
        </section>
    )
}

export default Home;
