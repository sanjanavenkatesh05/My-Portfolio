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
          <img src="https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-4.png" alt="CD" style={{ width: '16px', height: '16px' }} />
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
              <span className="repo-title">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                physics-sim-engine
              </span>
              <a href="https://github.com/placeholder/physics-sim-engine" target="_blank" rel="noreferrer" className="repo-link">github.com/sanjana/physics-sim</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                decentralized-sub-manager
              </span>
              <a href="https://github.com/placeholder/decentralized-sub-manager" target="_blank" rel="noreferrer" className="repo-link">github.com/sanjana/sub-manager</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                pico-smart-monitor
              </span>
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
      <div className="win98-window outer-app-window">
        <div className="win98-title-bar">
          <div className="win98-title-left">
            <img 
              src="https://win98icons.alexmeub.com/icons/png/briefcase-2.png" 
              alt="" 
              className="win98-title-img" 
            />
            <span>PROJECTS.EXE</span>
          </div>
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
        <div className="win98-content outer-app-content">
          <div className="projects-showcase-layout">
            {/* Left Window: Tech Stack (Peeking from behind) */}
            <div className="win98-window project-side-window tech-side-window">
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

            {/* Middle Big Window: Clickable Project Card (Foreground) */}
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
                    <span className="card-subtitle-text">{currentProject.subtitle}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Window: Description & Details (Peeking from behind) */}
            <div className="win98-window project-side-window details-side-window">
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
      </div>
    </div>
  );
}

