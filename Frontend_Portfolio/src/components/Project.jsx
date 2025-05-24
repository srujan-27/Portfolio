import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Project.module.css';
import yimg from '../assests/YouTube_png.png';
import { useNavigate } from 'react-router-dom';


const Project = () => {
  const navigate=useNavigate();
  const [projects, setProjects] = useState([]);
  const [hovered, setHovered] = useState(null); // track which card is hovered

  useEffect(() => {
    const FetchProjects = async () => {
      try {
        const response = await axios.get('https://portfolio-production-bc43.up.railway.app/project');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    FetchProjects();
  }, []);

  const getYouTubeEmbedUrl = (url, autoplay = false) => {
    if (!url) return '';
    let videoId;

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1`
      : '';
  };

  return (
    <div className={styles.main}>
      <img
        src={yimg}
        alt="YouTube Logo"
        className={styles.logo}
/>

      {projects.map((project) => (
        <div
          onClick={()=>navigate(`/project/${project._id}`)}
          key={project._id}
          className={styles.projectItem}
          onMouseEnter={() => setHovered(project._id)}
          onMouseLeave={() => setHovered(null)}
        >

          <div className={styles.videoWrapper}>
            <iframe
              src={getYouTubeEmbedUrl(project.video, hovered === project._id)}
              title={project.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className={styles.ptitle}>{project.title}</h3>
          <p className={styles.author}>Sai Srujan Vemula</p>
        </div>
      ))}
    </div>
  );
};

export default Project;
