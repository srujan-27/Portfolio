import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import ExperiencesPage from './pages/ExpereincePage';
import Achievements from './components/Achievement';
import Projects from './components/Project';
import ProjectPage from './pages/ProjectPage';

// React Router keeps scroll position across navigations, so without this
// you land halfway down a page after clicking through from mid-list.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NotFound = () => (
  <div
    style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: '96px 24px',
      textAlign: 'center',
    }}
  >
    <p
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        margin: '0 0 12px',
      }}
    >
      Page not found
    </p>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 600, margin: '0 0 18px' }}>
      There is no section at this address.
    </h1>
    <Link
      to="/"
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        borderBottom: '1px solid var(--rule)',
        paddingBottom: '2px',
      }}
    >
      Return to the title page
    </Link>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
