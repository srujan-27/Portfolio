// React loads --> useEffect() runs --> calls fetchExperiences()
//     ↓
// axios gets experiences data from backend
//     ↓
// setExperiences(data)
//     ↓
// React automatically updates the screen with experience cards

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Experience.module.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('https://portfolio-production-bc43.up.railway.app/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);



  if (experiences.length === 0) {
    return <p className={styles.loading}>Loading experiences...</p>;
  }

  const sortedExperiences = () => {
  // Create a copy before sorting (to avoid mutating state)
  return [...experiences].sort((a, b) => {
    // Parse dates and sort by start date (newest first)
    return new Date(b.startDate) - new Date(a.startDate);
    
    // OR if you want oldest first:
    // return new Date(a.startDate) - new Date(b.startDate);
  });
};

  return (
    <div className={styles.container}>
      {sortedExperiences().map((exp) => (
        <div key={exp._id} className={styles.seasonCard}>
          <h2 className={styles.seasonTitle}>Season: {exp.company}</h2>
          <p className={styles.seasonDescription}>
            {exp.role} - {exp.location} ({exp.startDate} to {exp.endDate})
          </p>

          <div className={styles.episodesContainer}>
            {exp.description.map((point, index) => (
              <div key={index} className={styles.episodeCard}>
                <div className={styles.thumbnail}></div> 
                <div className={styles.episodeInfo}>
                  <h3>Episode {index + 1}</h3>
                  <p>{point}</p>
                  <div className={styles.episodeMeta}>
                    <span>59m</span>
                    <span>⭐ 9.{index}</span> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;

