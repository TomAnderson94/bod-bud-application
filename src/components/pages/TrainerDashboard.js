import React from "react";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/API";

function TrainerDashboard() {

    const usersEndpoint = '/users';
    const profilesEndpoint = '/profiles';
    const navigate = useNavigate();


    const [users, setUsers] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');
    const [profiles, setProfiles] = useState([]);


    // Methods -----------------------------------------------
    const apiCall = async (usersEndpoint) => {
        const response = await API.get(usersEndpoint);
        console.log(response); // Log the response

        response.isSuccess
            ? setUsers(response.result)
            : setLoadingMessage(response.message) 
    };

    useEffect(() => { apiCall(usersEndpoint) }, [usersEndpoint]);

    const fetchProfile = async (profilesEndpoint) => {
        try {
            const response = await API.get(profilesEndpoint);
            if (response.isSuccess && response.result.length > 0) {
                // Assuming the first result is the profile
                setProfiles(response.result);
                console.log("profiles GET result: ", response.result); // Log the response
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load profile.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching profile data.")
        }
    };

    useEffect(() => {
        fetchProfile(profilesEndpoint);
    }, [profilesEndpoint]); 

    const handleProfileClick = (profileID) => {
        navigate(`/myprofile/${profileID}`);
        console.log("endpoint id: ", `/myprofile/${profileID}`);
    };

    // View --------------------------------------------------
    return (
    <div className="trainer-dashboard">
    <h1>Trainer</h1>
    {
      !profiles
        ? (<p>{loadingMessage}</p>)
        : profiles.length === 0
          ? (<p> No clients found</p>)

          : (<div className="card-container">
              {profiles.map((profile) => (
                <Card 
                key={profile.ProfileID}
                title={profile.ProfileName}
                imageURL={profile.ProfileURL}
                onClick={() => handleProfileClick(profile.ProfileID)}
                />
          ))}
          </div>
    )}
  </div>
);
}

export default TrainerDashboard;
