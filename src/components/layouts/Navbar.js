import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {

    // Methods ------------------------------------------
    const getLinkStyle = ({ isActive }) => ( isActive ? 'navSelected' : null);

    // View ---------------------------------------------
    return (
        <nav>
            <div className='navItem'>
                <NavLink to='/login' className={getLinkStyle}>Login</NavLink>
            </div>  
            <div className='navItem'>
                <NavLink to='/exerciser-dashboard' className={getLinkStyle}>Home</NavLink>
            </div>   
            <div className='navItem'>
                <NavLink to='/myprofile/1' className={getLinkStyle}>MyProfile</NavLink>
            </div>  
            <div className='navItem'>
                <NavLink to='/friends' className={getLinkStyle}>MyFriends</NavLink>
            </div>      
            <div className='navItem'>
                <NavLink to='/trainer-dashboard' className={getLinkStyle}>Trainer</NavLink>
            </div>             
            <div className='navItem'>
                <NavLink to='/strengthtraining' className={getLinkStyle}>Strength Training</NavLink>
            </div>         
            <div className='navItem'>
                <NavLink to='/cardioexercise' className={getLinkStyle}>Cardio</NavLink>
            </div>      
            <div className='navItem'>
                <NavLink to='/stretching' className={getLinkStyle}>StretchZone</NavLink>
            </div>      
            <div className='navItem'>
                <NavLink to='/rehabilitation' className={getLinkStyle}>Rehabilitation</NavLink>
            </div>                                   
        </nav>
    )
}

export default Navbar;
