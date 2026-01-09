import React from 'react'

function About() {
  return (
    <>
      <section className="profile-section" id="about">
        <div className="profile-banner">
          <span className="profile-banner-text">// building things that matter</span>
        </div>
        <div className="profile-info">
          <img
            src="/profile.jpg"
            alt="Clarke Plumo"
            className="profile-photo"
          />
          <h1 className="profile-name">Clarke Plumo</h1>
          <p className="profile-headline">
            <span className="highlight">Full-stack Engineer</span> | Game Developer | Blockchain Enthusiast | AI Power User
          </p>
          <p className="profile-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Philippines
          </p>
          <div className="profile-actions">
            <a href="mailto:clarke.plumo@gmail.com" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact
            </a>
            <a href="https://www.linkedin.com/in/clrke/" target="_blank" rel="noopener noreferrer" className="btn btn-terminal">
              LinkedIn
            </a>
            <a href="https://github.com/clrke" target="_blank" rel="noopener noreferrer" className="btn btn-terminal">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>About</h2>
        <div className="about-text">
          <p>
            Passionate software engineer with extensive experience in building scalable web applications,
            mobile apps, and blockchain solutions. I thrive at the intersection of technology and creativity,
            bringing ideas to life through clean code and thoughtful architecture.
          </p>
          <p>
            From leading backend engineering at one of the Philippines' largest banks to pioneering NFT
            marketplaces on Bitcoin, I've had the privilege of working on projects that impact millions of users.
            Currently exploring the frontiers of VR gaming, healthcare technology, and AI-assisted development
            with tools like Claude Code.
          </p>
        </div>
      </section>
    </>
  )
}

export default About
