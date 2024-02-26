import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../UI/Card.js";

import API from '../api/API.js';

function ExerciserDashboard() {
    // Initialisation ----------------------------------------
    const endpoint = `/exerciseTypes`;

    // State -------------------------------------------------
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');
    const navigate = useNavigate();



    // Handlers ----------------------------------------------
    const handleExerciseTypeClick = (exerciseType) => {
      console.log("clicked exercise type: ", exerciseType.ExerciseTypeName);
      switch (exerciseType.ExerciseTypeName) {
        case 'Cardio Exercise':
          navigate('/cardioexercise');
          break;
        case 'Stretching':
          navigate('/stretching');
          break;
        case 'Strength Training':
          navigate('/strengthtraining');
          break;
        case 'Rehabilitation':
          navigate('/rehabilitation');
          break;
        default:
          navigate('/404');
      }
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
      <div className="exerciser-dashboard">
        <h1>Exerciser</h1>
        {
          !exerciseTypes
            ? (<p>{loadingMessage}</p>)
            : exerciseTypes.length === 0
              ? (<p> No Exercise Types found</p>)

              : (<div className="card-container">
                  {exerciseTypes.map((exerciseType) => (
                    <Card 
                      key={exerciseType.exerciseTypeID}
                      title={exerciseType.ExerciseTypeName}
                      imageURL={exerciseType.ExerciseTypeURL}
                      onClick={() => handleExerciseTypeClick(exerciseType)}
                    />
              ))}
              </div>
        )}
      </div>
    );
}

export default ExerciserDashboard;
