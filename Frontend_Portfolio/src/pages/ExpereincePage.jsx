import { useEffect, useState } from 'react';
import Experience from '../components/Experience';
import styles from './ExperiencesPage.module.css';
import netflixIntro from '../assests/Netflix.mp4';

const ExperiencesPage = () => {
    const [showVideo, setShowVideo] = useState(true);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [inMyList, setInMyList] = useState(false);
    const [shareMessage, setShareMessage] = useState('↗ Share');

    // ============================================
    // SKIP INTRO + AUTO-SKIP TIMERS
    // ============================================
    useEffect(() => {
        // Show skip button after 1.5 seconds
        const skipTimer = setTimeout(() => {
            setShowSkipButton(true);
        }, 1500);

        // Auto-skip after 4 seconds (fallback if user doesn't click)
        const autoSkipTimer = setTimeout(() => {
            setShowVideo(false);
        }, 4000);

        return () => {
            clearTimeout(skipTimer);
            clearTimeout(autoSkipTimer);
        };
    }, []);

    // ============================================
    // MY LIST - persists with localStorage
    // ============================================
    // On page load, check if user previously added to "My List"
    useEffect(() => {
        const saved = localStorage.getItem('myList');
        if (saved === 'true') {
            setInMyList(true);
        }
    }, []);

    const handleMyList = () => {
        const newValue = !inMyList;
        setInMyList(newValue);
        localStorage.setItem('myList', newValue);
    };

    // ============================================
    // WATCH NOW - smooth scrolls to Episodes
    // ============================================
    const handleWatchNow = () => {
        document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' });
    };

    // ============================================
    // SHARE - copies portfolio link to clipboard
    // ============================================
    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShareMessage('✓ Link Copied!');
            // Reset button text back after 2 seconds
            setTimeout(() => setShareMessage('↗ Share'), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleSkipIntro = () => {
        setShowVideo(false);
    };

    // ============================================
    // VIDEO INTRO SCREEN
    // ============================================
    if (showVideo) {
        return (
            <div className={styles.videoContainer}>
                <video
                    src={netflixIntro}
                    autoPlay
                    muted
                    className={styles.video}
                    onEnded={() => setShowVideo(false)}
                />
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

    // ============================================
    // MAIN PAGE
    // ============================================
    return (
        <div className={styles.page}>

            <section className={styles.posterSection}>
                <div className={styles.posterContent}>
                    <h1>Code Chronicles: The Sai Srujan Saga</h1>

                    <p className={styles.tagline}>Coding the future, one project at a time</p>

                    <div className={styles.about}>
                        <p className={styles.match}>98% Match</p>
                        <p>2022 - Present</p>
                        <p className={styles.rating}>TV-PG</p>
                        <p className={styles.hdBadge}>HD</p>
                        <p>3 Seasons</p>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.watchButton} onClick={handleWatchNow}>
                            ▶ Watch Now
                        </button>

                        <button className={styles.watchButton} onClick={handleShare}>
                            {shareMessage}
                        </button>

                        {/* + / ✓ toggle like Netflix's "My List" - saved in localStorage */}
                        <button className={styles.watchButton} onClick={handleMyList}>
                            {inMyList ? '✓ My List' : '+ My List'}
                        </button>
                    </div>
                </div>
            </section>

            <div className={styles.second}>
                <p className={styles.secondabout}>
                    Follow the journey of Sai Srujan Vemula from his initial days as a computer
                    science enthusiast to becoming a pivotal player in the tech industry. This is
                    the story of coding marvels, AI innovations, and academic triumphs.
                </p>
                <p><span>Starring:</span> Sai Srujan Vemula</p>
                <p><span>Genres:</span> Drama · Technology · Educational</p>
            </div>

            <section className={styles.experiencesSection} id="episodes">
                <h2>Episodes</h2>
                <Experience />
            </section>
        </div>
    );
};

export default ExperiencesPage;