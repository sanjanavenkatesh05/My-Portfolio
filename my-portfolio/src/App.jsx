import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-layout">
      {/* Quick Links Sidebar */}
      <div className="win98-window quick-links-sidebar">
        <div className="win98-title-bar">
          <span>QUICK_LINKS.EXE</span>
          <div className="win98-title-buttons">
            <button className="win98-title-btn">_</button>
            <button className="win98-title-btn">[]</button>
            <button className="win98-title-btn">X</button>
          </div>
        </div>
        <div className="win98-content quick-links-content">
          <div className="link-item">
            <span className="logo-placeholder">in</span>
            <a href="#" className="win98-btn">LinkedIn</a>
          </div>
          <div className="link-item">
            <span className="logo-placeholder">{'<>'}</span>
            <a href="#" className="win98-btn">GitHub</a>
          </div>
          <div className="link-item">
            <span className="logo-placeholder">ig</span>
            <a href="#" className="win98-btn">Instagram</a>
          </div>
          <div className="link-item">
            <span className="logo-placeholder">lc</span>
            <a href="#" className="win98-btn">LeetCode</a>
          </div>
          <div className="link-item">
            <span className="logo-placeholder">cc</span>
            <a href="#" className="win98-btn">CodeChef</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="win98-window main-content-window">
        <div className="win98-title-bar">
          <span>HOME.EXE</span>
        </div>
        <div className="win98-content">
          <h1>Welcome to my cyber space</h1>
          <p>This is my Y2K MySpace-inspired portfolio. Navigate using the buttons above.</p>
          <img src="https://media.giphy.com/media/l41lSLto3wzRoG9O0/giphy.gif" alt="retro computer" width="300" style={{ border: '2px solid #ff33ff' }} />
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="win98-window">
      <div className="win98-title-bar">
        <span>CONTACT.WRI</span>
        <span>X</span>
      </div>
      <div className="win98-content">
        <h2>Hit me up!</h2>
        <p>Email me at cyber@pink.net</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="page-container">
        {/* Header Elements */}
        <header className="header-container">
          <div className="logo-container">
            <span className="pixel-heart">♥</span>
            <span>MYSPACE_PORTFOLIO</span>
          </div>

          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search the web..." />
          </div>

          <nav className="nav-buttons">
            <Link to="/" className="win98-btn">Home</Link>
            <a href="/resume.pdf" download className="win98-btn">Resume</a>
            <Link to="/contact" className="win98-btn">Contact</Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <main style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
