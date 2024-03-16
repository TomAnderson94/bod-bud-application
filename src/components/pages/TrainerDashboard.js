import React from "react";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/API";
import SearchBar from "../entities/SearchBar";
import './TrainerDashboard.css';
import RoutineList from "../entities/RoutineList";

function TrainerDashboard() {


    const profilesEndpoint = '/profiles';
    const routinesEndpoint ='/routines/1';
    const navigate = useNavigate();

    // State -------------------------------------------------
    const [loadingMessage, setLoadingMessage] = useState('Loading records...');
    const [profiles, setProfiles] = useState([]);
    const [routines, setRoutines] = useState([]);


    // Methods -----------------------------------------------
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

    const fetchRoutines = async () => {
        try {
            const response = await API.get(`/routines/1`);
            if (response.isSuccess && response.result.length > 0) {
                setRoutines(response.result);
                console.log("routines GET result: ", response.result);
                setLoadingMessage('');
            } else {
                setLoadingMessage(response.message || 'Failed to load routines.');
            }
        } catch (error) {
            setLoadingMessage("An error occurred while fetching routines data.")
        }
    };

    useEffect(() => {
        fetchProfile(profilesEndpoint);
    }, [profilesEndpoint]); 

    useEffect(() => {
        fetchRoutines(routinesEndpoint);
    }, [routinesEndpoint]); 

    // Handlers ----------------------------------------------
    const handleProfileClick = (profileID) => {
        navigate(`/myprofile/${profileID}`);
        console.log("endpoint id: ", `/myprofile/${profileID}`);
    };

    const handleSearch = (searchQuery) => {
        const matchingProfile = profiles.find(profile => profile.ProfileName.toLowerCase() === searchQuery.toLowerCase());
        console.log("search is: ", searchQuery);
        if (matchingProfile) {
            navigate(`/myprofile/${matchingProfile.ProfileID}`)
        } else {
            alert("Profile not found")
        }
    };

    // View --------------------------------------------------
    return (
    <div className="trainer-dashboard">
    <h1>Trainer Dashboard</h1>
    <SearchBar onSearch={handleSearch} />
        {!profiles
            ? (<p>{loadingMessage}</p>)
            : profiles.length === 0
                ? (<p> No clients found</p>)

                : (<div className="trainer-card-container">
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
                <div className="custom-plans">

                    {routines && (
                    <div className="routine-details-container">
                    <h2>Custom Plans</h2>                        
                    <RoutineList 
                        routines={routines}                
                        />
                    </div>
                )}                    
                </div>
        </div>
    );
}

export default TrainerDashboard;
