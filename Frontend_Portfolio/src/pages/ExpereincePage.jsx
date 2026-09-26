import Experience from '../components/Experience';
import styles from './ExperiencesPage.module.css';

const ExperiencesPage = () => {
  return (
    <div className={styles.sheet}>
      <h1 className={styles.sectionHead}>I. Experience</h1>
      <hr className={styles.sectionRule} />

      <p className={styles.lead}>
        <span className={styles.leadLabel}>Summary&mdash;</span>
        I have been building ML systems that run in production for about four
        years. Fintech first, then telecom, now banking. Most of the work is
        retrieval, agents, and fraud models, plus the evaluation and monitoring
        you need before any of it is allowed near real users.
      </p>

      <Experience />
    </div>
  );
};

export default ExperiencesPage;
