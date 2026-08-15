import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import songFile from './assets/LEASE by Takeshi Abo but slightly bitcrushed for nostalgia - (64 Kbps).mp3';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-window">
      <div className="music-player-title">
        <span>WINAMP_CYBER.EXE</span>
        <div className="win98-title-buttons">
          <button className="win98-title-btn">
            <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="6" width="8" height="2" fill="black" /></svg>
          </button>
          <button className="win98-title-btn">
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
          </button>
        </div>
      </div>
      <div className="music-player-controls">
        <div className="music-logo">
          🎵
        </div>
        <div className="music-display">
          {isPlaying ? "▶ PLAYING: Takeshi Abo" : "■ STOPPED"}
        </div>
        <button className="music-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <audio ref={audioRef} src={songFile} loop />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-layout">
      {/* Quick Links Sidebar */}
      <div className="win98-window quick-links-sidebar">
        <div className="win98-title-bar">
          <span>QUICK_LINKS.EXE</span>
          <div className="win98-title-buttons">
            <button className="win98-title-btn">
              <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0" y="6" width="8" height="2" fill="black" /></svg>
            </button>
            <button className="win98-title-btn">
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 H8 V8 H0 Z M1,2 V7 H7 V2 Z" fill="black" /></svg>
            </button>
            <button className="win98-title-btn">
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
            </button>
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

      <MusicPlayer />

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
        <div className="win98-title-buttons">
          <button className="win98-title-btn">
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
          </button>
        </div>
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
            <Link to="/" className="win98-btn" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" alt="Home" style={{ width: '16px', marginRight: '5px' }} />
              Home
            </Link>
            <a href="/resume.pdf" download className="win98-btn" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://win98icons.alexmeub.com/icons/png/notepad-0.png" alt="Resume" style={{ width: '16px', marginRight: '5px' }} />
              Resume
            </a>
            <Link to="/contact" className="win98-btn" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://win98icons.alexmeub.com/icons/png/message_envelope_open-0.png" alt="Contact" style={{ width: '16px', marginRight: '5px' }} />
              Contact
            </Link>
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
