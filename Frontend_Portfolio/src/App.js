import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'; 
import Home from './pages/Home';
import ExperiencesPage from './pages/ExpereincePage';
import Achievements from './components/Achievement';
import Projects from './components/Project'
import ProjectPage from './pages/ProjectPage'

function App() {
    return (
        <Router>
            {/* NAVBAR OUTSIDE Routes */}
            <Navbar />  

            {/* THEN Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experiences" element={<ExperiencesPage />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/project/:id" element={<ProjectPage />} />
            </Routes>
        </Router>
    );
}

export default App;
