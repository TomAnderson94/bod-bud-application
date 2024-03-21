import { useEffect, useState } from 'react';
import API from '../api/API.js';
import Modal from '../UI/Modal.js';
import './ProfilePage.css';
import RoutineForm from '../entities/RoutineForm.js';
import RoutineList from '../entities/RoutineList.js';
import { useParams, useNavigate } from 'react-router-dom';
import WeightProgressChart from '../entities/WeightProgressChart.js';
import CardioList from '../entities/CardioList.js';

function ProfilePage() {

    // Initialisation ----------------------------------------
    const { profileID } = useParams();
    const endpoint = `/profiles/${profileID}`;
    const routinesEndpoint = `/routines`;
    const routineExercisesEndpoint = `/routineexercises/1`;
    const userExercisesEndpoint = '/userexercises';
    const exercisesEndpoint = '/exercises';
    const cardioExerciseEndpoint = '/cardioexercises';

    const navigate = useNavigate();

    // State -------------------------------------------------
    const [profile, setProfile] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading profile...');
    const [modalOpen, setModalOpen] = useState(false);
    const [showRoutineForm, setShowRoutineForm] = useState(false);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [userExercises, setUserExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [cardioExercises, setCardioExercises] = useState([]);
    const [sortByTime, setSortByTime] = useState(false);
    const [sortByDistance, setSortByDistance] =useState(false)
;
    // Methods -----------------------------------------------
    const fetchProfile = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            if (response.isSuccess && response.result.length > 0) {
                setProfile(response.result[0]);
                console.log('profiles GET result: ', response.result); // console log the response
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load profile.');
            }
        } catch (error) {
            setLoadingMessage('An error occurred while fetching profile data.')
        }
    };

    const fetchRoutineExercises = async () => {
        try {
            const response = await API.get(routineExercisesEndpoint);
            if (response.isSuccess) {
                setRoutineExercises(response.result);
                console.log('routine exercises GET result: ', response.result);
            } else {
                setLoadingMessage('Failed to load exercises: ' + response.message);
            }
        } catch (err) {
            setLoadingMessage('An error occurred while fetching exercises: ' + err.message);
        }
    };

    const fetchRoutines = async () => {
        try {
            const response = await API.get(`/routines/1`);
            if (response.isSuccess && response.result.length > 0) {
                setRoutines(response.result);
                console.log('routines GET result: ', response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage('An error occurred while fetching routines data.')
        }
    };

    const fetchUserExercises = async (userExercisesEndpoint) => {
        try {
          const response = await API.get(userExercisesEndpoint);
          if (response.isSuccess) {
            response.result.forEach((e) => {
                e.editing = false;
            })
            setUserExercises(response.result);
            console.log('Received exercises:', response.result);
          } else {
            setLoadingMessage(response.message);
          }
        } catch (err) {
          setLoadingMessage(err.message || 'An error occurred while fetching exercises');
        }
      };

      const fetchExercises = async (exercisesEndpoint) => {
        try {
            const response = await API.get(exercisesEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                setExercises(response.result);
                console.log('exercises GET result: ', response.result); // console log the response
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load exercises.');
            }
        } catch (error) {
            setLoadingMessage('An error occurred while fetching exercises data.')
        }
    };

    const fetchCardioExercises = async (cardioExercises) => {
        try {
            const response = await API.get(cardioExerciseEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                setCardioExercises(response.result);
            } else {
                setLoadingMessage(response.message);
            }
        } catch (error) {
            setLoadingMessage('An error occurred fetching cardio exercises');
        }    
    };

    useEffect(() => {
        fetchProfile(endpoint);
    }, [endpoint]); 

    useEffect(() => {
        fetchRoutineExercises();
    }, [routineExercisesEndpoint]);

    useEffect(() => {
        fetchRoutines();
    }, [routinesEndpoint]);

    useEffect(() => {
        fetchUserExercises(userExercisesEndpoint);
    }, [userExercisesEndpoint]);

    useEffect(() => {
        fetchExercises(exercisesEndpoint);
    }, [exercisesEndpoint]);

    useEffect(() => {
        fetchCardioExercises(cardioExerciseEndpoint);
    }, [cardioExerciseEndpoint]);


    const toggleModal = () => setModalOpen(!modalOpen);


    // Handlers ----------------------------------------------
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await API.put(endpoint, profile);
        if (response.isSuccess) {
            toggleModal(); // Close the modal
            fetchProfile(endpoint); // Refresh profile details
        } else {
            alert('Failed to update profile');
        }
    };

    const addRoutine = async (newRoutine) => {
        setLoadingMessage('Adding routine...');
        try {
            const response = await API.post(routinesEndpoint, newRoutine);
            console.log('response = ', response); // console log the response
            console.log('newRoutine = ', newRoutine); 
            console.log('current routine list = ', routines); 
            console.log('selected routine ID = ', newRoutine.ExerciseID); 

            if (response.isSuccess) {
                setRoutines([...routines, newRoutine]);
                setLoadingMessage(''); 
                setShowRoutineForm(false)
            } else {
                setLoadingMessage('Routine could not be recorded: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while saving the routine:', err);
            setLoadingMessage('An error occurred while saving the routine.');
        }
    };

    const handleRoutineUpdate = async (updatedRoutine) => {
        setLoadingMessage('Updating routine...');
        try {
            const response = await API.put(`/routines/${updatedRoutine.RoutineID}/1`, updatedRoutine);
            if (response.isSuccess && response.result) {
                const updatedRoutines = routines.map(routine => 
                    routine.RoutineID === updatedRoutine.RoutineID ? updatedRoutine : routine
                );
                setRoutines(updatedRoutines);
                setLoadingMessage('');
            } else {
                setLoadingMessage('Routine could not be updated: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while updating the routine:', err);
            setLoadingMessage('An error occurred while updating the routine.');
        }
    };
    const handleCardioExerciseUpdate = async (updatedCardio) => {
        setLoadingMessage('Updating exercise...');
        try {
            const response = await API.put(`/cardioexercises/${updatedCardio.CardioExerciseID}/1`, updatedCardio);
            if (response.isSuccess && response.result) {
                const updatedCardioExercise = cardioExercises.map(cardioExercise => 
                    cardioExercise.CardioExerciseID === updatedCardio.CardioExerciseID ? updatedCardio : cardioExercise
                );
                setCardioExercises(updatedCardioExercise);
                setLoadingMessage('');
            } else {
                setLoadingMessage('Exercise could not be updated: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while updating the exercise:', err);
            setLoadingMessage('An error occurred while updating the exercise.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRoutineClick = (routine) => {
        setSelectedRoutine(routine);
        console.log('clicked: ', routine);
        const routineDetailsURL = `/routines/${routine.RoutineID}`;
        navigate(routineDetailsURL);
    };

    // Handler function to handle routine selection
    const handleRoutineSelect = (routine) => {
        console.log('selected routine: ', routine);
        setSelectedRoutine(routine);
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
                setRoutines(routines.filter(routine => 
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

    const deleteCardioExercise = async (cardioToDelete) => {
        console.log('body = ', cardioToDelete); 
        console.log('user ID = ', cardioToDelete.UserID); 
        console.log('exercise ID = ', cardioToDelete.CardioExerciseID); 

        if (!window.confirm('Are you sure you want to delete this exercise and all of its exercises?')) return;

        setLoadingMessage('Deleting exercise...');
        try {
            const response = await API.delete(`/cardioexercises/${cardioToDelete}/1`);
            if (response.isSuccess) {
                setCardioExercises(cardioExercises.filter(cardioExercise => 
                    cardioExercise.CardioExerciseID !== cardioToDelete.CardioExerciseID
                ));
                setLoadingMessage('');
                console.log('exercise deleted successfully'); 

            } else {
                setLoadingMessage('Exercise could not be deleted: ' + response.message);
            }
        } catch (err) {
            console.error('An error occurred while deleting the exercise:', err);
            setLoadingMessage('An error occurred while deleting the exercise.');
        }
    };

    const filteredExercises = exercises.filter(exercise => exercise.ExerciseTypeID === 3);

    const toggleSortByTime = () => {
        setSortByTime(!sortByTime);
    };

    const toggleSortByDistance = () => {
        setSortByDistance(!sortByDistance);
    };

    const filteredCardioExercises = () => {
        if (sortByTime) {
            const sortedExercises = [...cardioExercises];
            return sortedExercises.sort((a, b) => a.Duration - b.Duration);
        }
        return cardioExercises;
    };

    const filteredDistanceCardioExercises = () => {
        if (sortByDistance) {
            const sortedExercises = [...cardioExercises];
            return sortedExercises.sort((a, b) => b.Distance - a.Distance);
        }
        return cardioExercises;
    };

    // View --------------------------------------------------
    return (
        <div className='profile-page'>
            <h1>My Profile</h1>
            {loadingMessage && <p>{loadingMessage}</p>}
            {profile && (
                <div className='profile-details-container'>
                    <div className='profile-details'>
                        <p><br /><img src={profile.ProfileURL} alt='Profile' /></p>
                        <p><strong>Name:</strong> {profile.ProfileName}</p>
                        <p><strong>Goals:</strong> {profile.ProfileGoals}</p>
                        <p><strong>Interests:</strong> {profile.ProfileInterests}</p>
                        <div className='button-container'>
                            <button onClick={toggleModal} className='edit-button'> Edit Personal Details</button>
                            <button onClick={() => setShowRoutineForm(true)} className='routine-record-button'>Create Custom Routine</button>
                        </div>
                    </div>
                </div>
            )}
            {routines && (
                <div className='routine-details-container'>
                    <h2>My Routines</h2>
                    <RoutineList 
                    routines={routines} 
                    onItemClick={handleRoutineClick} 
                    onSubmit={addRoutine} 
                    onUpdate={handleRoutineUpdate}
                    handleRoutineSelect={handleRoutineSelect}  
                    onDelete={deleteRoutine}                  
                    />
                </div>
            )}
            {modalOpen && (
                <Modal onClose={toggleModal}>
                    <form onSubmit={handleFormSubmit}>
                        <label>Name:</label>
                        <input name='ProfileName' value={profile.ProfileName} onChange={handleInputChange} />
                        <label>Goals:</label>
                        <input name='ProfileGoals' value={profile.ProfileGoals} onChange={handleInputChange} />
                        <label>Interests:</label>
                        <input name='ProfileInterests' value={profile.ProfileInterests} onChange={handleInputChange} />
                        <label>Profile URL:</label>
                        <input name='ProfileURL' value={profile.ProfileURL} onChange={handleInputChange} />
                        <button type='submit' className='modal-save-button'>Save Changes</button>
                    </form>
                </Modal>
            )}
            {showRoutineForm && (
                <Modal onClose={() => setShowRoutineForm(false)}>
                    <RoutineForm 
                    routineExercises={routineExercises} 
                    onSubmit={addRoutine} 
                    onCancel={() => setShowRoutineForm(false)} />
                </Modal>
            )}
            {userExercises && (
                <div>
                    <h2>Progress Chart</h2>
                    <WeightProgressChart 
                    userExercises={userExercises} 
                    exercises={filteredExercises}/>
                    <div className='fitness-details-container'>
                    <h2>Fitness Times</h2>
                    <button onClick={toggleSortByTime} className='time-button'>
                        {sortByTime ? 'See All' : 'Fastest Time'}
                    </button>
                    <button onClick={toggleSortByDistance} className='time-button'>
                        {sortByDistance ? 'See All' : 'Longest Distance'}
                    </button>
                    <CardioList
                    cardioExercises={sortByDistance ? filteredDistanceCardioExercises() : filteredCardioExercises()} 
                    exercises={exercises}
                    onUpdate={handleCardioExerciseUpdate}
                    onDelete={deleteCardioExercise}
                    />
                    </div>
                </div>
                
            )}
           
        </div>
    );
}

export default ProfilePage;
