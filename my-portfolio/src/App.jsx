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

const projectsData = [
  {
    id: "01",
    name: "PasoChat",
    displayTitle: "PASO",
    subtitle: "REAL-TIME COMMUNICATION",
    category: "Full Stack & WebSockets",
    tech: ["Node.js", "Express", "MongoDB", "WebSockets", "JavaScript"],
    description: "A real-time chat platform focused on backend engineering, communication flows, persistent conversations, and scalable server-side architecture.",
    link: "https://github.com/placeholder/pasochat",
    color: "#3b82f6"
  },
  {
    id: "02",
    name: "PhysicsSim",
    displayTitle: "PHYSICS",
    subtitle: "SIMULATION & EMBEDDINGS",
    category: "Simulation & AI Pipeline",
    tech: ["Python", "Django", "NumPy", "Text Embeddings", "React"],
    description: "A custom physics problem simulator engineered with automated retrieval pipelines utilizing text embeddings for intelligent step-by-step solutions.",
    link: "https://github.com/placeholder/physics-sim",
    color: "#ff33ff"
  },
  {
    id: "03",
    name: "PicoSmartMonitor",
    displayTitle: "PICO.IOT",
    subtitle: "EMBEDDED HARDWARE SYSTEM",
    category: "Embedded & Microcontrollers",
    tech: ["C/C++", "MicroPython", "Raspberry Pi Pico", "MQTT", "Sensors"],
    description: "An end-to-end IoT smart monitoring system built on Raspberry Pi Pico microcontroller with real-time telemetry, sensor polling, and cloud alerting.",
    link: "https://github.com/placeholder/pico-monitor",
    color: "#00ffcc"
  },
  {
    id: "04",
    name: "SubManager",
    displayTitle: "SUB.WEB3",
    subtitle: "DECENTRALIZED PROTOCOL",
    category: "Web3 & Smart Contracts",
    tech: ["Solidity", "Ethers.js", "React", "PostgreSQL", "Tailwind"],
    description: "A decentralized subscription manager designed with autonomous recurring payments and a cryptographic emergency kill-switch for automated security.",
    link: "https://github.com/placeholder/sub-manager",
    color: "#ffcc00"
  }
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projectsData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="projects-page-container">
      <div className="projects-showcase-layout">
        {/* Left Window: Tech Stack */}
        <div className="win98-window project-side-window">
          <div className="win98-title-bar">
            <span>TECH_STACK.EXE</span>
            <div className="win98-title-buttons">
              <button className="win98-title-btn">
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
              </button>
            </div>
          </div>
          <div className="win98-content project-side-content">
            <span className="project-side-tag">TECH STACK</span>
            <h3 className="project-side-heading">Technologies</h3>
            <div className="tech-badge-container">
              {currentProject.tech.map((t) => (
                <span key={t} className="tech-pill-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Big Window: Clickable Project Card */}
        <div className="win98-window project-main-window">
          <div className="win98-title-bar">
            <span>PROJECT_VIEWER.EXE [{currentProject.id} / 04]</span>
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
          <div className="win98-content project-main-content">
            <a
              href={currentProject.link}
              target="_blank"
              rel="noreferrer"
              className="project-display-card"
              title={`Open ${currentProject.name} (External Link)`}
            >
              <div className="view-project-btn">
                VIEW PROJECT ↗
              </div>

              <div className="card-wireframe-bg">
                <svg viewBox="0 0 400 400" className="wireframe-svg">
                  <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255, 51, 255, 0.2)" strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255, 51, 255, 0.15)" strokeWidth="1" strokeDasharray="5 5" />
                  <polygon points="200,30 370,200 200,370 30,200" fill="none" stroke="rgba(255, 51, 255, 0.3)" strokeWidth="1.5" />
                  <polygon points="200,60 340,200 200,340 60,200" fill="none" stroke="rgba(255, 51, 255, 0.15)" strokeWidth="1" />
                </svg>
              </div>

              <div className="card-center-title" style={{ color: currentProject.color }}>
                {currentProject.displayTitle}
              </div>

              <div className="card-bottom-info">
                <div className="card-arrow-circle">
                  <span>↓</span>
                </div>
                <span className="card-subtitle-text">{currentProject.subtitle}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Window: Description & Details */}
        <div className="win98-window project-side-window">
          <div className="win98-title-bar">
            <span>DETAILS.TXT</span>
            <div className="win98-title-buttons">
              <button className="win98-title-btn">
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
              </button>
            </div>
          </div>
          <div className="win98-content project-side-content">
            <div className="project-counter">{currentProject.id} / 04</div>
            <h2 className="project-title-name">{currentProject.name}</h2>
            <p className="project-desc-text">{currentProject.description}</p>
            <div className="project-category-tag">
              <span className="edu-label">Type:</span> {currentProject.category}
            </div>
          </div>
        </div>
      </div>

      {/* Circular Loop Navigation Controls */}
      <div className="projects-carousel-controls">
        <button className="win98-carousel-nav-btn" onClick={handlePrev} title="Previous Project">
          ←
        </button>
        <div className="carousel-indicators">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              title={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
        <button className="win98-carousel-nav-btn" onClick={handleNext} title="Next Project">
          →
        </button>
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <div className="win98-window">
      <div className="win98-title-bar">
        <span>TECH_STACK.EXE</span>
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
      <div className="win98-content">
        <h2>My Tech Stack</h2>
        <p>Tech stack coming soon...</p>
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
            <Link to="/projects" className="win98-btn" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_cool-4.png" alt="Projects" style={{ width: '16px', marginRight: '5px' }} />
              My Projects
            </Link>
            <Link to="/techstack" className="win98-btn" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://win98icons.alexmeub.com/icons/png/chm-2.png" alt="Tech Stack" style={{ width: '16px', marginRight: '5px' }} />
              My Techstack
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/techstack" element={<TechStack />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;