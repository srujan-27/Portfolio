import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.runningHead}>
      <Link to="/" className={styles.byline}>
        Vemula &mdash; AI/ML Engineer
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/experiences"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Experience
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Credentials
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
