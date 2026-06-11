// ============================================
// NEWSPAPER-STYLE ACHIEVEMENTS COMPONENT
// ============================================
// Features:
// 1. Newspaper masthead with date
// 2. "Breaking News" ticker animation
// 3. Main headline (featured achievement)
// 4. Grid layout like newspaper columns
// 5. Category badges (Certification, Award, etc.)
// 6. "Print" animation on page load
// 7. Real credential links

import { useState, useEffect } from 'react';
import styles from './Achievement.module.css';
import hackathonPhoto from '../assests/hackathon_win.jpg'; // 

const Achievement = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ============================================
  // ACHIEVEMENTS DATA (matched to resume)
  // ============================================
  const achievements = [
    {
      id: 1,
      category: 'Award',
      headline: 'Cybersecurity Hackathon Champion',
      subheadline: 'Led Team to Victory at Quinnipiac Ransomware Challenge',
      date: 'March 2025',
      source: 'Quinnipiac University & Hartford HealthCare',
      content: 'Won first place in the cybersecurity hackathon by developing and presenting a comprehensive ransomware defense strategy. Took on the role of CISO, analyzed threats, designed incident response protocols, and presented solutions to industry judges.',
      featured: true,
      icon: '',
      image: hackathonPhoto,
      link: null,
      skills: ['Cybersecurity', 'Incident Response', 'Team Leadership']
    },
    {
      id: 2,
      category: 'Certification',
      headline: 'Google Cloud Professional Machine Learning Engineer',
      subheadline: 'Production ML Systems on Google Cloud',
      date: '2025',
      source: 'Google Cloud',
      content: 'Earned the Google Cloud Professional ML Engineer certification, validating expertise in designing, building, and productionizing machine learning models on GCP, including Vertex AI, ML pipelines, and responsible AI practices.',
      featured: false,
      icon: '',
      image: null,
      link: 'https://www.linkedin.com/in/sai-srujan-2002/details/certifications/',
      linkText: 'View Credential',
      skills: ['GCP', 'Vertex AI', 'MLOps']
    },
    {
      id: 3,
      category: 'Certification',
      headline: 'IBM AI Engineering Professional Certificate',
      subheadline: 'Deep Learning & AI Engineering Mastery',
      date: '2025',
      source: 'IBM / Coursera',
      content: 'Completed the IBM AI Engineering Professional Certificate, covering machine learning, deep learning with Keras, PyTorch, and TensorFlow, computer vision, and deploying AI models at scale.',
      featured: false,
      icon: '',
      image: null,
      link: 'https://www.linkedin.com/in/sai-srujan-2002/details/certifications/',
      linkText: 'View Credential',
      skills: ['PyTorch', 'TensorFlow', 'Keras', 'Deep Learning']
    },
    {
      id: 4,
      category: 'Certification',
      headline: 'Deep Learning Specialization',
      subheadline: 'Neural Networks from Foundations to Production',
      date: '2024',
      source: 'DeepLearning.AI / Coursera',
      content: 'Completed the renowned Deep Learning Specialization by Andrew Ng, mastering neural networks, hyperparameter tuning, CNNs, sequence models, and strategies for structuring machine learning projects.',
      featured: false,
      icon: '',
      image: null,
      link: 'https://www.linkedin.com/in/sai-srujan-2002/details/certifications/',
      linkText: 'View Credential',
      skills: ['Neural Networks', 'CNNs', 'Sequence Models']
    },
    {
      id: 5,
      category: 'Certification',
      headline: 'AWS Certified Cloud Practitioner',
      subheadline: 'Cloud Fundamentals Verified by Amazon',
      date: '2024',
      source: 'Amazon Web Services',
      content: 'Earned the AWS Certified Cloud Practitioner credential, demonstrating foundational knowledge of AWS services, cloud architecture, security, pricing, and best practices across the AWS ecosystem.',
      featured: false,
      icon: '',
      image: null,
      link: 'https://www.linkedin.com/in/sai-srujan-2002/details/certifications/',
      linkText: 'View Credential',
      skills: ['AWS', 'Cloud Computing']
    },
    {
      id: 6,
      category: 'Education',
      headline: 'Master of Science in Computer Science',
      subheadline: 'Graduate Studies Completed at Quinnipiac University',
      date: 'December 2025',
      source: 'Quinnipiac University, Hamden, CT',
      content: 'Completed a Master of Science in Computer Science, building advanced expertise in algorithms, machine learning, software engineering, and applied research.',
      featured: false,
      icon: '',
      image: null,
      link: null,
      skills: ['Computer Science', 'Machine Learning', 'Research']
    },
    {
      id: 7,
      category: 'Writing',
      headline: 'Technical Writer on Medium',
      subheadline: 'Sharing Knowledge Through Articles',
      date: 'Ongoing',
      source: 'Medium',
      content: 'Actively writing technical articles covering AI/ML, software development, programming tutorials, and technology insights. Sharing knowledge and experiences with the developer community.',
      featured: false,
      icon: '',
      image: null,
      link: 'https://medium.com/@srujanvemula275',
      linkText: 'Read Articles',
      skills: ['Technical Writing', 'Content Creation']
    }
  ];

  // ============================================
  // FILTERING
  // ============================================
  const categories = ['All', ...new Set(achievements.map(a => a.category))];

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === selectedCategory);

  const featuredAchievement = achievements.find(a => a.featured);
  const otherAchievements = filteredAchievements.filter(a => !a.featured);

  // Get today's date (newspaper style)
  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={`${styles.newspaper} ${isLoaded ? styles.loaded : ''}`}>

      {/* Breaking News Ticker */}
      <div className={styles.ticker}>
        <span className={styles.tickerLabel}>BREAKING</span>
        <div className={styles.tickerContent}>
          <p>
             HACKATHON VICTORY: Sai Srujan's Team Wins Cybersecurity Challenge —
             Google Cloud Professional ML Engineer Certified —
             IBM AI Engineering Professional Certificate Earned —
             Deep Learning Specialization Completed —
             AWS Certified Cloud Practitioner —
             MS in Computer Science, Quinnipiac University —
             New Articles Published on Medium —
          </p>
        </div>
      </div>

      {/* Newspaper Masthead */}
      <header className={styles.masthead}>
        <div className={styles.mastheadTop}>
          <span>Est. 2022</span>
          <span>{getFormattedDate()}</span>
          <span>Edition No. 1</span>
        </div>
        <h1 className={styles.paperName}>The Developer Times</h1>
        <p className={styles.tagline}>"All the Code That's Fit to Ship"</p>
        <div className={styles.divider}></div>
      </header>

      {/* Category Filter */}
      <nav className={styles.categoryNav}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className={styles.content}>

        {/* Featured Article - Hackathon Win */}
        {(selectedCategory === 'All' || selectedCategory === featuredAchievement?.category) && (
          <article className={styles.featured}>
            <div className={styles.featuredImage}>
              {featuredAchievement.image ? (
                <img
                  src={featuredAchievement.image}
                  alt={featuredAchievement.headline}
                  className={styles.featuredPhoto}
                />
              ) : (
                <span className={styles.featuredIcon}>{featuredAchievement.icon}</span>
              )}
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.categoryBadge}>{featuredAchievement.category}</span>
              <h2 className={styles.featuredHeadline}>{featuredAchievement.headline}</h2>
              <p className={styles.featuredSubheadline}>{featuredAchievement.subheadline}</p>
              <p className={styles.articleText}>{featuredAchievement.content}</p>

              {/* Skills Tags */}
              {featuredAchievement.skills && (
                <div className={styles.skillsContainer}>
                  {featuredAchievement.skills.map((skill, i) => (
                    <span key={i} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              )}

              <div className={styles.articleMeta}>
                <span className={styles.source}>{featuredAchievement.source}</span>
                <span className={styles.date}>{featuredAchievement.date}</span>
              </div>
            </div>
          </article>
        )}

        {/* Section Divider */}
        <div className={styles.sectionHeader}>
          <span>Certifications & Achievements</span>
        </div>

        {/* Articles Grid */}
        <div className={styles.articlesGrid}>
          {otherAchievements.map((achievement) => (
            <article key={achievement.id} className={styles.article}>
              <div className={styles.articleHeader}>
                <span className={styles.articleIcon}>{achievement.icon}</span>
                <span className={styles.categoryTag}>{achievement.category}</span>
              </div>
              <h3 className={styles.articleHeadline}>{achievement.headline}</h3>
              <p className={styles.articleSubheadline}>{achievement.subheadline}</p>
              <p className={styles.articleBody}>{achievement.content}</p>

              {/* Skills Tags */}
              {achievement.skills && (
                <div className={styles.skillsContainer}>
                  {achievement.skills.map((skill, i) => (
                    <span key={i} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              )}

           {/* Credential Link Button */}
              {achievement.link && (
                <a
                  href={achievement.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.credentialBtn}
                >
                  {achievement.linkText || 'View Credential'} 
                </a>
              )}

              <div className={styles.articleFooter}>
                <span className={styles.source}>{achievement.source}</span>
                <span className={styles.date}>{achievement.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className={styles.empty}>
            <p>No achievements found in this category.</p>
            <button onClick={() => setSelectedCategory('All')}>View All</button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerDivider}></div>
        <p>© 2025 Sai Srujan Vemula — The Developer Times</p>
        <p className={styles.footerQuote}>"Every bug fixed is a story worth telling."</p>
      </footer>
    </div>
  );
};

export default Achievement;