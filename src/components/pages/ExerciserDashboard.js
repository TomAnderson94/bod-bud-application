import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../UI/Card.js';
import './ExerciserDashboard.css';
import API from '../api/API.js';

function ExerciserDashboard() {
    // Initialisation ----------------------------------------
    const endpoint = `/exerciseTypes`;

    // State -------------------------------------------------
    const [exerciseTypes, setExerciseTypes] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');
    const navigate = useNavigate();

    // Methods -----------------------------------------------
    const apiCall = async (endpoint) => {
        const response = await API.get(endpoint);
        console.log("response: ", response); 
        console.log("received exercise types: ", response.result);
        response.isSuccess
          ? setExerciseTypes(response.result)
          : setLoadingMessage(response.message) 
    };

    useEffect(() => { 
      apiCall(endpoint) 
    }, [endpoint]);

    // Handlers ----------------------------------------------
    const handleExerciseTypeClick = (exerciseType) => {
      console.log('clicked exercise type: ', exerciseType.ExerciseTypeName);
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

    // View --------------------------------------------------
    return (
      <div className='exerciser-dashboard'>
        <h1>Exerciser Dashboard</h1>
        {!exerciseTypes
            ? (<p>{loadingMessage}</p>)
            : exerciseTypes.length === 0
              ? (<p> No Exercise Types found</p>)

              : (<div className='exerciser-card-container'>
                  {exerciseTypes.map((exerciseType) => (
                    <Card 
                      key={exerciseType.ExerciseTypeID}
                      title={exerciseType.ExerciseTypeName}
                      imageURL={exerciseType.ExerciseTypeURL}
                      onClick={() => handleExerciseTypeClick(exerciseType)}
                    />
                  ))}
                </div>
                )
          }
      </div>
    );
}

export default ExerciserDashboard;
