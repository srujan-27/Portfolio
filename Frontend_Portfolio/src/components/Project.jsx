// ============================================
// YOUTUBE-STYLE PROJECTS COMPONENT
// ============================================
// Features:
// 1. YouTube-like grid layout
// 2. Video thumbnail with hover preview
// 3. View counts & upload dates
// 4. Channel info (your name + avatar)
// 5. Like/Save buttons
// 6. Video duration badges
// 7. Category filter tabs

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Project.module.css';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedVideos, setLikedVideos] = useState([]);

  // ============================================
  // LOAD LIKED VIDEOS FROM LOCALSTORAGE
  // ============================================
  useEffect(() => {
    const saved = localStorage.getItem('likedProjects');
    if (saved) {
      setLikedVideos(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage when likes change
  useEffect(() => {
    localStorage.setItem('likedProjects', JSON.stringify(likedVideos));
  }, [likedVideos]);

  // ============================================
  // FETCH PROJECTS
  // ============================================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/project');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    fetchProjects();
  }, []);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url) => {
    if (!url) return '';
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    
    return videoId;
  };

  // Get YouTube thumbnail URL
  const getThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  // Get embed URL for hover preview
  const getEmbedUrl = (url, autoplay = false) => {
    const videoId = getYouTubeId(url);
    return videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1&controls=0`
      : '';
  };

  // Generate random view count (for display purposes)
  // In real app, you'd store this in database
  const getViewCount = (id) => {
    // Use project ID to generate consistent "random" number
    const hash = id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const views = Math.abs(hash) % 50000 + 1000;
    
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  // Generate random upload date (for display)
  const getUploadDate = (index) => {
    const dates = ['2 weeks ago', '1 month ago', '3 months ago', '6 months ago', '1 year ago'];
    return dates[index % dates.length];
  };

  // Generate video duration
  const getVideoDuration = (index) => {
    const durations = ['12:34', '8:21', '15:47', '6:52', '22:15', '10:08'];
    return durations[index % durations.length];
  };

  // Toggle like
  const toggleLike = (projectId, e) => {
    e.stopPropagation(); // Prevent navigation
    if (likedVideos.includes(projectId)) {
      setLikedVideos(likedVideos.filter(id => id !== projectId));
    } else {
      setLikedVideos([...likedVideos, projectId]);
    }
  };

  // Get unique categories from tech stacks
  const getCategories = () => {
    const allTech = projects.flatMap(p => p.techStack || []);
    const unique = ['All', ...new Set(allTech)];
    return unique.slice(0, 8); // Limit to 8 categories
  };

  // Filter projects by category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.techStack?.includes(selectedCategory));

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={styles.container}>
      {/* YouTube Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>▶</span>
          <span className={styles.logoText}>SaiTube</span>
        </div>
        <p className={styles.subtitle}>My Project Showcase</p>
      </header>

      {/* Category Filter Tabs */}
      <div className={styles.categoryTabs}>
        {getCategories().map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryTab} ${selectedCategory === cat ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className={styles.grid}>
        {filteredProjects.map((project, index) => (
          <div
            key={project._id}
            className={styles.card}
            onClick={() => navigate(`/project/${project._id}`)}
            onMouseEnter={() => setHoveredId(project._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Thumbnail / Video Preview */}
            <div className={styles.thumbnailWrapper}>
              {hoveredId === project._id ? (
                <iframe
                  src={getEmbedUrl(project.video, true)}
                  title={project.title}
                  className={styles.videoPreview}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <img
                  src={getThumbnail(project.video)}
                  alt={project.title}
                  className={styles.thumbnail}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/320x180?text=No+Thumbnail';
                  }}
                />
              )}
              
              {/* Duration Badge */}
              <span className={styles.duration}>{getVideoDuration(index)}</span>
              
              {/* Like Button Overlay */}
              <button
                className={`${styles.likeBtn} ${likedVideos.includes(project._id) ? styles.liked : ''}`}
                onClick={(e) => toggleLike(project._id, e)}
              >
                {likedVideos.includes(project._id) ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Video Info */}
            <div className={styles.info}>
              {/* Channel Avatar */}
              <div className={styles.avatar}>SS</div>
              
              <div className={styles.details}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.channel}>Sai Srujan Vemula</p>
                <p className={styles.meta}>
                  {getViewCount(project._id)} • {getUploadDate(index)}
                </p>
                
                {/* Tech Stack Tags */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className={styles.tags}>
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className={styles.tag}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions (visible on hover) */}
            <div className={styles.quickActions}>
              <a 
                href={project.demolink} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={styles.actionBtn}
              >
                🚀 Demo
              </a>
              <a 
                href={project.codelink} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={styles.actionBtn}
              >
                💻 Code
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className={styles.empty}>
          <p>No projects found in this category</p>
          <button onClick={() => setSelectedCategory('All')}>Show All</button>
        </div>
      )}
    </div>
  );
};

export default Project;