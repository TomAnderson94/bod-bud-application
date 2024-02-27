import { useEffect, useState } from "react";
import API from '../api/API.js';
import Modal from "../UI/Modal.js";
import './ProfilePage.css';
import RoutineForm from "../entities/RoutineForm.js";
import RoutineList from "../entities/RoutineList.js";

function ProfilePage() {
    // Initialisation ----------------------------------------
    const userID = 1; // Hardcoded for demonstration purposes
    const endpoint = `/profiles/${userID}`;
    const routinesEndpoint = `/routines`;
    const routineExercisesEndpoint = `/routineexercises`;



    // State -------------------------------------------------
    const [profile, setProfile] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading profile...');
    const [modalOpen, setModalOpen] = useState(false);
    const [showRoutineForm, setShowRoutineForm] = useState(false);
    const [routineExercises, setRoutineExercises] = useState([]);
    const [routines, setRoutines] = useState([]);

    const fetchProfile = async (endpoint) => {
        try {
            const response = await API.get(endpoint);
            console.log(response); // Log the response

            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the profile
                setProfile(response.result[0]);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load profile.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching profile data.")
        }
    };

    const fetchRoutineExercises = async () => {
        try {
            const response = await API.get(routineExercisesEndpoint);
            if (response.isSuccess) {
                setRoutineExercises(response.result);
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
                // Assuming the first result is the routine
                setRoutines(response.result);
                console.log("response.result: ", response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching routines data.")
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


    // Methods -----------------------------------------------
    const toggleModal = () => setModalOpen(!modalOpen);

    // Handlers ------------------------------------------------
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Submit updated profile to backend
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
            console.log("response = ", response); // Log the response
            console.log("newRoutine = ", newRoutine); 

            console.log("current routine list = ", routines); 
            console.log("selected routine ID = ", newRoutine.ExerciseExerciseID); 


            if (response.isSuccess) {
                // Add the new routine to the list of routines
                setRoutines([...routines, newRoutine]);
                setLoadingMessage(''); 
            } else {
                // If response does not have data, log error and update loading message
                setLoadingMessage('Routine could not be recorded: ' + response.message);
            }
        } catch (err) {
            // Log error and update loading message
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

  /*  const handleRoutineFormSubmit = async (e) => {
        console.log("form submit: ", e);
        try {
            // Submit updated routine to backend
            const response = await API.post(routinesEndpoint, routines);
            if (response.isSuccess) {
                toggleModal(); // Close the modal
                fetchRoutines(); // Refresh routines details
            } else {
                alert('Failed to update routines');
            }
        } catch (error) {
            alert("An error occurred while creating custom routine");
        }
    }; */

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRoutineClick = (routineID) => {
        console.log('Clicked Routine ID: ', routineID);

    };

    // View --------------------------------------------------
    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            {loadingMessage && <p>{loadingMessage}</p>}
            {profile && (
                <div className="profile-details">
                    <p><br /><img src={profile.ProfileURL} alt="Profile" /></p>
                    <p><strong>Name:</strong> {profile.ProfileName}</p>
                    <p><strong>Goals:</strong> {profile.ProfileGoals}</p>
                    <p><strong>Interests:</strong> {profile.ProfileInterests}</p>
                    <div>
                        <button onClick={toggleModal} className="edit-button"> Edit Personal Details</button>
                    </div>
                    <div>
                        <button onClick={() => setShowRoutineForm(true)} className="record-button">Create Custom Routine</button>
                    </div>
                </div>
            )}
            {routines && (
                <div>
                    <h2>My Routines</h2>
                    <RoutineList 
                    routines={routines} 
                    onItemClick={handleRoutineClick} 
                    onSubmit={addRoutine} 
                    onUpdate={handleRoutineUpdate}
                    />
                </div>
            )}
            {modalOpen && (
                <Modal onClose={toggleModal}>
                    <form onSubmit={handleFormSubmit}>
                        <label>Name:</label>
                        <input name="ProfileName" value={profile.ProfileName} onChange={handleInputChange} />
                        <label>Goals:</label>
                        <input name="ProfileGoals" value={profile.ProfileGoals} onChange={handleInputChange} />
                        <label>Interests:</label>
                        <input name="ProfileInterests" value={profile.ProfileInterests} onChange={handleInputChange} />
                        <label>Profile URL:</label>
                        <input name="ProfileURL" value={profile.ProfileURL} onChange={handleInputChange} />
                        <button type="submit" className="modal-save-button">Save Changes</button>
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
        </div>
    );
}

export default ProfilePage;
