import './Header.css';


function Header() {

    return (
        <header>
            <a>
                <img src= "https://img.icons8.com/ios-filled/50/000000/conference-call.png" alt="Icon showing group" />
            </a>
            <a>
                <h1>React First Build</h1>
            </a>
            <div className="login">
                <p>Welcome Tom!</p>
            </div>
        </header>

    )
}

export default Header;