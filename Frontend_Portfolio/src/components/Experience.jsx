// React loads --> useEffect() runs --> calls fetchExperiences()
//     ↓
// axios gets experiences data from backend
//     ↓
// setExperiences(data)
//     ↓
// React automatically updates the screen with experience cards
// ============================================
// NETFLIX-STYLE EXPERIENCE COMPONENT
// ============================================
// This component includes:
// 1. Continue Watching section (current job with progress bar)
// 2. Top 10 badges on most impactful experiences
// 3. Season dropdown selector
// 4. Episode hover expand with tech stack
// 5. My List feature (localStorage bookmarks)
// 6. Match percentage per season

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Experience.module.css';

const Experience = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  // useState is React's way of remembering values between renders
  // 
  // Think of it like this:
  // - Regular variables reset every time component re-renders
  // - State variables PERSIST and trigger re-renders when changed

  const [experiences, setExperiences] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('all'); // For dropdown filter
  const [myList, setMyList] = useState([]); // For bookmarked episodes
  const [expandedEpisode, setExpandedEpisode] = useState(null); // For hover expand
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  // ============================================
  // FEATURE 5: MY LIST (LocalStorage)
  // ============================================
  // localStorage = browser's built-in database
  // Data persists even after closing the browser!
  // 
  // JSON.parse() = converts string to JavaScript object
  // JSON.stringify() = converts object to string (localStorage only stores strings)

  useEffect(() => {
    // Load saved bookmarks from localStorage when component mounts
    const savedList = localStorage.getItem('myExperienceList');
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  // Save to localStorage whenever myList changes
  useEffect(() => {
    localStorage.setItem('myExperienceList', JSON.stringify(myList));
  }, [myList]); // Dependency array: runs when myList changes

  // Toggle bookmark function
  const toggleMyList = (episodeId) => {
    // Check if already in list
    if (myList.includes(episodeId)) {
      // Remove from list using filter
      // filter() creates new array with items that pass the test
      setMyList(myList.filter(id => id !== episodeId));
    } else {
      // Add to list using spread operator
      // [...myList] copies existing array, then adds new item
      setMyList([...myList, episodeId]);
    }
  };

  // ============================================
  // DATA FETCHING
  // ============================================
  const fetchExperiences = async () => {
    try {
      const response = await axios.get('https://portfolio-bfaj.onrender.com/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  if (experiences.length === 0) {
    return <p className={styles.loading}>Loading experiences...</p>;
  }

  // ============================================
  // SORTING & FILTERING
  // ============================================
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
  });

  // Filter by selected season (company)
  const filteredExperiences = selectedSeason === 'all' 
    ? sortedExperiences 
    : sortedExperiences.filter(exp => exp.company === selectedSeason);

  // ============================================
  // FEATURE 1: CONTINUE WATCHING
  // ============================================
  // Find the most recent experience (current job)
  // This shows at the top with a progress bar
  const currentExperience = sortedExperiences[0];
  
  // Calculate progress: how far into this role (0-100%)
  // If endDate is "Present" or current date, calculate based on today
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    const now = new Date();
    
    // Total duration of the role
    const totalDuration = end - start;
    // How much time has passed
    const elapsed = now - start;
    
    // Return percentage (capped at 100)
    return Math.min(100, Math.round((elapsed / totalDuration) * 100));
  };

  // ============================================
  // FEATURE 8: MATCH PERCENTAGE
  // ============================================
  // Generates a "match" score based on role type
  // This is just for visual effect - you can customize the logic
  const getMatchPercentage = (role) => {
    const roleKeywords = {
      'intern': 85,
      'developer': 92,
      'engineer': 95,
      'lead': 97,
      'senior': 98,
      'ml': 94,
      'ai': 96,
      'full stack': 93,
      'frontend': 90,
      'backend': 91
    };

    const roleLower = role.toLowerCase();
    for (const [keyword, score] of Object.entries(roleKeywords)) {
      if (roleLower.includes(keyword)) {
        return score;
      }
    }
    return 88; // Default score
  };

  // ============================================
  // FEATURE 2: TOP 10 RANKING
  // ============================================
  // Assign ranks based on position in sorted array
  // Top 3 get special "Top 10" style badges
  const getTopRank = (index) => {
    if (index < 3) return index + 1; // Only top 3 get ranks
    return null;
  };

  // Generate varied ratings
  const generateRating = (seasonIndex, episodeIndex) => {
    const base = 8.5 + (seasonIndex * 0.2) + (episodeIndex * 0.1);
    return Math.min(9.8, base).toFixed(1);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={styles.container}>
      
      {/* ============================================
          FEATURE 1: CONTINUE WATCHING SECTION
          ============================================
          Shows your current/most recent role with a progress bar
          Like Netflix's "Continue Watching for [User]" row */}
      <div className={styles.continueWatching}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.redDot}></span> Continue Watching
        </h3>
        <div className={styles.continueCard}>
          <div className={styles.continueThumb}>
            <span className={styles.playIcon}>▶</span>
          </div>
          <div className={styles.continueInfo}>
            <h4>{currentExperience.company}</h4>
            <p>{currentExperience.role}</p>
            <div className={styles.progressContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${calculateProgress(currentExperience.startDate, currentExperience.endDate)}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>
              {currentExperience.startDate} - {currentExperience.endDate || 'Present'}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================
          FEATURE 3: SEASON DROPDOWN SELECTOR
          ============================================
          Allows filtering by company (season)
          Dropdown appears on click, not hover */}
      <div className={styles.seasonSelector}>
        <button 
          className={styles.seasonDropdownBtn}
          onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
        >
          {selectedSeason === 'all' ? 'All Seasons' : `Season: ${selectedSeason}`}
          <span className={styles.dropdownArrow}>{showSeasonDropdown ? '▲' : '▼'}</span>
        </button>
        
        {showSeasonDropdown && (
          <div className={styles.dropdownMenu}>
            <div 
              className={`${styles.dropdownItem} ${selectedSeason === 'all' ? styles.active : ''}`}
              onClick={() => { setSelectedSeason('all'); setShowSeasonDropdown(false); }}
            >
              All Seasons
            </div>
            {sortedExperiences.map((exp, index) => (
              <div 
                key={exp._id}
                className={`${styles.dropdownItem} ${selectedSeason === exp.company ? styles.active : ''}`}
                onClick={() => { setSelectedSeason(exp.company); setShowSeasonDropdown(false); }}
              >
                Season {index + 1}: {exp.company}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================
          SEASONS (EXPERIENCES) LIST
          ============================================ */}
      {filteredExperiences.map((exp, seasonIndex) => (
        <div key={exp._id} className={styles.seasonCard}>
          
          {/* FEATURE 2: TOP 10 BADGE */}
          {getTopRank(seasonIndex) && (
            <div className={styles.topBadge}>
              <span className={styles.topNumber}>{getTopRank(seasonIndex)}</span>
              <span className={styles.topText}>TOP</span>
            </div>
          )}

          <div className={styles.seasonHeader}>
            <h2 className={styles.seasonTitle}>Season: {exp.company}</h2>
            {/* FEATURE 8: MATCH PERCENTAGE */}
            <span className={styles.matchBadge}>{getMatchPercentage(exp.role)}% Match</span>
          </div>
          
          <p className={styles.seasonDescription}>
            {exp.role} - {exp.location} ({exp.startDate} to {exp.endDate || 'Present'})
          </p>

          {/* Tech stack tags if available */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className={styles.techTags}>
              {exp.technologies.slice(0, 5).map((tech, i) => (
                <span key={i} className={styles.techTag}>{tech}</span>
              ))}
              {exp.technologies.length > 5 && (
                <span className={styles.techTag}>+{exp.technologies.length - 5} more</span>
              )}
            </div>
          )}

          {/* ============================================
              EPISODES (DESCRIPTION POINTS)
              ============================================ */}
          <div className={styles.episodesContainer}>
            {exp.description.map((point, index) => {
              // Create unique ID for each episode (for My List feature)
              const episodeId = `${exp._id}-${index}`;
              const isExpanded = expandedEpisode === episodeId;
              const isInMyList = myList.includes(episodeId);

              return (
                <div 
                  key={index} 
                  className={`${styles.episodeCard} ${isExpanded ? styles.expanded : ''}`}
                  onMouseEnter={() => setExpandedEpisode(episodeId)}
                  onMouseLeave={() => setExpandedEpisode(null)}
                >
                  {/* Episode Number Thumbnail */}
                  <div className={styles.thumbnail}>
                    <span className={styles.episodeNumber}>{index + 1}</span>
                  </div>

                  {/* Episode Info */}
                  <div className={styles.episodeInfo}>
                    <div className={styles.episodeHeader}>
                      <h3>Episode {index + 1}</h3>
                      
                      {/* FEATURE 5: MY LIST BUTTON */}
                      <button 
                        className={`${styles.myListBtn} ${isInMyList ? styles.inList : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent hover effect interference
                          toggleMyList(episodeId);
                        }}
                        title={isInMyList ? 'Remove from My List' : 'Add to My List'}
                      >
                        {isInMyList ? '✓' : '+'}
                      </button>
                    </div>
                    
                    <p>{point}</p>
                    
                    <div className={styles.episodeMeta}>
                      <span className={styles.rating}>⭐ {generateRating(seasonIndex, index)}</span>
                      {isInMyList && <span className={styles.savedBadge}>In My List</span>}
                    </div>

                    {/* FEATURE 4: EXPANDED CONTENT ON HOVER */}
                    {isExpanded && exp.technologies && (
                      <div className={styles.expandedContent}>
                        <div className={styles.techUsed}>
                          <span className={styles.techLabel}>Technologies:</span>
                          {exp.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className={styles.miniTechTag}>{tech}</span>
                          ))}
                        </div>
                        <button className={styles.playEpisode}>▶ View Details</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ============================================
          MY LIST SECTION (if user has bookmarks)
          ============================================ */}
      {myList.length > 0 && (
        <div className={styles.myListSection}>
          <h3 className={styles.sectionTitle}>📌 My List ({myList.length} saved)</h3>
          <p className={styles.myListHint}>
            You've bookmarked {myList.length} episode{myList.length > 1 ? 's' : ''}. 
            These are saved in your browser!
          </p>
        </div>
      )}
    </div>
  );
};

export default Experience;