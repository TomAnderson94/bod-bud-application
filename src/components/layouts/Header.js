import './Header.css';
import { Link } from 'react-router-dom';

function Header() {

    // View --------------------------------------------------
    return (
        <header>
                <h1 className='title'>Bod</h1>            
            <Link to="/">
            <img width="50" height="50" src="https://img.icons8.com/ios/50/flex-biceps.png" alt="flex-biceps" />
            </Link>
            <Link to="/">
                <h1>Bud</h1>
            </Link>
            <div className="login">
                <p>Welcome Tom!</p>
            </div>
        </header>

    );
}
// https://icons8.com/icon/ZKIz38iQL8IV/muscle
// single arm flex icon: "https://img.icons8.com/windows/32/flex-biceps.png"
// <img width="50" height="50" src="https://img.icons8.com/ios/50/flex-biceps.png" alt="flex-biceps"/>
// https://icons8.com/icon/7318/muscle

export default Header;
