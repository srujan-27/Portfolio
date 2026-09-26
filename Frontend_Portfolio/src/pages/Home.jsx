import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.sheet}>
      <div className={styles.titleBlock}>
        <h1 className={styles.paperTitle}>
          Building Retrieval and Agent Systems That Survive Production
        </h1>
        <p className={styles.author}>Sai Srujan Vemula</p>
        <p className={styles.affiliation}>
          AI/ML Engineer, M&amp;T Bank &mdash; Bridgeport, Connecticut
        </p>

        <div className={styles.contact}>
          <a href="mailto:srujanvemula273@gmail.com">Email</a>
          <a href="https://github.com/srujan-27" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sai-srujan-2002/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com/@srujanvemula275"
            target="_blank"
            rel="noreferrer"
          >
            Medium
          </a>
          <a href="/Sai_Srujan_Vemula_Resume.pdf" target="_blank" rel="noreferrer">
                Resume
          </a>      
        </div>
      </div>

      <p className={styles.abstract}>
        <span className={styles.label}>Abstract&mdash;</span>
        I build machine learning systems that run in production. Right now that
        means a multi-agent RAG platform at M&amp;T Bank, where I took retrieval
        precision from 72% to 91% for 400+ internal users. Before this I worked on
        support automation at Charter and real-time fraud detection at M2P
        Fintech. My thesis benchmarked GPT-4o, Gemini 2.5 Flash, and DeepSeek on
        security abuse case generation, and found that a 64K-context model beat a
        900K one, because what you put in the window matters more than how big it
        is.
      </p>

      <p className={styles.keywords}>
        <span className={styles.label}>Index Terms&mdash;</span>
        RAG, agentic AI, LLM evaluation, fraud detection, MLOps, model risk.
      </p>

      <nav className={styles.contents}>
        <Link to="/experiences" className={styles.tocItem}>
          <span className={styles.tocNum}>I.</span>
          <span className={styles.tocBody}>
            <span className={styles.tocLabel}>Experience</span>
            <span className={styles.tocNote}>
              Four years across fintech, telecom, and banking
            </span>
          </span>
        </Link>

        <Link to="/projects" className={styles.tocItem}>
          <span className={styles.tocNum}>II.</span>
          <span className={styles.tocBody}>
            <span className={styles.tocLabel}>Projects</span>
            <span className={styles.tocNote}>
              Thesis benchmark and a RAG pipeline, with results
            </span>
          </span>
        </Link>

        <Link to="/achievements" className={styles.tocItem}>
          <span className={styles.tocNum}>III.</span>
          <span className={styles.tocBody}>
            <span className={styles.tocLabel}>Credentials</span>
            <span className={styles.tocNote}>
              Research, certifications, and education
            </span>
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
