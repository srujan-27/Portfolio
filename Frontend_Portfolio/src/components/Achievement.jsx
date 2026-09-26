import { Link } from 'react-router-dom';
import { achievements } from '../data/achievements';
import styles from './Achievement.module.css';
import hackathonPhoto from '../assests/hackathon_win.jpg';

const images = { hackathon: hackathonPhoto };

const Achievement = () => {
  const featured = achievements.find((a) => a.featured);
  const certs = achievements.filter((a) => a.category === 'Certification');
  const education = achievements.filter((a) => a.category === 'Education');
  const other = achievements.filter(
    (a) =>
      !a.featured &&
      a.category !== 'Certification' &&
      a.category !== 'Education'
  );

  const renderLink = (item) => {
    if (!item.link) return null;
    if (item.internal) {
      return (
        <Link to={item.link} className={styles.inlineLink}>
          {item.linkText || 'Read more'}
        </Link>
      );
    }
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className={styles.inlineLink}
      >
        {item.linkText || 'Read more'}
      </a>
    );
  };

  return (
    <div className={styles.sheet}>
      <h1 className={styles.sectionHead}>III. Credentials</h1>
      <hr className={styles.sectionRule} />

      {featured && (
        <section className={styles.block}>
          <h2 className={styles.subhead}>
            <span className={styles.subNum}>A.</span>Research
          </h2>

          <p className={styles.citation}>
            Vemula, S. S. &ldquo;{featured.title}.&rdquo; {featured.context},{' '}
            {featured.date}.
          </p>

          <p className={styles.body}>{featured.detail}</p>

          {featured.tags.length > 0 && (
            <p className={styles.keywords}>
              <span className={styles.label}>Index Terms&mdash;</span>
              {featured.tags.join(', ')}.
            </p>
          )}

          {renderLink(featured)}
        </section>
      )}

      {other.length > 0 && (
        <section className={styles.block}>
          <h2 className={styles.subhead}>
            <span className={styles.subNum}>B.</span>Awards and Writing
          </h2>

          {other.map((item) => (
            <div key={item.id} className={styles.item}>
              <p className={styles.itemHead}>
                {item.title}
                <span className={styles.itemMeta}>
                  {item.context}
                  {item.date ? ` \u00b7 ${item.date}` : ''}
                </span>
              </p>

              {item.image && images[item.image] && (
                <figure className={styles.figure}>
                  <img
                    src={images[item.image]}
                    alt={item.title}
                    className={styles.photo}
                  />
                  <figcaption className={styles.caption}>
                    <span className={styles.capNum}>Fig. 1.</span>{' '}
                    {item.context}, {item.date}.
                  </figcaption>
                </figure>
              )}

              {item.detail && <p className={styles.body}>{item.detail}</p>}
              {renderLink(item)}
            </div>
          ))}
        </section>
      )}

      <section className={styles.block}>
        <h2 className={styles.subhead}>
          <span className={styles.subNum}>C.</span>Certifications
        </h2>

        <figure className={styles.figure}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Issuer</th>
                <th>Credential</th>
              </tr>
            </thead>
            <tbody>
              {certs.map((cert) => (
                <tr key={cert.id}>
                  <td>{cert.context.split(',')[0]}</td>
                  <td>
                    {cert.link ? (
                      <a href={cert.link} target="_blank" rel="noreferrer">
                        {cert.title}
                      </a>
                    ) : (
                      cert.title
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <figcaption className={styles.caption}>
            <span className={styles.capNum}>Table I.</span> Certifications held.
          </figcaption>
        </figure>
      </section>

      <section className={styles.block}>
        <h2 className={styles.subhead}>
          <span className={styles.subNum}>D.</span>Education
        </h2>

        {education.map((item) => (
          <div key={item.id} className={styles.item}>
            <p className={styles.itemHead}>
              {item.title}
              <span className={styles.itemMeta}>
                {item.context}
                {item.date ? ` \u00b7 ${item.date}` : ''}
              </span>
            </p>
            {item.detail && <p className={styles.body}>{item.detail}</p>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Achievement;
