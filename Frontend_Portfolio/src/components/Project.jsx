import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import styles from './Project.module.css';

const letters = ['A', 'B', 'C', 'D'];

const Project = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sheet}>
      <h1 className={styles.sectionHead}>II. Projects</h1>
      <hr className={styles.sectionRule} />

      <p className={styles.lead}>
        <span className={styles.leadLabel}>Summary&mdash;</span>
        Two things I built while working with LLMs. The first is my thesis, where
        I benchmarked three models against each other. The second is a RAG app I
        wrote to understand retrieval properly.
      </p>

      {projects.map((project, i) => (
        <section key={project.slug} className={styles.entry}>
          <h2 className={styles.subhead}>
            <span className={styles.subNum}>{letters[i]}.</span>
            {project.title}
          </h2>

          <p className={styles.meta}>
            {project.category} &middot; {project.year}
          </p>

          <p className={styles.tagline}>{project.tagline}</p>

          {/* Only the thesis has measured results, so only it gets a table */}
          {project.metrics && (
            <figure className={styles.figure}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {project.metrics.columns.slice(0, 4).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.metrics.rows.map((row, r) => (
                    <tr
                      key={row[0]}
                      className={
                        r === project.metrics.highlightRow ? styles.best : ''
                      }
                    >
                      {row.slice(0, 4).map((cell, c) => (
                        <td key={`${row[0]}-${c}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption className={styles.caption}>
                <span className={styles.capNum}>Table I.</span> Weighted score out
                of 100. Blind evaluation, two expert reviewers, 27 outputs.
              </figcaption>
            </figure>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.readMore}
              onClick={() => navigate(`/project/${project.slug}`)}
            >
              Full write-up
            </button>
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Live app
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noreferrer">
                Source
              </a>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Project;
