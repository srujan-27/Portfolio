import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li><Link to="/experiences">Experiences</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
        </nav>

    );
};

export default Navbar;
