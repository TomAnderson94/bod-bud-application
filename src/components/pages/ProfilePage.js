import { useEffect, useState } from "react";
import API from '../api/API.js';
import Modal from "../UI/Modal.js";
import './ProfilePage.css';
import RoutineForm from "../entities/RoutineForm.js";

function ProfilePage() {
    // Initialisation ----------------------------------------
    const userID = 1; // Hardcoded for demonstration purposes
    const endpoint = `/profiles/${userID}`;
    const routinesEndpoint = `/routines`;
    const exerciseEndpoint = `/exercises`;



    // State -------------------------------------------------
    const [profile, setProfile] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading profile...');
    const [modalOpen, setModalOpen] = useState(false);
    const [showRoutineForm, setShowRoutineForm] = useState(false);
    const [exercises, setExercises] = useState([]);
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

    const fetchExercises = async () => {
        try {
            const response = await API.get(exerciseEndpoint);
            if (response.isSuccess) {
                setExercises(response.result);
            } else {
                setLoadingMessage('Failed to load exercises: ' + response.message);
            }
        } catch (err) {
            setLoadingMessage('An error occurred while fetching exercises: ' + err.message);
        }
    };

    const fetchRoutines = async (routinesEndpoint) => {
        try {
            const response = await API.get(routinesEndpoint);
            console.log(response); // Log the response

            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the routine
                setRoutines(response.result[0]);
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
        fetchExercises();
    }, [exerciseEndpoint]);

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
    const handleRoutineFormSubmit = async (e) => {
        console.log(e);
        try {
            // Submit updated routine to backend
            const response = await API.put(routinesEndpoint, routines);
            if (response.isSuccess) {
                toggleModal(); // Close the modal
                fetchRoutines(); // Refresh routines details
            } else {
                alert('Failed to update routines');
            }
        } catch (error) {
            alert("An error occurred while creating custom routine");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                    <RoutineForm exercises={exercises} onSubmit={handleRoutineFormSubmit} onCancel={() => setShowRoutineForm(false)} />
                </Modal>
            )}
        </div>
    );
}

export default ProfilePage;