const techStackData = {
  "Languages": {
    name: "Languages",
    description: "Core programming languages for low-level systems, data pipelines, algorithms, and full-stack web applications.",
    items: [
      { name: "C", file: "c.txt", size: "32 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", desc: "Low-level systems programming, embedded firmware, pointers, memory allocation, and custom microkernel foundations." },
      { name: "C++", file: "cpp.txt", size: "48 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", desc: "Object-oriented systems, physics problem simulators, performance-critical modules, and algorithmic problem-solving." },
      { name: "Python", file: "python.txt", size: "64 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "Data processing, text embeddings retrieval pipelines, scientific simulation engines, and backend APIs with Django." },
      { name: "JavaScript", file: "javascript.txt", size: "56 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", desc: "Modern dynamic scripting for client-side interactivity, responsive React components, and asynchronous Node.js backends." },
      { name: "Java", file: "java.txt", size: "72 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", desc: "Object-oriented design patterns, enterprise microservices architectures with Spring Boot, and JVM application engineering." }
    ]
  },
  "Frontend & Graphics": {
    name: "Frontend & Graphics",
    description: "Interactive visual interfaces, WebGL rendering pipelines, physics simulations, and modern responsive styling.",
    items: [
      { name: "React", file: "react.js", size: "88 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", desc: "Modern component-based UI engineering with hooks, SPA routing, state management, and real-time WebSocket communication." },
      { name: "TailwindCSS", file: "tailwind.css", size: "42 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", desc: "Utility-first modern responsive CSS styling with custom theme palettes, flexbox grids, and fluid layouts." },
      { name: "WebGL", file: "webgl.glsl", size: "60 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opengl/opengl-original.svg", desc: "Low-level hardware-accelerated 2D and 3D graphics rendering directly inside browser canvas contexts with custom shaders." },
      { name: "Canvas API", file: "canvas.js", size: "36 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", desc: "Direct 2D bitmap pixel drawing, custom procedural animations, and interactive graphic rendering in HTML5 canvas." },
      { name: "p5.js", file: "p5.js", size: "52 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/p5js/p5js-original.svg", desc: "Creative coding and algorithmic generative graphic sketches for interactive visual experimentation." },
      { name: "Matter.js", file: "matter.js", size: "68 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", desc: "2D rigid body physics simulation engine for interactive web physics experiments, collision detection, and particle mechanics." },
      { name: "VPython", file: "vpython.py", size: "44 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "3D visual physics modeling and simulations for computational problem-solving and kinematic mechanics." },
      { name: "VLGL", file: "vlgl.c", size: "38 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", desc: "Lightweight embedded graphics library rendering customized for small microcontroller display modules." }
    ]
  },
  "Backend": {
    name: "Backend",
    description: "Server-side architectures, RESTful APIs, real-time communication flows, and business logic.",
    items: [
      { name: "Node.js", file: "node.js", size: "57 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", desc: "Asynchronous event-driven JavaScript runtime built on Chrome's V8 engine. Handles high-concurrency real-time WebSocket servers." },
      { name: "Express.js", file: "express.js", size: "35 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", desc: "Fast, minimalist web framework for building Node.js REST APIs, routing pipelines, authentication middlewares, and services." },
      { name: "Django", file: "django.py", size: "90 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", desc: "High-level Python web framework encouraging clean, rapid development with ORM, automated admin panels, and built-in security." },
      { name: "Spring Boot", file: "spring.java", size: "110 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg", desc: "Enterprise production-ready Java framework for robust standalone microservices, dependency injection, and scalable backends." }
    ]
  },
  "Databases": {
    name: "Databases",
    description: "Relational and NoSQL persistent storage, schema optimization, and query performance.",
    items: [
      { name: "PostgreSQL", file: "postgres.sql", size: "75 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", desc: "Powerful open-source object-relational SQL database with advanced indexing, ACID compliance, and JSON capabilities." },
      { name: "MySQL", file: "mysql.sql", size: "65 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg", desc: "High-performance ACID-compliant relational database management for transactional systems and structured relational schemas." },
      { name: "MongoDB", file: "mongodb.json", size: "58 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", desc: "Flexible document-oriented NoSQL database optimized for JSON-like schema designs, fast aggregations, and horizontal scaling." }
    ]
  },
  "Hardware & Embedded": {
    name: "Hardware & Embedded",
    description: "Microcontroller programming, hardware communication buses, IoT systems, and VLSI circuit concepts.",
    items: [
      { name: "Raspberry Pi", file: "raspi.cfg", size: "45 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg", desc: "Single-board computer Linux environment used as local edge gateways, smart monitoring hubs, and sensor processing hubs." },
      { name: "ESP32", file: "esp32.c", size: "62 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/embeddedc/embeddedc-original.svg", desc: "Dual-core Wi-Fi/Bluetooth SoC used for smart monitoring projects, MQTT telemetry pipelines, and low-power sensor nodes." },
      { name: "MicroPython", file: "micropython.py", size: "40 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "Lean Python 3 implementation tailored to run directly on microcontrollers like Raspberry Pi Pico for rapid prototyping." },
      { name: "SPI", file: "spi_driver.h", size: "24 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", desc: "Serial Peripheral Interface synchronous serial communication protocol for high-speed sensor and display communication." },
      { name: "GPIO", file: "gpio_pins.h", size: "18 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", desc: "General-Purpose Input/Output pin control for sensor polling, hardware interrupts, relays, and digital telemetry." },
      { name: "VLSI", file: "vlsi_chip.v", size: "85 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", desc: "Very Large Scale Integration digital design concepts, silicon layouts, combinational/sequential logic, and hardware minors." },
      { name: "Custom Microkernels", file: "kernel.asm", size: "95 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg", desc: "Architecting minimal microkernels with low-level process scheduling, memory isolation, and lightweight IPC." }
    ]
  },
  "Tools & Deployment": {
    name: "Tools & Deployment",
    description: "Version control, containerization environments, and Linux developer toolchains.",
    items: [
      { name: "Git", file: "git.exe", size: "42 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", desc: "Distributed version control system for tracking source code changes, branch workflows, and commit history." },
      { name: "GitHub", file: "github.com", size: "50 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg", desc: "Cloud collaboration platform for CI/CD workflows, open-source repositories, issue tracking, and automated releases." },
      { name: "Docker", file: "dockerfile", size: "68 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", desc: "Containerization platform to build, ship, and run distributed multi-service applications reliably across environments." },
      { name: "Linux Workflows", file: "bash.sh", size: "38 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", desc: "POSIX shell scripting, command-line utilities, service daemons, environment orchestration, and development workflows." }
    ]
  },
  "Bonus Areas": {
    name: "Bonus Areas",
    description: "Advanced multidisciplinary engineering domains and emerging technologies.",
    items: [
      { name: "IoT Architecture", file: "iot_arch.md", size: "54 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/embeddedc/embeddedc-original.svg", desc: "End-to-end device-to-cloud telemetry pipelines, MQTT message brokers, sensor networks, and edge intelligence." },
      { name: "Web3 Concepts", file: "web3_protocol.sol", size: "65 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg", desc: "Decentralized protocols, smart contract architecture, recurring subscriptions, and cryptographic emergency kill-switches." },
      { name: "Competitive Programming", file: "cp_algorithms.cpp", size: "80 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg", desc: "Data structures and algorithm optimization practiced across LeetCode and CodeChef for fast problem-solving." },
      { name: "Text Embeddings", file: "embeddings_pipeline.py", size: "72 KB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", desc: "High-dimensional vector representations of text utilized for semantic similarity search and intelligent retrieval pipelines." }
    ]
  }
};

function TechStack() {
  const categoryKeys = Object.keys(techStackData);
  const [activeCategory, setActiveCategory] = useState("Backend");
  const [selectedItem, setSelectedItem] = useState(techStackData["Backend"].items[0]);
  const [history, setHistory] = useState(["Backend"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateToCategory = (cat) => {
    if (cat === activeCategory) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(cat);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveCategory(cat);
    setSelectedItem(techStackData[cat].items[0]);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      const cat = history[newIdx];
      setActiveCategory(cat);
      setSelectedItem(techStackData[cat].items[0]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      const cat = history[newIdx];
      setActiveCategory(cat);
      setSelectedItem(techStackData[cat].items[0]);
    }
  };

  const handleUp = () => {
    navigateToCategory("Languages");
  };

  const handleHome = () => {
    navigateToCategory("Backend");
  };

  const currentCategoryData = techStackData[activeCategory] || techStackData["Backend"];

  return (
    <div className="techstack-page">
      <div className="win98-window outer-app-window">
        <div className="win98-title-bar">
          <div className="win98-title-left">
            <img 
              src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" 
              alt="" 
              className="win98-title-img" 
            />
            <span>TECH_STACK.EXE</span>
          </div>
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

        <div className="win98-content outer-app-content">
          {/* Top Header */}
          <div className="techstack-header">
            <div className="techstack-title-row">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" 
                alt="Computer" 
                className="techstack-header-img" 
              />
              <h1>Tech Stack</h1>
            </div>
            <p className="techstack-subtitle">Explore the technologies I work with</p>
          </div>

          {/* Main 2-Column Explorer Grid */}
          <div className="techstack-desktop-grid">
            {/* Left Column: Explorer + How to Explore Card */}
            <div className="techstack-left-col">
              {/* Main Tech Stack Explorer Window */}
              <div className="win98-window techstack-main-window">
                <div className="win98-title-bar">
                  <div className="win98-title-left">
                    <img 
                      src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_small-4.png" 
                      alt="" 
                      className="win98-title-img" 
                    />
                    <span>EXPLORER.EXE - C:\TechStack\{activeCategory}</span>
                  </div>
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

                {/* Menu Bar */}
                <div className="win98-menubar">
                  <span>File</span>
                  <span>Edit</span>
                  <span>View</span>
                  <span>Help</span>
                </div>

                {/* Toolbar Controls */}
                <div className="win98-toolbar">
                  <button 
                    className={`win98-tool-btn ${historyIndex === 0 ? 'disabled' : ''}`}
                    onClick={handleBack}
                    disabled={historyIndex === 0}
                    title="Back"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="black"><path d="M11 2 L4 8 L11 14 V2 Z" /></svg>
                    <span>Back</span>
                  </button>
                  <button 
                    className={`win98-tool-btn ${historyIndex >= history.length - 1 ? 'disabled' : ''}`}
                    onClick={handleForward}
                    disabled={historyIndex >= history.length - 1}
                    title="Forward"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="black"><path d="M5 2 L12 8 L5 14 V2 Z" /></svg>
                    <span>Forward</span>
                  </button>
                  <button className="win98-tool-btn" onClick={handleUp} title="Up">
                    <img src="https://win98icons.alexmeub.com/icons/png/directory_up-0.png" alt="" className="tool-img" />
                    <span>Up</span>
                  </button>
                  <button className="win98-tool-btn" onClick={handleHome} title="Home">
                    <img src="https://win98icons.alexmeub.com/icons/png/msagent_computer-0.png" alt="" className="tool-img" />
                    <span>Home</span>
                  </button>
                  <button className="win98-tool-btn" onClick={() => setSelectedItem(currentCategoryData.items[0])} title="Refresh">
                    <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" alt="" className="tool-img" />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Address Bar */}
                <div className="win98-address-bar-row">
                  <span className="address-label">Address</span>
                  <div className="address-input-box">
                    <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" className="address-folder-img" />
                    <span className="address-path">C:\TechStack\{activeCategory}</span>
                  </div>
                </div>

                {/* Explorer Split Content Pane */}
                <div className="explorer-split-container">
                  {/* Folders Tree View */}
                  <div className="explorer-tree-view">
                    <div className="tree-header">
                      <span>Folders</span>
                      <span className="tree-close-x">✕</span>
                    </div>
                    <div className="tree-body">
                      <div className="tree-root-item">
                        <span className="tree-box-marker">-</span>
                        <img src="https://win98icons.alexmeub.com/icons/png/directory_desktop-4.png" alt="" className="tree-folder-img" />
                        <span className="tree-label-root">Tech Stack</span>
                      </div>
                      <div className="tree-children-list">
                        {categoryKeys.map((catKey) => {
                          const isSelected = catKey === activeCategory;
                          return (
                            <div 
                              key={catKey} 
                              className={`tree-child-item ${isSelected ? 'selected' : ''}`}
                              onClick={() => navigateToCategory(catKey)}
                            >
                              <span className="tree-expand-icon">{isSelected ? '▼' : '►'}</span>
                              <img 
                                src={isSelected 
                                  ? "https://win98icons.alexmeub.com/icons/png/directory_open-4.png" 
                                  : "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"} 
                                alt="" 
                                className="tree-folder-img" 
                              />
                              <span className="tree-label">{catKey}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Folders Big Icon Grid */}
                  <div className="explorer-grid-view">
                    <div className="folders-grid">
                      {categoryKeys.map((catKey) => {
                        const isActive = catKey === activeCategory;
                        return (
                          <div 
                            key={catKey}
                            className={`folder-grid-item ${isActive ? 'active-folder' : ''}`}
                            onClick={() => navigateToCategory(catKey)}
                          >
                            <img 
                              src={isActive 
                                ? "https://win98icons.alexmeub.com/icons/png/directory_open_cool-4.png" 
                                : "https://win98icons.alexmeub.com/icons/png/directory_closed-4.png"} 
                              alt="Folder" 
                              className="folder-icon-img" 
                            />
                            <span className="folder-grid-label">{catKey}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Explorer Status Bar */}
                <div className="win98-statusbar">
                  <div className="statusbar-pane">{categoryKeys.length} categories</div>
                  <div className="statusbar-pane">{currentCategoryData.items.length} items</div>
                  <div className="statusbar-pane">My Computer</div>
                </div>
              </div>

              {/* How to Explore Info Card */}
              <div className="how-to-explore-card">
                <div className="how-to-header">
                  <img src="https://win98icons.alexmeub.com/icons/png/help_book_cool-0.png" alt="" className="how-to-img" />
                  <strong>How to explore</strong>
                </div>
                <div className="how-to-item">
                  <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" className="how-to-bullet-img" />
                  <span>Click folders to switch categories</span>
                </div>
                <div className="how-to-item">
                  <img src="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png" alt="" className="how-to-bullet-img" />
                  <span>Click items to view details</span>
                </div>
              </div>
            </div>

            {/* Right Column: Files Grid + Tech Item Details Preview */}
            <div className="techstack-right-col">
              {/* Category Files Grid Window */}
              <div className="win98-window folder-files-window">
                <div className="win98-title-bar">
                  <div className="win98-title-left">
                    <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_small-4.png" alt="" className="win98-title-img" />
                    <span>{activeCategory}</span>
                  </div>
                  <div className="win98-title-buttons">
                    <button className="win98-title-btn">
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
                    </button>
                  </div>
                </div>

                <div className="folder-files-content">
                  <div className="files-grid">
                    {currentCategoryData.items.map((item) => {
                      const isSelected = selectedItem && selectedItem.name === item.name;
                      return (
                        <div 
                          key={item.name}
                          className={`file-grid-item ${isSelected ? 'selected-file' : ''}`}
                          onClick={() => setSelectedItem(item)}
                        >
                          <img 
                            src="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png" 
                            alt="File" 
                            className="file-icon-img" 
                          />
                          <span className="file-grid-label">{item.file}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected File Details / Preview Dialog (Win95 Retro Properties Style) */}
              {selectedItem && (
                <div className="win98-window file-preview-window">
                  <div className="win98-title-bar">
                    <div className="win98-title-left">
                      <img src="https://win98icons.alexmeub.com/icons/png/application_hourglass-0.png" alt="" className="win98-title-img" />
                      <span>Properties - {selectedItem.file}</span>
                    </div>
                    <div className="win98-title-buttons">
                      <button className="win98-title-btn">
                        <svg width="8" height="8" viewBox="0 0 8 8"><path d="M0,0 L2,0 L4,3 L6,0 L8,0 L5,4 L8,8 L6,8 L4,5 L2,8 L0,8 L3,4 Z" fill="black" /></svg>
                      </button>
                    </div>
                  </div>

                  <div className="win98-menubar">
                    <span>File</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>

                  <div className="file-preview-body">
                    <div className="win95-preview-card">
                      <div className="win95-preview-header">
                        <div className="win95-icon-recess">
                          <img 
                            src={selectedItem.logo} 
                            alt={selectedItem.name} 
                            className="win95-tech-logo"
                            onError={(e) => {
                              e.target.src = "https://win98icons.alexmeub.com/icons/png/application_hourglass-0.png";
                            }}
                          />
                        </div>
                        <div className="win95-header-text">
                          <h2 className="win95-tech-title">{selectedItem.name}</h2>
                          <span className="win95-tech-file">Filename: {selectedItem.file} &bull; Size: {selectedItem.size}</span>
                        </div>
                      </div>

                      <fieldset className="win95-fieldset">
                        <legend className="win95-legend">Component Details</legend>
                        <p className="win95-tech-desc">{selectedItem.desc}</p>
                      </fieldset>
                    </div>
                  </div>

                  <div className="win98-statusbar tech-detail-statusbar">
                    <div className="statusbar-pane">Type: Technology</div>
                    <div className="statusbar-pane">Size: {selectedItem.size}</div>
                    <div className="statusbar-pane">Date Modified: Today</div>
                  </div>
                </div>
              )}
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