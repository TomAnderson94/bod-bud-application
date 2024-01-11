import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';


function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Direct to different view based on the username
        if (username.includes('exerciser')) {
            navigate('/exerciser-dashboard');
        } else if (username.includes('trainer')) {
            navigate('/trainer-dashboard');
        } else if (username.includes('admin')) {
            navigate('/admin-dashboard');
        } else {
            alert('Invalid username');
        }
    };

   return (
    <div className ="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username   .exerciser/.trainer/.admin"
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
        </form>
    </div>
    );
}
 

export default Login;
