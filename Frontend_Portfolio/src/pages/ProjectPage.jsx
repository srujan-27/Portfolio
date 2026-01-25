// ============================================
// YOUTUBE-STYLE SINGLE PROJECT PAGE
// ============================================
// Like YouTube's video watch page with:
// - Large video player
// - Title, views, likes
// - Description expand/collapse
// - Channel info
// - Related projects sidebar

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProjectPage.module.css';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // ============================================
  // FETCH DATA
  // ============================================
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/project');
        setAllProjects(res.data);
        const matchedProject = res.data.find(p => p._id === id);
        setProject(matchedProject);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [id]);

  // Load like/save state from localStorage
  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    setIsLiked(likedProjects.includes(id));
    setIsSaved(savedProjects.includes(id));
  }, [id]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
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

  const getEmbedUrl = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const getThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const getViewCount = () => {
    const hash = id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    return Math.abs(hash) % 50000 + 1000;
  };

  const formatViews = (views) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Toggle functions
  const toggleLike = () => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    if (isLiked) {
      const updated = likedProjects.filter(pid => pid !== id);
      localStorage.setItem('likedProjects', JSON.stringify(updated));
    } else {
      likedProjects.push(id);
      localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
    }
    setIsLiked(!isLiked);
  };

  const toggleSave = () => {
    const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
    if (isSaved) {
      const updated = savedProjects.filter(pid => pid !== id);
      localStorage.setItem('savedProjects', JSON.stringify(updated));
    } else {
      savedProjects.push(id);
      localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
    }
    setIsSaved(!isSaved);
  };

  // Related projects (exclude current)
  const relatedProjects = allProjects.filter(p => p._id !== id).slice(0, 5);

  // ============================================
  // LOADING STATE
  // ============================================
  if (!project) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading project...</p>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.main}>
        {/* Video Player */}
        <div className={styles.playerWrapper}>
          <iframe
            src={getEmbedUrl(project.video)}
            title={project.title}
            className={styles.player}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Title */}
        <h1 className={styles.title}>{project.title}</h1>

        {/* Video Stats & Actions */}
        <div className={styles.statsRow}>
          <div className={styles.stats}>
            <span>{formatViews(getViewCount())} views</span>
            <span>•</span>
            <span>Uploaded 3 months ago</span>
          </div>

          <div className={styles.actions}>
            <button 
              className={`${styles.actionBtn} ${isLiked ? styles.active : ''}`}
              onClick={toggleLike}
            >
              {isLiked ? '👍' : '👍'} {isLiked ? 'Liked' : 'Like'}
            </button>
            <button 
              className={`${styles.actionBtn} ${isSaved ? styles.active : ''}`}
              onClick={toggleSave}
            >
              {isSaved ? '📌' : '📌'} {isSaved ? 'Saved' : 'Save'}
            </button>
            <a 
              href={project.codelink} 
              target="_blank" 
              rel="noreferrer"
              className={styles.actionBtn}
            >
              💻 Code
            </a>
            <a 
              href={project.demolink} 
              target="_blank" 
              rel="noreferrer"
              className={styles.actionBtn}
            >
              🚀 Demo
            </a>
          </div>
        </div>

        {/* Channel Info & Description */}
        <div className={styles.infoBox}>
          <div className={styles.channelRow}>
            <div className={styles.avatar}>SS</div>
            <div className={styles.channelInfo}>
              <h3>Sai Srujan Vemula</h3>
              <span>Software Developer</span>
            </div>
          </div>

          {/* Description */}
          <div className={`${styles.description} ${isDescExpanded ? styles.expanded : ''}`}>
            <p>{project.description || 'No description available for this project.'}</p>
            
            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className={styles.techSection}>
                <h4>Technologies Used:</h4>
                <div className={styles.techTags}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            className={styles.expandBtn}
            onClick={() => setIsDescExpanded(!isDescExpanded)}
          >
            {isDescExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      </div>

      {/* Sidebar - Related Projects */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>More Projects</h3>
        
        {relatedProjects.map((p) => (
          <div 
            key={p._id} 
            className={styles.relatedCard}
            onClick={() => navigate(`/project/${p._id}`)}
          >
            <img 
              src={getThumbnail(p.video)} 
              alt={p.title}
              className={styles.relatedThumb}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/168x94?text=No+Thumbnail';
              }}
            />
            <div className={styles.relatedInfo}>
              <h4>{p.title}</h4>
              <p>Sai Srujan Vemula</p>
              <span>{formatViews(Math.abs(p._id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)) % 50000 + 1000)} views</span>
            </div>
          </div>
        ))}

        {/* Back Button */}
        <button 
          className={styles.backBtn}
          onClick={() => navigate('/projects')}
        >
          ← Back to All Projects
        </button>
      </aside>
    </div>
  );
};

export default ProjectPage;