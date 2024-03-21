import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/API';

function UserProfileView() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading profile...');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/profiles/${profileId}`);
        if (response.isSuccess && response.result) {
          setProfile(response.result);
          setLoadingMessage('');
        } else {
          setLoadingMessage(response.message || 'Failed to load profile.');
        }
      } catch (error) {
        setLoadingMessage('An error occurred while fetching profile data.');
      }
    };
    fetchProfile();
  }, [profileId]);

  return (
    <div>
      <h1>User Profile</h1>
      {loadingMessage ? (
        <p>{loadingMessage}</p>
      ) : profile ? (
        <div>
          <p><strong>Name:</strong> {profile.ProfileName}</p>
          <p><strong>Goals:</strong> {profile.ProfileGoals}</p>
          <p><strong>Interests:</strong> {profile.ProfileInterests}</p>
          <img src={profile.ProfileURL} alt={profile.ProfileName} />
        </div>
      ) : (
        <p>Profile not found.</p>
      )}
    </div>
  );
}

export default UserProfileView;
