import { useEffect, useState } from "react";
import API from '../api/API.js';
import Modal from "../UI/Modal.js";
import './ProfilePage.css';

function ProfilePage() {
    // Initialisation ----------------------------------------
    const userID = 1; // Hardcoded for demonstration purposes
    const endpoint = `/profiles/${userID}`;

    // State -------------------------------------------------
    const [profile, setProfile] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('Loading profile...');
    const [modalOpen, setModalOpen] = useState(false);

    const fetchProfile = async (endpoint) => {
        const response = await API.get(endpoint);
        console.log(response); // Log the response

        if (response.isSuccess && response.result.length > 0) {
            // Assuming the first result is the profile
            setProfile(response.result[0]);
            setLoadingMessage('');
        } else {
            setLoadingMessage(response.message || 'Failed to load profile.');
        }
    };

    useEffect(() => {
        fetchProfile(endpoint)
    }, [endpoint]); 


    // Methods -----------------------------------------------
    const toggleModal = () => setModalOpen(!modalOpen);

    // Handlers ------------------------------------------------
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Submit updated profile to backend
        const response = await API.put(`/profiles/${userID}`, profile);
        if (response.isSuccess) {
            toggleModal(); // Close the modal
            fetchProfile(endpoint); // Refresh profile details
        } else {
            alert('Failed to update profile');
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
                    <button onClick={toggleModal} className="edit-button"> Edit Personal Details</button>
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
        </div>
    );
}

export default ProfilePage;
