import React, { useState } from "react";
import "./App.css";

function App() {
  const [showStartMenu, setShowStartMenu] = useState(true);
  const toggleStartMenu = () => setShowStartMenu(!showStartMenu);

  const handleContinue = () => {
    document.querySelector(".loading-screen").style.display = "none";
    const audio = document.getElementById("visitorAudio");
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  const openPopup = (src) => {
    const popup = window.open("", "popup", "width=800,height=600");
    popup.document.write(
      `<html><head><title>Popup</title></head><body style="margin:0;"><img src="${src}" style="width:100%;height:100%;object-fit:contain;"/></body></html>`
    );
  };

  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/windows_desktop.jpg)` }}
    >
      {/* Loading Screen */}
      <div className="loading-screen">
        <img
          src={`${process.env.PUBLIC_URL}/windows_loading.gif`}
          alt="Loading..."
          className="loading-gif"
        />
        <audio id="visitorAudio" src={`${process.env.PUBLIC_URL}/visitor.mp3`} />
        <button className="enter-button" onClick={handleContinue}>
          Tap to Continue
        </button>
      </div>

      {/* Windows Taskbar */}
      <div className="taskbar">
        <img
          src={`${process.env.PUBLIC_URL}/icons/edge.jpg`}
          alt="Edge"
          className="taskbar-icon"
          onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/google.png`)}
        />
        <img
          src={`${process.env.PUBLIC_URL}/icons/start.webp`}
          alt="Start"
          className="taskbar-icon"
          onClick={toggleStartMenu}
        />
        <img
          src={`${process.env.PUBLIC_URL}/icons/folder.png`}
          alt="Folder"
          className="taskbar-icon"
        />
        <img
          src={`${process.env.PUBLIC_URL}/icons/paint.jpg`}
          alt="Paint"
          className="taskbar-icon"
          onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/katz.gif`)}
        />
        <input type="text" placeholder="Search" className="taskbar-search" />
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="start-menu">
          {/* Pinned Apps */}
          <div className="pinned">
            <img src={`${process.env.PUBLIC_URL}/icons/edge.jpg`} alt="Edge" />
            <img src={`${process.env.PUBLIC_URL}/icons/mail.png`} alt="Mail" />
            <img src={`${process.env.PUBLIC_URL}/icons/calendar.webp`} alt="Calendar" />
            <img src={`${process.env.PUBLIC_URL}/icons/microsoft.svg`} alt="Microsoft Store" />
            <img
              src={`${process.env.PUBLIC_URL}/icons/photos.png`}
              alt="Photos"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/family_photo.jpg`)}
            />
            <img
              src={`${process.env.PUBLIC_URL}/icons/settings.jpg`}
              alt="Settings"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/return_the_slab.gif`)}
            />
            <img src={`${process.env.PUBLIC_URL}/icons/adobe.jpg`} alt="Adobe" />
            <img
              src={`${process.env.PUBLIC_URL}/icons/solitaire.jpeg`}
              alt="Solitaire"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/solitaire.jpg`)}
            />
            <img
              src={`${process.env.PUBLIC_URL}/icons/spotify.png`}
              alt="Spotify"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/spotify.jpg`)}
            />
            <img
              src={`${process.env.PUBLIC_URL}/icons/disney.jpg`}
              alt="Disney+"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/disney.webp`)}
            />
            <img src={`${process.env.PUBLIC_URL}/icons/xbox.jpg`} alt="Xbox" />
            <img
              src={`${process.env.PUBLIC_URL}/icons/prime.png`}
              alt="Prime"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/prime_video.png`)}
            />
            <img
              src={`${process.env.PUBLIC_URL}/icons/instagram.jpg`}
              alt="Instagram"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/instagram.jpg`)}
            />
            <img src={`${process.env.PUBLIC_URL}/icons/tiktok.jpg`} alt="TikTok" />
            <img
              src={`${process.env.PUBLIC_URL}/icons/facebook.png`}
              alt="Facebook"
              onClick={() => openPopup(`${process.env.PUBLIC_URL}/mock_pages/facebook.png`)}
            />
            <img src={`${process.env.PUBLIC_URL}/icons/calculator.jpg`} alt="Calculator" />
          </div>

          {/* Recommended */}
         <div className="recommended">
  <div className="recommended-item">
    📄 <strong>Basic Cisco Router and Switch Configuration Lab</strong><br />
    <a href="https://github.com/cyristal-gems/cisco_packet_tracer_lab" target="_blank" rel="noreferrer">View Lab</a><br />
    <small>July 23, 2025</small>
  </div>

  <div className="recommended-item">
    📄 <strong>AWS S3 Static Website Lab</strong><br />
    <a href="https://github.com/cyristal-gems/aws-s3-static-website-lab" target="_blank" rel="noreferrer">View Lab</a><br />
    <small>June 21, 2023</small>
  </div>

  <div className="recommended-item">
    📄 <strong>Very Legit, Very Legal</strong><br />
    <a href="https://github.com/cyristal-gems/verylegit_verylegal" target="_blank" rel="noreferrer">View Lab</a><br />
    <small>June 3, 2023</small>
  </div>
</div>

          {/* User Info */}
          <div className="user-info">
            <p>Cyristal N. Joseph</p>
            <div className="links">
              <a href={`${process.env.PUBLIC_URL}/about.pdf`} target="_blank" rel="noopener noreferrer">📄</a>
              <a href={`${process.env.PUBLIC_URL}/resume.pdf`} target="_blank" rel="noopener noreferrer">📄</a>
              <a href="https://www.credly.com/earner/earned/badge/2723cacf-83e6-43e8-9ab6-52fab67edb9e" target="_blank" rel="noopener noreferrer">ITF+</a>
              <a href="https://www.credly.com/earner/earned/badge/8e86e6d4-7682-4b03-b01f-afe73ca6b4c2" target="_blank" rel="noopener noreferrer">A+</a>
              <a href="https://www.credly.com/earner/earned/badge/b3683b34-c835-444f-b156-e77ef028808b" target="_blank" rel="noopener noreferrer">Security+</a>
              <a href="https://www.credly.com/earner/earned/badge/b2c39d79-cda3-49c7-9949-3cd0e8b94918" target="_blank" rel="noopener noreferrer">AWS CCP</a>
              <a href={`${process.env.PUBLIC_URL}/certs/ssgb.pdf`} target="_blank" rel="noopener noreferrer">SSGB</a>
              <a href={`${process.env.PUBLIC_URL}/certs/google_it.pdf`} target="_blank" rel="noopener noreferrer">Google IT</a>
              <a href={`${process.env.PUBLIC_URL}/certs/google_pm.pdf`} target="_blank" rel="noopener noreferrer">Google PM</a>
              <a href="https://www.linkedin.com/in/cyristalj/" target="_blank" rel="noopener noreferrer">🔗</a>
            </div>
          </div>
        </div>
      )}

      {!showStartMenu && (
        <div className="start-minimized">
          <img
            src={`${process.env.PUBLIC_URL}/le_quack.gif`}
            alt="Le Quack"
            onClick={() => openPopup(`${process.env.PUBLIC_URL}/le_quack.gif`)}
          />
          <p className="minimize-message">Oh sure, just minimize me... again.</p>
        </div>
      )}
    </div>
  );
}

export default App;
