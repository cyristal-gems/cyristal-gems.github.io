import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [showMain, setShowMain] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(true);
  const [showCerts, setShowCerts] = useState(false);

  const handleContinue = () => {
    setPlayAudio(true);
    setTimeout(() => setShowMain(true), 2500);
  };

  useEffect(() => {
    if (playAudio) {
      const audio = new Audio(process.env.PUBLIC_URL + "/visitor.mp3");
      audio.play();
    }
  }, [playAudio]);

  const pinnedApps = [
    { icon: "/icons/edge.jpg", name: "Edge", link: "/mock_pages/google.png" },
    { icon: "/icons/mail.png", name: "Mail" },
    { icon: "/icons/calendar.webp", name: "Calendar" },
    { icon: "/icons/store.png", name: "Microsoft Store", link: "/mock_pages/store.jpg" },
    { icon: "/icons/photos.png", name: "Photos", action: () => window.open("/fullscreen.html?img=family_photo.jpg") },
    { icon: "/icons/settings.png", name: "Settings", action: () => window.open("/mock_pages/Katz.gif") },
    { icon: "/icons/adobe.jpg", name: "Adobe Creative" },
    { icon: "/icons/solitaire.jpeg", name: "Solitaire", link: "/mock_pages/solitaire.jpg" },
    { icon: "/icons/spotify.png", name: "Spotify", link: "/mock_pages/spotify.jpg" },
    { icon: "/icons/disney.jpg", name: "Disney+", link: "/mock_pages/disney.webp" },
    { icon: "/icons/xbox.jpg", name: "Xbox" },
    { icon: "/icons/prime.png", name: "Prime Video", link: "/mock_pages/prime_video.png" },
    { icon: "/icons/instagram.jpg", name: "Instagram", link: "/mock_pages/instagram.jpg" },
    { icon: "/icons/tiktok.jpg", name: "TikTok" },
    { icon: "/icons/facebook.png", name: "Facebook", link: "/mock_pages/facebook.png" },
    { icon: "/icons/calculator.jpg", name: "Calculator" },
  ];

  const recommended = [
    {
      title: "AWS S3 Static Website Lab",
      link: "https://github.com/cyristal-gems/aws-s3-static-website-lab",
      date: "June 29, 2025",
    },
    {
      title: "Very Legit, Very Legal",
      link: "https://github.com/cyristal-gems/verylegit_verylegal",
      date: "June 3, 2025",
    },
  ];

  const certifications = [
    "AWS Certified Cloud Practitioner",
    "Cisco Networking Basics",
    "Cisco Cybersecurity Essentials",
    "CompTIA ITF+",
    "CompTIA A+",
    "CompTIA Security+",
    "Google Certified IT Support Professional",
    "Google Certified Project Management Professional",
    "Lean Six Sigma Certified Green Belt",
  ];

  if (!showMain) {
    return (
      <div className="loading-screen">
        <img src="/windows_loading.gif" alt="Loading" />
        <h1>Windows</h1>
        <button onClick={handleContinue}>Tap to Continue</button>
      </div>
    );
  }

  return (
    <div className="desktop">
      {showStartMenu && (
        <div className="start-menu">
          <div className="pinned-apps">
            {pinnedApps.map((app, index) => (
              <div
                key={index}
                className="app-icon"
                onClick={() => {
                  if (app.link) {
                    window.open(app.link, "_blank");
                  } else if (app.action) {
                    app.action();
                  }
                }}
              >
                <img src={app.icon} alt={app.name} />
                <div>{app.name}</div>
              </div>
            ))}
          </div>

          <h4>Recommended</h4>
          {recommended.map((item, idx) => (
            <a key={idx} className="recommended-item" href={item.link} target="_blank" rel="noopener noreferrer">
              <img src="/icons/document.png" alt="doc" />
              <div>
                <div>{item.title}</div>
                <div className="date">{item.date}</div>
              </div>
            </a>
          ))}

          <div className="user-row">
            <div>Cyristal N. Joseph</div>
            <div className="user-actions">
              <img src="/icons/user.png" alt="user" onClick={() => window.open("/about.pdf")} />
              <img src="/icons/document.png" alt="resume" onClick={() => window.open("/resume.pdf")} />
              <img src="/icons/folder.png" alt="certs" onClick={() => setShowCerts(true)} />
              <img src="/icons/settings.png" alt="linkedin" onClick={() => window.open("https://www.linkedin.com/in/cyristalj/")} />
            </div>
          </div>
        </div>
      )}

      {showCerts && (
        <div className="cert-modal">
          <div className="cert-content">
            <h3>Certifications</h3>
            <ul>
              {certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
            <button onClick={() => setShowCerts(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="taskbar">
        <img src="/icons/edge.jpg" alt="Edge" onClick={() => window.open("/mock_pages/google.png")}/>
        <img src="/icons/folder.png" alt="Folder" />
        <img src="/icons/start.webp" alt="Start" onClick={() => setShowStartMenu(!showStartMenu)} />
        <img src="/icons/paint.jpg" alt="Paint" onClick={() => window.open("/mock_pages/Katz.gif")} />
        <input className="search-input" type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default App;
