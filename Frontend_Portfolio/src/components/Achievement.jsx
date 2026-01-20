import styles from './Achievement.module.css';

const Achievement = () => {
  return (
    <div className={styles.paper}>
      <h1 className={styles.title}>The Developer Times</h1>
      <h2 className={styles.subtitle}>Featured Achievements</h2>

      <div className={styles.grid}>
        {/* 🏅 Certifications */}
        <div className={styles.article}>
          <h3 className={styles.headline}>Certified in AWS Cloud Architecting</h3>
          <p className={styles.date}>Issued by AWS, April 2025</p>
          <p className={styles.body}>
            Completed the AWS Academy Cloud Architecting course with distinction. Learned EC2, VPCs, RDS, IAM, Auto Scaling, CloudFormation, and more.
          </p>
        </div>

        {/* 🧠 Hackathons */}
        <div className={styles.article}>
          <h3 className={styles.headline}>Winner – Quinnipiac Ransomware Hackathon</h3>
          <p className={styles.date}>March 2025</p>
          <p className={styles.body}>
            Took the role of CISO and led a winning strategy in the cybersecurity hackathon conducted by Quinnipiac and Hartford HealthCare.
          </p>
        </div>

        {/* 🎤 Interview / Feature */}
        <div className={styles.article}>
          <h3 className={styles.headline}>Featured on CodeCast with John Carmack</h3>
          <p className={styles.date}>Interviewed April 2025</p>
          <p className={styles.body}>
            Discussed emerging trends in AI + cybersecurity and shared insights from my research into XSS vulnerability detection with LLMs.
          </p>
        </div>

        {/* 🛠 Add more articles as needed */}
      </div>
    </div>
  );
};

export default Achievement;
