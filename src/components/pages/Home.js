import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../UI/Card.js";

import API from '../api/API.js';

function Home() {
    // Initialisation ----------------------------------------
    //const loggedInUserID = 279;
    const endpoint = `/exerciseTypes`;

    // State -------------------------------------------------
    const [exerciseTypes, setExerciseTypes] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');
    const navigate = useNavigate();



    // Handlers ----------------------------------------------
  const handleStrengthTrainingClick = () => {
    navigate('/strengthtraining');
  };

    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        console.log(response); // Log the response

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
            ? (<p>{loadingMessage}</p>)
            : exerciseTypes.length === 0
              ? (<p> No Exercise Types found</p>)

              : (<div className="card-container">
                  {exerciseTypes.map((exerciseType) => (
                <Card 
                  key={exerciseType.exerciseTypeID}
                  exerciseType={exerciseType}
                  onClick={handleStrengthTrainingClick}
                />
              ))}
              </div>
        )}
        </section>
    );
}

export default Home;
