import { useEffect, useState } from 'react';
import Experience from '../components/Experience';
import styles from './ExperiencesPage.module.css';
import netflixIntro from '../assests/Netflix.mp4';

const ExperiencesPage = () => {
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(false);
        }, 4000); // 4 sec intro video 
        return () => clearTimeout(timer);
    }, []);

    if (showVideo) {
        return (
            <div className={styles.videoContainer}>
                <video
                    src={netflixIntro}
                    autoPlay
                    className={styles.video}
                    onEnded={() => setShowVideo(false)}
                />
            </div>
        );
    }

    return (
        <div className={styles.page}>
          
            <section className={styles.posterSection}>
                <div className={styles.posterContent}>
                    <h1>Code Chronicles: The Sai Srujan Saga</h1>
                    
                    <p className={styles.tagline}>Coding the future, one project at a time</p>
                    <div className={styles.about}>
                    <p className={styles.match}>98% Match</p>
                    <p>2022-2025</p>
                    <p>TV-PG</p>
                    </div>
                   
                   <div className={styles.buttons}>
                   <a href="./assests/Sai_Srujan_Resume.pdf" download="Sai_Srujan_Resume.pdf" target='_blank'>
                   <button className={styles.watchButton}>Watch Now ▷</button> </a>
                   <button className={styles.watchButton}>Share</button>
                   <button className={styles.watchButton} onClick={() => alert('Thanks for visiting! You’re awesome! ')}>-`♡´-</button>

                   </div>

                </div>
            </section>

            <div className={styles.second}>
            <p className={styles.secondabout}>
            Follow the journey of Sai Srujan Vemula from his initial days as a computer science enthusiast to becoming a pivotal player in the tech industry. This is the story of coding marvels, AI innovations, and academic triumphs.
            </p>
            <p>
            <span>Starring:</span> Sai Srujan Vemula
            </p>
            <p>
            <span>Drama Technology Educational</span>
            </p>
            </div>

           
            <section className={styles.experiencesSection}>
                <h2>Episodes</h2>
                <Experience />
            </section>
        </div>
    );
};

export default ExperiencesPage;
