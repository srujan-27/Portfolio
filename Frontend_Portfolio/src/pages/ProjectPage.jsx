import { useParams, Link } from 'react-router-dom';
import { projects, getProject } from '../data/projects';
import styles from './ProjectPage.module.css';

const embedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtu.be/')) {
    return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
  }
  if (url.includes('youtube.com/watch')) {
    const id = new URLSearchParams(url.split('?')[1]).get('v');
    return id ? `https://www.youtube.com/embed/${id}` : '';
  }
  if (url.includes('youtube.com/embed/')) return url;
  return '';
};

const Table = ({ table, number, caption }) => (
  <figure className={styles.figure}>
    <table className={styles.table}>
      <thead>
        <tr>
          {table.columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={row[0]} className={i === table.highlightRow ? styles.best : ''}>
            {row.map((cell, j) => (
              <td key={`${row[0]}-${j}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <figcaption className={styles.caption}>
      <span className={styles.capNum}>Table {number}.</span> {caption}
    </figcaption>
  </figure>
);

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <div className={styles.sheet}>
        <h1 className={styles.notFound}>No project at this address.</h1>
        <Link to="/projects" className={styles.backLink}>
          Back to Section II
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    year,
    tagline,
    summary,
    architecture,
    metrics,
    criteria,
    techStack,
    features,
    tradeoffs,
    takeaway,
    links,
  } = project;

  const related = projects.filter((p) => p.slug !== slug);
  let sectionNo = 0;
  const next = () => {
    sectionNo += 1;
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][sectionNo - 1];
  };

  return (
    <article className={styles.sheet}>
      <Link to="/projects" className={styles.backLink}>
        &larr; Section II. Projects
      </Link>

      <header className={styles.titleBlock}>
        <h1 className={styles.paperTitle}>{title}</h1>
        <p className={styles.affiliation}>
          {category} &middot; {year}
        </p>
        <p className={styles.tagline}>{tagline}</p>

        <div className={styles.contact}>
          {links.live && (
            <a href={links.live} target="_blank" rel="noreferrer">
              Live app
            </a>
          )}
          {links.code && (
            <a href={links.code} target="_blank" rel="noreferrer">
              Source
            </a>
          )}
        </div>
      </header>

      {summary && (
        <p className={styles.abstract}>
          <span className={styles.label}>Abstract&mdash;</span>
          {summary}
        </p>
      )}

      {links.video && (
        <div className={styles.playerWrapper}>
          <iframe
            src={embedUrl(links.video)}
            title={`${title} demo`}
            className={styles.player}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {metrics && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>{next()}. Results</h2>
          <Table table={metrics} number="I" caption={metrics.caption} />
          {criteria && (
            <Table table={criteria} number="II" caption={criteria.caption} />
          )}
        </section>
      )}

      {architecture.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>{next()}. Method</h2>
          <ol className={styles.steps}>
            {architecture.map((stage) => (
              <li key={stage.step}>
                <span className={styles.stepName}>{stage.step}.</span>{' '}
                {stage.detail}
              </li>
            ))}
          </ol>
        </section>
      )}

      {tradeoffs && tradeoffs.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>{next()}. Discussion</h2>
          {tradeoffs.map((item) => (
            <div key={item.title} className={styles.note}>
              <p>
                <span className={styles.noteTitle}>{item.title}.</span>{' '}
                {item.detail}
              </p>
            </div>
          ))}
        </section>
      )}

      {features.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>{next()}. Capabilities</h2>
          <ul className={styles.list}>
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>{next()}. Implementation</h2>
        <dl className={styles.stack}>
          {Object.entries(techStack)
            .filter(([, items]) => items.length > 0)
            .map(([group, items]) => (
              <div key={group} className={styles.stackRow}>
                <dt>{group}</dt>
                <dd>{items.join(', ')}</dd>
              </div>
            ))}
        </dl>
      </section>

      {takeaway && (
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>{next()}. Conclusion</h2>
          <p className={styles.conclusion}>{takeaway}</p>
        </section>
      )}

      {related.length > 0 && (
        <footer className={styles.related}>
          <span className={styles.relatedLabel}>See also</span>
          {related.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`}>
              {p.title}
            </Link>
          ))}
        </footer>
      )}
    </article>
  );
};

export default ProjectPage;
