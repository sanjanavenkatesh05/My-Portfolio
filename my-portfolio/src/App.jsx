import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="win98-window">
      <div className="win98-title-bar">
        <span>HOME.EXE</span>

      </div>
      <div className="win98-content">
        <h1>Welcome to my cyber space</h1>
        <p>This is my Y2K MySpace-inspired portfolio. Navigate using the buttons above.</p>
        <img src="https://media.giphy.com/media/l41lSLto3wzRoG9O0/giphy.gif" alt="retro computer" width="300" style={{ border: '2px solid #ff33ff' }} />
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="win98-window">
      <div className="win98-title-bar">
        <span>ABOUT_ME.TXT</span>
        <span>X</span>
      </div>
      <div className="win98-content">
        <h2>About Me</h2>
        <p>I'm a developer who loves retro aesthetics.</p>
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
            <Link to="/about" className="win98-btn">About</Link>
            <a href="/resume.pdf" download className="win98-btn">Resume</a>
            <Link to="/contact" className="win98-btn">Contact</Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <main style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
