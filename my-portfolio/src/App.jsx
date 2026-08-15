import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import songFile from './assets/LEASE by Takeshi Abo but slightly bitcrushed for nostalgia - (64 Kbps).mp3';
import './App.css';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to autoplay on mount; handle browser autoplay policy rejections
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Autoplay prevented by browser:", error);
        setIsPlaying(false);
      });
    }
  }, []);

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
        <span>MY_MUSIC.EXE</span>
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
        <div className="music-display" style={{ padding: '0 5px', display: 'flex', alignItems: 'center' }}>
          {isPlaying ? (
            <marquee scrollamount="4">▶ PLAYING: Takeshi Abo - LEASE</marquee>
          ) : (
            "■ STOPPED"
          )}
        </div>
        <button className="music-btn" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶'}
        </button>
        <audio ref={audioRef} src={songFile} autoPlay loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-layout">
      {/* Left Column Sidebar */}
      <div className="left-column">
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

        {/* Open Source Window */}
        <div className="win98-window open-source-window">
          <div className="win98-title-bar">
            <span>OPEN_SOURCE.EXE</span>
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
          <div className="win98-content open-source-content">
            <div className="repo-item">
              <span className="repo-title">📁 physics-sim-engine</span>
              <a href="https://github.com/placeholder/physics-sim-engine" target="_blank" rel="noreferrer" className="repo-link">github.com/sanjana/physics-sim</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">📁 decentralized-sub-manager</span>
              <a href="https://github.com/placeholder/decentralized-sub-manager" target="_blank" rel="noreferrer" className="repo-link">github.com/sanjana/sub-manager</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">📁 pico-smart-monitor</span>
              <a href="https://github.com/placeholder/pico-smart-monitor" target="_blank" rel="noreferrer" className="repo-link">github.com/sanjana/pico-monitor</a>
            </div>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="right-column">
        <MusicPlayer />
        <div className="win98-window main-content-window">
          <div className="win98-title-bar">
            <span>HOME.EXE</span>
          </div>
          <div className="win98-content inner-myspace-layout">
            {/* Inner Left Column */}
            <div className="inner-left-col">
              {/* Me Window */}
              <span className="myspace-header-title" style={{ fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive', fontSize: '5em', textDecoration: 'underline', color: '#ff33ff', backgroundColor: 'transparent' }}> About me </span>
              <div className="win98-window">
                <div className="myspace-header-title">me.jpg</div>
                <div className="win98-content myspace-me-info" style={{ padding: 0 }}>
                  <img src="./src/assets/digicamfx-original-2026-08-15T10-55-28.jpg" alt="me" className="myspace-pic" />
                </div>
              </div>




              {/* Education Window */}
              <div className="win98-window">
                <div className="myspace-header-title">education</div>
                <div className="win98-content edu-content">
                  <p className="edu-college">RNS Institute of Technology, Bengaluru (2023 - 2027)</p>

                  <div className="edu-row"><span className="edu-label">Degree</span><span>Bachelor of Engineering in Computer Science</span></div>
                  <div className="edu-row"><span className="edu-label">Minor</span><span>VLSI</span></div>
                  <div className="edu-row"><span className="edu-label">Status</span><span>Undergraduate Student</span></div>
                </div>
              </div>

            </div>

            {/* Inner Right Column */}
            <div className="inner-right-col">
              {/* About Me Window */}
              <div className="win98-window">
                <div className="myspace-header-title">about me :&lt;</div>
                <div className="win98-content">
                  <p>Hi, I am Sanjana! I am a third year Computer Science Engineering student minoring in VLSI at RNS Institute of Technology. I love building things across the entire stack, from web applications all the way down to low level hardware systems.</p>
                </div>
              </div>


              {/* Experience Window */}
              <div className="win98-window">
                <div className="myspace-header-title">experience</div>
                <div className="win98-content exp-content">

                  <div className="exp-entry">
                    <p className="exp-company"> IEEE TechXcelerate</p>
                    <div className="exp-meta">
                      <span className="edu-label">Role</span><span>Software Developer Intern</span>
                    </div>
                    <div className="exp-meta">
                      <span className="edu-label">Duration</span><span>June – October 2025</span>
                    </div>
                    <ul className="star-list exp-list">
                      <li>Focused on collaborative software development.</li>
                      <li>Engineered a custom physics problem simulator.</li>
                      <li>Built and integrated a retrieval pipeline utilizing text embeddings.</li>
                    </ul>
                  </div>

                  <div className="exp-entry">
                    <p className="exp-company"> Samsung Innovation Campus</p>
                    <div className="exp-meta">
                      <span className="edu-label">Role</span><span>IoT Intern</span>
                    </div>
                    <div className="exp-meta">
                      <span className="edu-label">Duration</span><span>Sept 2025 – Jul 2026</span>
                    </div>
                    <ul className="star-list exp-list">
                      <li>Selected from a pool of over 800 applicants.</li>
                      <li>Led a team of four to design and build a complete end-to-end IoT system.</li>
                      <li>Developed a smart monitoring project running on a Raspberry Pi Pico.</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
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