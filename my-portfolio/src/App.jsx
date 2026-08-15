import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';

import { useState, useRef, useEffect, useMemo } from 'react';
import songFile from './assets/LEASE by Takeshi Abo but slightly bitcrushed for nostalgia - (64 Kbps).mp3';
import './App.css';

function TerminalWidget() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const commandList = useMemo(() => [
    { cmd: "whoami", res: "sanjana // software developer" },
    { cmd: "skills --core", res: "react • python • c++ • node.js • iot" },
    { cmd: "projects --ls", res: "4 modules [sentinel, bleepbloop, simuphysics, smartdesk]" },
    { cmd: "github --status", res: "connected // github.com/sanjanavenkatesh05" },
    { cmd: "contact --ping", res: "cyber@pink.net [ready]" }
  ], []);




  useEffect(() => {
    let currentCmd = commandList[commandIndex];
    let currentText = "";
    let charIdx = 0;
    let timeoutId;

    const typeChar = () => {
      if (charIdx < currentCmd.cmd.length) {
        currentText += currentCmd.cmd[charIdx];
        setDisplayedText(currentText);
        charIdx++;
        timeoutId = setTimeout(typeChar, 75);
      } else {
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          setDisplayedText("");
          setCommandIndex((prev) => (prev + 1) % commandList.length);
        }, 3200);
      }
    };

    timeoutId = setTimeout(typeChar, 350);
    return () => clearTimeout(timeoutId);
  }, [commandIndex, commandList]);

  const currentCmd = commandList[commandIndex];

  return (
    <div className="win98-window terminal-window">
      <div className="win98-title-bar">
        <div className="win98-title-left">
          <img
            src="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
            alt=""
            className="win98-title-img"
          />
          <span>COMMAND.COM</span>
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
      <div className="win98-content terminal-content">
        <div className="terminal-log">
          <div className="term-line term-header">CYBER-DOS 98.4 [Version 4.10]</div>
          <div className="term-line term-prompt">
            <span className="term-path">C:\SANJANA&gt;</span> {displayedText}
            {isTyping && <span className="retro-cursor"></span>}
          </div>
          {!isTyping && (
            <div className="term-line term-response">
              <span className="term-arrow">&gt;&gt;</span> {currentCmd.res}
              <span className="retro-cursor"></span>
            </div>
          )}
        </div>
      </div>
      <div className="win98-statusbar sidebar-statusbar">
        <div className="statusbar-pane"><span className="status-dot">●</span> TTY: COM1</div>
        <div className="statusbar-pane">STATUS: OK</div>
      </div>
    </div>
  );
}

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
        <div className="music-display" style={{ padding: '0 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isPlaying ? (
            <>
              <span className="eq-visualizer" title="Playing">
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
              </span>
              <marquee scrollamount="4">▶ PLAYING: Takeshi Abo - LEASE</marquee>
            </>
          ) : (
            <span>■ STOPPED</span>
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
              <a href="https://www.linkedin.com/in/sanjana-venkatesh-899251212/" target="_blank" rel="noreferrer" className="win98-btn">LinkedIn</a>
            </div>
            <div className="link-item">
              <span className="logo-placeholder">{'<>'}</span>
              <a href="https://github.com/sanjanavenkatesh05" target="_blank" rel="noreferrer" className="win98-btn">GitHub</a>
            </div>
            <div className="link-item">
              <span className="logo-placeholder">ig</span>
              <a href="https://www.instagram.com/venkateshsanjana5/" target="_blank" rel="noreferrer" className="win98-btn">Instagram</a>
            </div>
            <div className="link-item">
              <span className="logo-placeholder">lc</span>
              <a href="https://leetcode.com/u/sanjanavenkatesh05/" target="_blank" rel="noreferrer" className="win98-btn">LeetCode</a>
            </div>
            <div className="link-item">
              <span className="logo-placeholder">cc</span>
              <a href="https://www.codechef.com/users/vsanjana_05" target="_blank" rel="noreferrer" className="win98-btn">CodeChef</a>
            </div>
          </div>
          <div className="win98-statusbar sidebar-statusbar">
            <div className="statusbar-pane">5 SHORTCUTS</div>
            <div className="statusbar-pane"><span className="status-dot">●</span> 8080/TCP</div>
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
                hercycle-ai
              </span>
              <a href="https://github.com/khushi897920-lang/hercycle-ai" target="_blank" rel="noreferrer" className="repo-link">github.com/khushi897920-lang/hercycle-ai</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                sentinel
              </span>
              <a href="https://github.com/anshul23102/sentinel" target="_blank" rel="noreferrer" className="repo-link">github.com/anshul23102/sentinel</a>
            </div>
            <div className="repo-item">
              <span className="repo-title">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_closed-4.png" alt="" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                PasoChat
              </span>
              <a href="https://github.com/CodePlaygroundHub/PasoChat" target="_blank" rel="noreferrer" className="repo-link">github.com/CodePlaygroundHub/PasoChat</a>
            </div>
          </div>
          <div className="win98-statusbar sidebar-statusbar">
            <div className="statusbar-pane">3 REPOSITORIES</div>
            <div className="statusbar-pane"><span className="status-dot">●</span> GIT: SYNCED</div>
          </div>
        </div>



        {/* Terminal Widget */}
        <TerminalWidget />
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
              <span className="myspace-header-title" style={{ fontFamily: '"Magnolia Script", "Brush Script MT", "Lucida Handwriting", cursive', fontSize: '3em', lineHeight: '1.1', textDecoration: 'underline', color: 'var(--accent-neon-pink)', backgroundColor: 'transparent', display: 'inline-block', marginBottom: '8px' }}>Sanjana Venkatesh </span>
              <div className="win98-window photo-viewer-window">
                <div className="win98-title-bar">
                  <div className="win98-title-left">
                    <img
                      src="https://win98icons.alexmeub.com/icons/png/kodak_imaging_file-1.png"
                      alt=""
                      className="win98-title-img"
                    />
                    <span>IMAGE_VIEWER.EXE - [me.jpg]</span>
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
                <div className="win98-content photo-viewer-content">
                  <div className="photo-frame-recess">
                    <img src="./src/assets/digicamfx-original-2026-08-15T10-55-28.jpg" alt="me" className="myspace-pic" />
                  </div>
                  <div className="photo-meta-bar">
                    <span className="photo-meta-left">JPEG Image (100% Zoom)</span>
                    <span className="photo-meta-right">● ONLINE</span>
                  </div>
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
                <div className="win98-content about-me-content">
                  <p>
                    Hi, I&apos;m <strong>Sanjana</strong> — a 3rd-year <strong>Computer Science Engineering</strong> student minoring in <strong>VLSI</strong> at RNS Institute of Technology.
                  </p>
                  <p>
                    I enjoy building across the full stack — from scalable web and backend applications all the way down to low-level hardware systems.
                  </p>
                  <div className="about-focus-tags">
                    <span className="edu-label">Focus:</span>
                    <span className="tech-pill-badge">Backend Engineering</span>
                    <span className="tech-pill-badge">AI Systems</span>
                    <span className="tech-pill-badge">Distributed Systems</span>
                  </div>
                </div>
              </div>


              {/* Experience Window */}
              <div className="win98-window">
                <div className="myspace-header-title">experience</div>
                <div className="win98-content exp-compact-content">

                  {/* Experience 01 */}
                  <div className="exp-compact-item">
                    <div className="exp-compact-topline">
                      <div className="exp-compact-title-group">
                        <span className="exp-compact-org">IEEE TechXcelerate</span>
                        <span className="exp-compact-divider">•</span>
                        <span className="exp-compact-role">Software Developer Intern</span>
                      </div>
                      <div className="exp-compact-meta-right">
                        <span className="exp-type-badge">INTERNSHIP</span>
                        <span className="exp-compact-duration">June – October 2025</span>
                      </div>
                    </div>
                    <ul className="star-list exp-compact-list">
                      <li>Engineered a custom physics problem simulator through collaborative software development.</li>
                      <li>Built and integrated an automated retrieval pipeline utilizing text embeddings.</li>
                    </ul>
                  </div>

                  <div className="exp-retro-divider"></div>

                  {/* Experience 02 */}
                  <div className="exp-compact-item">
                    <div className="exp-compact-topline">
                      <div className="exp-compact-title-group">
                        <span className="exp-compact-org">Samsung Innovation Campus</span>
                        <span className="exp-compact-divider">•</span>
                        <span className="exp-compact-role">IoT Intern</span>
                      </div>
                      <div className="exp-compact-meta-right">
                        <span className="exp-type-badge">INTERNSHIP</span>
                        <span className="exp-compact-duration">Sept 2025 – Jul 2026</span>
                      </div>
                    </div>
                    <ul className="star-list exp-compact-list">
                      <li>Selected from over 800 applicants; led a team of 4 to build an end-to-end IoT system.</li>
                      <li>Developed an autonomous smart monitoring system running on a Raspberry Pi Pico.</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
          <div className="win98-statusbar home-statusbar">
            <div className="statusbar-pane status-pane-main"><span className="status-dot">●</span> SYSTEM: ONLINE</div>
            <div className="statusbar-pane">USER: SANJANA</div>
            <div className="statusbar-pane">UPTIME: 99.9%</div>
            <div className="statusbar-pane"><span className="status-dot">●</span> NET: CONNECTED</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const projectsData = [

  {
    id: "01",
    name: "Sentinel Bootloader Simulation",
    displayTitle: "SENTINEL",
    subtitle: "BOOTLOADER & LOW-LEVEL SIMULATION",
    category: "Systems & Bootloader Simulation",
    tech: ["C/C++", "x86 Assembly", "React", "WebAssembly", "JavaScript"],
    description: "An interactive bootloader and low-level system simulation showcasing the boot sequence, memory registers, kernel initialization, and operating system foundations.",
    link: "https://sentinel-bootloader-simulation.vercel.app/",
    repoLink: "https://github.com/sanjanavenkatesh05/sentinel-bootloader-simulation",
    color: "#ffffff"
  },
  {
    id: "02",
    name: "BleepBloop",
    displayTitle: "BLEEPBLOOP",
    subtitle: "REAL-TIME CHAT & SPRING WEBSOCKETS",
    category: "Full Stack & WebSockets",
    tech: ["Spring Boot", "React 19", "WebSockets (STOMP)", "PostgreSQL", "Spring Security", "Docker", "TailwindCSS"],
    description: "A real-time web chat application engineered with Spring Boot and React 19. Features full-duplex messaging via STOMP/SockJS WebSockets, user authentication, public key management, and PostgreSQL persistence.",
    link: "https://github.com/sanjanavenkatesh05/BleepBlop",
    repoLink: "https://github.com/sanjanavenkatesh05/BleepBlop",
    color: "#ffffff"
  },
  {
    id: "03",
    name: "SimuPhysics",
    displayTitle: "SIMUPHYSICS",
    subtitle: "AI-POWERED 2D PHYSICS SIMULATOR",
    category: "AI & Interactive 2D Simulation",
    tech: ["Node.js", "Express", "Matter.js", "Gemini API", "JavaScript", "Render"],
    description: "An educational physics platform converting natural-language prompts into real-time interactive 2D simulations. Features Gemini AI parameter extraction, Matter.js physics engine rendering, and interactive analytical explanations.",
    link: "https://simuphysics-final.onrender.com/",
    repoLink: "https://github.com/sanjanavenkatesh05/SimuPhysics-final",
    color: "#ffffff"
  },
  {
    id: "04",
    name: "SmartDesk",
    displayTitle: "SMARTDESK",
    subtitle: "ESP32 IOT EMBEDDED DASHBOARD",
    category: "Embedded C++ & IoT Hardware",
    tech: ["C/C++", "ESP32", "Adafruit GFX / ST7735", "WiFiClientSecure", "GraphQL", "Capacitive Touch"],
    description: "An autonomous, multi-page IoT workstation dashboard engineered in C++ for the ESP32 with SPI TFT display. Features direct LeetCode GraphQL polling over SSL, GitHub/Weather stats, capacitive touch navigation, and particle physics celebration effects.",
    link: "https://github.com/sanjanavenkatesh05/smartDesk",
    repoLink: "https://github.com/sanjanavenkatesh05/smartDesk",
    color: "#ffffff"
  }
];

function ProjectAnimationVisualizer({ project }) {
  if (project.id === "01") {
    // Sentinel: Bootloader BIOS & Memory Hex Register Visualizer
    return (
      <div className="anim-visualizer-container sentinel-visualizer">
        <div className="sentinel-bios-header">
          <span className="status-dot">●</span> SENTINEL BIOS v1.0.4 - [BOOT: 0x7C00]
        </div>
        <div className="sentinel-hex-stream">
          <div className="hex-row"><span className="hex-addr">0x7C00</span> <span className="hex-bytes">FA 31 C0 8E D8 8E C0 8E</span> <span className="hex-status">OK</span></div>
          <div className="hex-row"><span className="hex-addr">0x7C08</span> <span className="hex-bytes">BC 00 7C FB B8 00 00 CD</span> <span className="hex-status">OK</span></div>
          <div className="hex-row active-row"><span className="hex-addr">0x8000</span> <span className="hex-bytes">EA 00 00 08 00 66 B8 10</span> <span className="hex-status pulsing">STAGE_2</span></div>
        </div>
        <div className="sentinel-reg-bar">
          <span>EAX: 0x00007C00</span>
          <span>CS: 0x08</span>
          <span>MODE: PROTECTED</span>
        </div>
        <div className="sentinel-boot-progress">
          <div className="sentinel-boot-bar"></div>
        </div>
      </div>
    );
  }

  if (project.id === "02") {
    // BleepBloop: Spring Boot + React 19 WebSocket STOMP Chat Simulation
    return (
      <div className="anim-visualizer-container bleepbloop-visualizer">
        <div className="bleep-socket-header">
          <span className="status-dot">●</span> WS_BROKER: /topic/public [STOMP :8081]
        </div>
        <div className="bleep-chat-stream">
          <div className="bleep-bubble incoming">
            <span className="bubble-user">peer@client:</span>
            <span className="bubble-msg">CONNECT ws://localhost:8081/ws</span>
          </div>
          <div className="bleep-bubble sys-msg">
            <span className="bubble-sys">[STOMP_CONNECTED]</span>
            <span className="bubble-msg">auth: Bearer • key_exchange: OK</span>
          </div>
          <div className="bleep-bubble outgoing">
            <span className="bubble-user">sanjana:</span>
            <span className="bubble-msg">Subscribed to /queue/messages ⚡</span>
          </div>
          <div className="bleep-typing-row">
            <span className="bubble-user">peer@client</span>
            <span className="bleep-typing-dots"><span></span><span></span><span></span></span>
          </div>
        </div>
        <div className="bleep-bottom-bar">
          <span>PGSQL: 5432 [ACTIVE]</span>
          <span>USERS: 2 ONLINE</span>
          <span>STOMP: 101 OK</span>
        </div>
      </div>
    );
  }

  if (project.id === "03") {
    // SimuPhysics: 2D Physics Engine (Matter.js) + Gemini AI Trajectory Simulation
    return (
      <div className="anim-visualizer-container simuphysics-visualizer">
        <div className="simu-header">
          <span className="status-dot">●</span> GEMINI_AI + MATTER.JS [2D ENGINE]
        </div>
        <div className="simu-canvas-wrap">
          <svg viewBox="0 0 300 95" className="simu-svg-canvas">
            {/* Ground */}
            <line x1="10" y1="85" x2="290" y2="85" className="simu-ground-line" />
            {/* Parabolic Trajectory Arc */}
            <path d="M 25 85 Q 140 10 255 85" className="simu-parabola-path" />
            {/* Launch velocity arrow */}
            <line x1="25" y1="85" x2="65" y2="52" className="simu-vector-arrow" />
            {/* Target collision box */}
            <rect x="245" y="70" width="16" height="15" className="simu-target-box" />
            {/* Moving projectile body */}
            <circle cx="25" cy="85" r="5" className="simu-projectile-ball" />
            {/* Angle notation */}
            <text x="42" y="80" className="simu-angle-txt">θ=45°</text>
          </svg>
        </div>
        <div className="simu-bottom-bar">
          <span>v₀ = 28 m/s</span>
          <span>g = 9.81 m/s²</span>
          <span>PROMPT: /parabola</span>
        </div>
      </div>
    );
  }

  if (project.id === "04") {
    // SmartDesk: ESP32 + SPI TFT 160x128 LeetCode GraphQL & IoT Dashboard Simulation
    return (
      <div className="anim-visualizer-container smartdesk-visualizer">
        <div className="smartdesk-tft-header">
          <span className="status-dot">●</span> ESP32-WROOM [160x128 SPI TFT]
        </div>
        <div className="smartdesk-tft-screen">
          <div className="tft-metric-row">
            <span className="tft-label">LEETCODE:</span>
            <span className="tft-val solved-val">248 SOLVED</span>
            <span className="tft-badge-acc">ACCEPTED +1</span>
          </div>
          <div className="tft-particle-burst">
            <span className="spark spark-1">★</span>
            <span className="spark spark-2">✦</span>
            <span className="spark spark-3">★</span>
            <span className="spark spark-4">✦</span>
          </div>
          <div className="tft-metric-row">
            <span className="tft-label">WEATHER:</span>
            <span className="tft-val">26°C SUNNY</span>
            <span className="tft-label">GITHUB:</span>
            <span className="tft-val">14d STREAK</span>
          </div>
        </div>
        <div className="smartdesk-bottom-bar">
          <span>TOUCH: GPIO27 [PG 1/4]</span>
          <span>NTP: SYNCED</span>
          <span>SSL: 443 OK</span>
        </div>
      </div>
    );
  }


  return null;
}

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
                    {currentProject.link.includes('vercel.app') || currentProject.link.includes('onrender.com') ? 'LAUNCH APPLICATION ↗' : 'VIEW REPOSITORY ↗'}
                  </div>

                  <div className="project-display-header">
                    <div className="card-center-title" style={{ color: currentProject.color }}>
                      {currentProject.displayTitle}
                    </div>
                    <span className="card-subtitle-text">{currentProject.subtitle}</span>
                  </div>

                  {/* Dynamic Project-Specific Retro Animation */}
                  <ProjectAnimationVisualizer project={currentProject} />

                  <div className="card-bottom-info">
                    <span className="card-launch-status"><span className="status-dot">●</span> CLICK TO LAUNCH LIVE APPLICATION ↗</span>
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
                {currentProject.repoLink && (
                  <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                    <span className="edu-label">Source:</span>{' '}
                    <a href={currentProject.repoLink} target="_blank" rel="noreferrer" className="repo-link">
                      {currentProject.repoLink.replace('https://', '')}
                    </a>
                  </div>
                )}
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
          <div className="win98-statusbar projects-statusbar">
            <div className="statusbar-pane status-pane-main"><span className="status-dot">●</span> PROJECT_ID: {currentProject.id} / 04</div>
            <div className="statusbar-pane">CATEGORY: {currentProject.category}</div>
            <div className="statusbar-pane">STATUS: READY</div>
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
        <p>Email me at <a href="mailto:cyber@pink.net">cyber@pink.net</a><span className="retro-cursor"></span></p>
      </div>
    </div>

  );
}

