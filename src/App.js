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
    { icon: "/icons/edge.jpg", name: "Edge" },
    { icon: "/icons/mail.png", name: "Mail" },
    { icon: "/icons/calendar.webp", name: "Calendar" },
    { icon: "/icons/store.png", name: "Microsoft Store" },
    { icon: "/icons/photos.png", name: "Photos" },
    { icon: "/icons/settings.png", name: "Settings" },
    { icon: "/icons/adobe.jpg", name: "Adobe Creative" },
    { icon: "/icons/solitaire.jpeg", name: "Solitaire" },
    { icon: "/icons/spotify.png", name: "Spotify" },
    { icon: "/icons/disney.jpg", name: "Disney+" },
    { icon: "/icons/xbox.jpg", name: "Xbox" },
    { icon: "/icons/prime.png", name: "Prime Video" },
    { icon: "/icons/instagram.jpg", name: "Instagram" },
    { icon: "/icons/tiktok.jpg", name: "TikTok" },
    { icon: "/icons/facebook.png", name: "Facebook" },
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
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/windows_loading.gif"}
          alt="Loading"
          style={{ marginBottom: "20px" }}
        />
        <h1 style={{ color: "white", fontSize: "32px", margin: 0 }}>Windows</h1>
        <button
          onClick={handleContinue}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Tap to Continue
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/windows_desktop.jpg"})`,
        backgroundSize: "cover",
        height: "100vh",
        color: "white",
        fontFamily: "Segoe UI, sans-serif",
        overflow: "hidden",
      }}
    >
      {showStartMenu && (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            width: "450px",
            margin: "50px auto",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0" }}>Pinned</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "15px",
              justifyItems: "center",
            }}
          >
            {pinnedApps.map((app, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <img
                  src={process.env.PUBLIC_URL + app.icon}
                  alt={app.name}
                  style={{ width: "40px", height: "40px" }}
                />
                <div style={{ fontSize: "10px", marginTop: "4px" }}>{app.name}</div>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: "20px", marginBottom: "5px" }}>Recommended</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {recommended.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  padding: "8px",
                  textDecoration: "none",
                  color: "white",
                  gap: "8px",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/icons/document.png"}
                  alt="doc"
                  style={{ width: "24px" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: "bold" }}>{item.title}</div>
                  <div style={{ fontSize: "10px", color: "#ccc" }}>{item.date}</div>
                </div>
              </a>
            ))}
          </div>

          <div
            style={{
              marginTop: "15px",
              borderTop: "1px solid gray",
              paddingTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>Cyristal N. Joseph</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <img
                src={process.env.PUBLIC_URL + "/icons/user.png"}
                alt="user"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() => window.open(process.env.PUBLIC_URL + "/about.pdf")}
              />
              <img
                src={process.env.PUBLIC_URL + "/icons/document.png"}
                alt="document"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() => window.open(process.env.PUBLIC_URL + "/resume.pdf")}
              />
              <img
                src={process.env.PUBLIC_URL + "/icons/folder.png"}
                alt="folder"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() => setShowCerts(true)}
              />
              <img
                src={process.env.PUBLIC_URL + "/icons/settings.png"}
                alt="settings"
                style={{ width: "20px", cursor: "pointer" }}
                onClick={() => window.open(process.env.PUBLIC_URL + "/return_the_slab.gif")}
              />
            </div>
          </div>
        </div>
      )}

      {showCerts && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#222",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              color: "white",
            }}
          >
            <h3>Certifications</h3>
            <ul style={{ fontSize: "12px", paddingLeft: "20px" }}>
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowCerts(false)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                background: "#555",
                border: "none",
                color: "white",
                borderRadius: "4px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "48px",
          background: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/icons/start.webp"}
          alt="Start"
          style={{ height: "28px", cursor: "pointer" }}
          onClick={() => setShowStartMenu(!showStartMenu)}
        />
        <img
          src={process.env.PUBLIC_URL + "/icons/folder.png"}
          alt="Folder"
          style={{ height: "28px", cursor: "pointer" }}
        />
        <img
          src={process.env.PUBLIC_URL + "/icons/edge.jpg"}
          alt="Edge"
          style={{ height: "28px", cursor: "pointer" }}
        />
        <img
          src={process.env.PUBLIC_URL + "/icons/paint.jpg"}
          alt="Paint"
          style={{ height: "28px", cursor: "pointer" }}
          onClick={() => window.open(process.env.PUBLIC_URL + "/space_chicken.jpg")}
        />
      </div>
    </div>
  );
};

export default App;
