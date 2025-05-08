import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.mainTitle}>Welcome to Sai Srujan's Portfolio</h1>
            <p className={styles.subtitle}>Explore my journey through Experiences and Achievements</p>
            <Link to="/experiences">
                <button className={styles.ctaButton}>View Experiences</button>
            </Link>
        </div>
    );
};

export default Home;
