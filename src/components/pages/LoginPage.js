import { useState } from 'react';
import API from '../api/API';
import './LoginPage.css';


function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await API.post('/login', { username, password});
            if (response.isSuccess) {
                onLoginSuccess(response.token); // Assuming the backend sends a token??
            } else {
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred.')
        }
    };

   return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>

            {errorMessage && <p>{errorMessage}</p>}
        </form>
    </>);
}



 

export default Login;
