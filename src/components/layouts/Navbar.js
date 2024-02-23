import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {

    // Methods ------------------------------------------

    const getLinkStyle = ({ isActive }) => ( isActive ? 'navSelected' : null);

    // View ---------------------------------------------
    return (
        <nav>
            <div className="navItem">
                <NavLink to='/exerciser-dashboard' className={getLinkStyle}>Home</NavLink>
            </div>   
            <div className="navItem">
                <NavLink to='/myprofile' className={getLinkStyle}>MyProfile</NavLink>
            </div>  
            <div className="navItem">
                <NavLink to='/contact' className={getLinkStyle}>MyFriends</NavLink>
            </div>                 
            <div className="navItem">
                <NavLink to='/strengthtraining' className={getLinkStyle}>Strength Training</NavLink>
            </div>     
            <div className="navItem">
                <NavLink to='/login' className={getLinkStyle}>Login</NavLink>
            </div>                      
        </nav>
    )
}

export default Navbar;
