import Header from './Header.js';
import Footer from './Footer.js';
import Navbar from './Navbar.js';

import './Layout.css';

function Layout(props) {

return (
    <div className="centrepane">
        <Header />
        <Navbar />
        <main>
            {props.children}
        </main>
        <Footer />
    </div>
)
}

export default Layout;
