import { useEffect, useState } from 'react';
import Experience from '../components/Experience';
import styles from './ExperiencesPage.module.css';
import netflixIntro from '../assests/Netflix.mp4';

const ExperiencesPage = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [showSkipButton, setShowSkipButton] = useState(false);

    // ============================================
    // FEATURE 1: SKIP INTRO BUTTON
    // ============================================
    // How it works:
    // - We use TWO useEffects here
    // - First one: Shows the "Skip Intro" button after 1.5 seconds
    // - Second one: Auto-skips the video after 4 seconds (your original code)
    // 
    // Why two separate states?
    // - showVideo: Controls whether video plays or main content shows
    // - showSkipButton: Controls whether the skip button is visible
    // 
    // The button only appears DURING the video (showVideo must be true)
    // and only AFTER 1.5 seconds (showSkipButton must be true)

    useEffect(() => {
        // Show skip button after 1.5 seconds
        const skipTimer = setTimeout(() => {
            setShowSkipButton(true);
        }, 1500);

        // Auto-skip after 4 seconds (fallback if user doesn't click)
        const autoSkipTimer = setTimeout(() => {
            setShowVideo(false);
        }, 4000);

        // Cleanup: Clear both timers if component unmounts
        // Why? If user navigates away, we don't want timers running in background
        return () => {
            clearTimeout(skipTimer);
            clearTimeout(autoSkipTimer);
        };
    }, []); // Empty array = run once on mount

    // Function to handle skip button click
    const handleSkipIntro = () => {
        setShowVideo(false);
    };

    // Render video intro screen
    if (showVideo) {
        return (
            <div className={styles.videoContainer}>
                <video
                    src={netflixIntro}
                    autoPlay
                    muted // Added muted for better autoplay support
                    className={styles.video}
                    onEnded={() => setShowVideo(false)}
                />
                
                {/* Skip Intro Button - Only shows after 1.5 seconds */}
                {showSkipButton && (
                    <button 
                        className={styles.skipButton}
                        onClick={handleSkipIntro}
                    >
                        Skip Intro ▶▶
                    </button>
                )}
            </div>
        );
    }

    // Main page content (after video ends or is skipped)
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
                        <a href="./assests/Sai_Srujan_Resume.pdf" download="Sai_Srujan_Resume.pdf" target='_blank' rel="noreferrer">
                            <button className={styles.watchButton}>▶ Watch Now</button>
                        </a>
                        <button className={styles.watchButton}>↗ Share</button>
                        <button className={styles.watchButton} onClick={() => alert('Thanks for visiting! You\'re awesome!')}>♡</button>
                    </div>
                </div>
            </section>

            <div className={styles.second}>
                <p className={styles.secondabout}>
                    Follow the journey of Sai Srujan Vemula from his initial days as a computer science enthusiast 
                    to becoming a pivotal player in the tech industry. This is the story of coding marvels, 
                    AI innovations, and academic triumphs.
                </p>
                <p><span>Starring:</span> Sai Srujan Vemula</p>
                <p><span>Genres:</span> Drama · Technology · Educational</p>
            </div>

           
            <section className={styles.experiencesSection}>
                <h2>Episodes</h2>
                <Experience />
            </section>
        </div>
    );
};

export default ExperiencesPage;