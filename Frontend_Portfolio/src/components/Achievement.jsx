import { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './Achievement.module.css';

const Achievement =()=>{
    const [achievements, setAchievements]=useState([]);
    const fetchAchievements = async () =>{
        try{
            const response= await axios.get('https://portfolio-production-bc43.up.railway.app/acheivement');
            setAchievements(response.data);
        }catch(error){
            console.error("error fetching achivements");
        }
    };

    useEffect(()=>{
        fetchAchievements();
    },[]);

    if(achievements.length === 0){
        return <p> Loading Achievements</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                My Achievements
            </h1>
            {achievements.map((ach) => (
                <div key={ach._id} className={styles.card}>
                    <h2 className={styles.title}>{ach.title}</h2>
                    <p className={styles.description}>{ach.description}</p>
    
                    <div className={styles.photos}>
                        {ach.photos.map((photoUrl, index) => (
                            <img key={index} src={photoUrl} alt="Achievement" className={styles.photo} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    

};

export default Achievement;