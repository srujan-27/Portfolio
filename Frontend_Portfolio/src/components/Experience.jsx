import { useState } from 'react';
import { experience } from '../data/experience';
import styles from './Experience.module.css';

const romans = ['A', 'B', 'C', 'D', 'E'];

const Experience = () => {
  const [selected, setSelected] = useState('all');

  const roles =
    selected === 'all'
      ? experience
      : experience.filter((role) => role.company === selected);

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <button
          type="button"
          className={`${styles.filter} ${selected === 'all' ? styles.active : ''}`}
          onClick={() => setSelected('all')}
        >
          All
        </button>
        {experience.map((role) => (
          <button
            key={role.slug}
            type="button"
            className={`${styles.filter} ${
              selected === role.company ? styles.active : ''
            }`}
            onClick={() => setSelected(role.company)}
          >
            {role.company}
          </button>
        ))}
      </div>

      {roles.map((role, i) => (
        <section key={role.slug} className={styles.entry}>
          <h2 className={styles.subhead}>
            <span className={styles.subNum}>{romans[i]}.</span>
            {role.role}, {role.company}
          </h2>

          <p className={styles.meta}>
            {role.start} &ndash; {role.end} &middot; {role.location}
            {role.current && <span className={styles.current}>Current</span>}
          </p>

          {role.summary && <p className={styles.summary}>{role.summary}</p>}

          <ol className={styles.points}>
            {role.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          {role.stack.length > 0 && (
            <p className={styles.stack}>
              <span className={styles.stackLabel}>Stack&mdash;</span>
              {role.stack.join(', ')}.
            </p>
          )}
        </section>
      ))}
    </div>
  );
};

export default Experience;