const searchDatabase = [
  // Projects
  {
    id: "proj-sentinel",
    title: "Sentinel Bootloader Simulation",
    category: "PROJECT",
    route: "/projects",
    desc: "x86 assembly & C BIOS bootloader matrix simulator",
    tags: ["assembly", "c", "x86", "bootloader", "qemu", "os", "sentinel"],
    icon: "https://win98icons.alexmeub.com/icons/png/console_prompt-0.png"
  },
  {
    id: "proj-bleepbloop",
    title: "BleepBloop Real-Time Chat",
    category: "PROJECT",
    route: "/projects",
    desc: "Spring Boot + React + WebSockets (STOMP) instant messaging",
    tags: ["spring boot", "react", "websockets", "stomp", "postgresql", "chat", "bleepbloop"],
    icon: "https://win98icons.alexmeub.com/icons/png/network_cool_two_pcs-0.png"
  },
  {
    id: "proj-simuphysics",
    title: "SimuPhysics AI Simulator",
    category: "PROJECT",
    route: "/projects",
    desc: "AI prompt-to-simulation engine using Node.js & Matter.js",
    tags: ["matter.js", "gemini", "ai", "node.js", "physics", "simulation", "simuphysics"],
    icon: "https://win98icons.alexmeub.com/icons/png/paint_file-2.png"
  },
  {
    id: "proj-smartdesk",
    title: "SmartDesk IoT Workstation",
    category: "PROJECT",
    route: "/projects",
    desc: "ESP32 C++ TFT dashboard with LeetCode GraphQL & weather",
    tags: ["esp32", "c++", "iot", "graphql", "tft", "leetcode", "smartdesk"],
    icon: "https://win98icons.alexmeub.com/icons/png/modem-5.png"
  },
  // Tech Stack
  {
    id: "tech-cpp",
    title: "C++ (Systems & Embedded)",
    category: "TECH",
    route: "/techstack",
    desc: "Low-level system architecture & ESP32 firmware",
    tags: ["c++", "cpp", "systems", "embedded", "firmware"],
    icon: "https://win98icons.alexmeub.com/icons/png/chm-2.png"
  },
  {
    id: "tech-python",
    title: "Python (AI & Scripts)",
    category: "TECH",
    route: "/techstack",
    desc: "Data processing, embeddings & backend automation",
    tags: ["python", "ai", "ml", "embeddings", "scripts"],
    icon: "https://win98icons.alexmeub.com/icons/png/chm-2.png"
  },
  {
    id: "tech-react",
    title: "React & JavaScript",
    category: "TECH",
    route: "/techstack",
    desc: "Modern reactive frontends & SPAs",
    tags: ["react", "javascript", "frontend", "web", "jsx"],
    icon: "https://win98icons.alexmeub.com/icons/png/chm-2.png"
  },
  {
    id: "tech-springboot",
    title: "Spring Boot & Java",
    category: "TECH",
    route: "/techstack",
    desc: "Robust enterprise REST APIs & WebSocket servers",
    tags: ["spring boot", "java", "backend", "api", "jpa"],
    icon: "https://win98icons.alexmeub.com/icons/png/chm-2.png"
  },
  {
    id: "tech-vlsi",
    title: "VLSI & Hardware Design",
    category: "TECH",
    route: "/techstack",
    desc: "Digital circuit design & microcontroller integration",
    tags: ["vlsi", "hardware", "circuits", "embedded"],
    icon: "https://win98icons.alexmeub.com/icons/png/chm-2.png"
  },
  // Experience
  {
    id: "exp-techxcelerate",
    title: "IEEE TechXcelerate Intern",
    category: "EXP",
    route: "/",
    desc: "Software Developer Intern • Physics simulator & embeddings",
    tags: ["ieee", "internship", "experience", "work", "techxcelerate"],
    icon: "https://win98icons.alexmeub.com/icons/png/briefcase-2.png"
  },
  {
    id: "exp-samsung",
    title: "Samsung Innovation Campus",
    category: "EXP",
    route: "/",
    desc: "IoT Intern • Raspberry Pi Pico monitoring system",
    tags: ["samsung", "iot", "internship", "experience", "raspberry pi pico"],
    icon: "https://win98icons.alexmeub.com/icons/png/briefcase-2.png"
  },
  // Education & About
  {
    id: "edu-rnsit",
    title: "Education - RNSIT Bengaluru",
    category: "ABOUT",
    route: "/",
    desc: "Computer Science Engineering (2023 - 2027), Minor in VLSI",
    tags: ["education", "rnsit", "college", "btech", "degree", "undergrad", "about"],
    icon: "https://win98icons.alexmeub.com/icons/png/certificate-0.png"
  },
  // Contact & Socials
  {
    id: "link-github",
    title: "GitHub Profile",
    category: "LINK",
    externalUrl: "https://github.com/sanjanavenkatesh05",
    desc: "Browse repositories, open-source code & commits",
    tags: ["github", "code", "git", "repos", "projects"],
    icon: "https://win98icons.alexmeub.com/icons/png/url1-2.png"
  },
  {
    id: "link-linkedin",
    title: "LinkedIn Profile",
    category: "LINK",
    externalUrl: "https://www.linkedin.com/in/sanjana-venkatesh-899251212/",
    desc: "Professional networking & background",
    tags: ["linkedin", "social", "network", "connect"],
    icon: "https://win98icons.alexmeub.com/icons/png/url1-2.png"
  },
  {
    id: "link-leetcode",
    title: "LeetCode Profile",
    category: "LINK",
    externalUrl: "https://leetcode.com/u/sanjanavenkatesh05/",
    desc: "Data structures & algorithms problem solving",
    tags: ["leetcode", "dsa", "algorithms", "coding"],
    icon: "https://win98icons.alexmeub.com/icons/png/url1-2.png"
  },
  {
    id: "link-resume",
    title: "Download Resume",
    category: "FILE",
    downloadUrl: "/resume.pdf",
    desc: "Download official PDF resume",
    tags: ["resume", "cv", "pdf", "download"],
    icon: "https://win98icons.alexmeub.com/icons/png/notepad-0.png"
  },
  {
    id: "page-contact",
    title: "Contact Sanjana",
    category: "PAGE",
    route: "/contact",
    desc: "Send a message or get in touch",
    tags: ["contact", "email", "message", "reach"],
    icon: "https://win98icons.alexmeub.com/icons/png/message_envelope_open-0.png"
  }
];

function RetroSearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchDatabase.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchTags = item.tags.some(tag => tag.toLowerCase().includes(q));
      return matchTitle || matchCategory || matchDesc || matchTags;
    });
  }, [query]);

  const handleSelect = (item) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.downloadUrl) {
      const link = document.createElement('a');
      link.href = item.downloadUrl;
      link.download = "Sanjana_Venkatesh_Resume.pdf";
      link.click();
    } else if (item.route) {
      navigate(item.route);
    }
    setIsOpen(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Enter" && results.length > 0) {
        handleSelect(results[0]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className="search-bar">
        <img
          src="https://win98icons.alexmeub.com/icons/png/search_file-0.png"
          alt=""
          className="search-icon-img"
        />
        <input
          type="text"
          className="search-input"
          placeholder="Find: C++, IoT, Projects..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            title="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <div className="retro-search-dropdown">
          <div className="search-dropdown-titlebar">
            <div className="search-dropdown-title-left">
              <img
                src="https://win98icons.alexmeub.com/icons/png/search_file-0.png"
                alt=""
                className="search-dropdown-icon"
              />
              <span>FIND_FILES: &quot;{query}&quot;</span>
            </div>
            <span className="search-dropdown-count">{results.length} found</span>
          </div>

          <div className="search-results-list">
            {results.length > 0 ? (
              results.map((item, idx) => (
                <div
                  key={item.id}
                  className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <img src={item.icon} alt="" className="search-item-icon" />
                  <div className="search-item-info">
                    <div className="search-item-top">
                      <span className="search-item-title">{item.title}</span>
                      <span className="search-item-badge">[{item.category}]</span>
                    </div>
                    <span className="search-item-desc">{item.desc}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-empty-state">
                <span>0 matching system records found for &quot;{query}&quot;</span>
              </div>
            )}
          </div>

          <div className="search-dropdown-footer">
            <span>[↑/↓] Navigate</span>
            <span>[ENTER] Open</span>
            <span>[ESC] Close</span>
          </div>
        </div>
      )}
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

          <RetroSearchBar />

          <nav className="nav-buttons">


            <NavLink to="/" end className={({ isActive }) => `win98-btn ${isActive ? 'active' : ''}`}>
              <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer_cool-0.png" alt="" className="win98-nav-icon" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `win98-btn ${isActive ? 'active' : ''}`}>
              <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs_cool-4.png" alt="" className="win98-nav-icon" />
              <span>My Projects</span>
            </NavLink>
            <NavLink to="/techstack" className={({ isActive }) => `win98-btn ${isActive ? 'active' : ''}`}>
              <img src="https://win98icons.alexmeub.com/icons/png/chm-2.png" alt="" className="win98-nav-icon" />
              <span>My Techstack</span>
            </NavLink>
            <a href="/resume.pdf" download className="win98-btn">
              <img src="https://win98icons.alexmeub.com/icons/png/notepad-0.png" alt="" className="win98-nav-icon" />
              <span>Resume</span>
            </a>
            <NavLink to="/contact" className={({ isActive }) => `win98-btn ${isActive ? 'active' : ''}`}>
              <img src="https://win98icons.alexmeub.com/icons/png/message_envelope_open-0.png" alt="" className="win98-nav-icon" />
              <span>Contact</span>
            </NavLink>
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