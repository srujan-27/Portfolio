import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProjectPage.module.css';

const ProjectPage = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/project');
        const matchedProject = res.data.find(p => p._id === id);
        setProject(matchedProject);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchAllProjects();
  }, [id]);

  if (!project) return <p>Loading project...</p>;

  return (
    <div className={styles.single}>
      <h1>{project.title}</h1>
      <iframe
        width="800"
        height="400"
        src={`https://www.youtube.com/embed/${project.video.split('youtu.be/')[1]}`}
        title={project.title}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p>{project.description}</p>
      <a href={project.demolink} target="_blank" rel="noreferrer">Live Demo</a> | 
      <a href={project.codelink} target="_blank" rel="noreferrer"> GitHub Repo</a>
    </div>
  );
};

export default ProjectPage;
