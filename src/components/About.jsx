function About() {
  return (
    <>
      <section className="profile-section" id="about">
        <div className="profile-banner">
          <span className="profile-banner-text">
            {'// building things that matter'}
          </span>
        </div>
        <div className="profile-info">
          <img
            src="/profile.jpg"
            alt="Clarke Plumo"
            className="profile-photo"
          />
          <h1 className="profile-name">Clarke Plumo</h1>
          <p className="profile-headline">
            <span className="highlight">Principal Software Engineer</span> |
            Entrepreneur | Blockchain & VR Developer
          </p>
          <p className="profile-location">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Philippines
          </p>
          <div className="profile-actions">
            <a href="mailto:clarke.plumo@gmail.com" className="btn btn-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact
            </a>
            <a
              href="https://www.linkedin.com/in/clrke/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-terminal"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/clrke"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-terminal"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>About</h2>
        <div className="about-text">
          <p>
            Principal-level engineer with 10+ years designing and delivering
            high-scale systems across fintech, Web3, and consumer products.
            Track record of architecting platforms that process millions of
            transactions, leading distributed engineering teams, and founding
            technology-driven businesses.
          </p>
          <p>
            Led backend engineering for Union Bank&apos;s mobile app serving
            millions of Filipinos. Contributed 1,200+ commits to a multi-chain
            NFT platform. Currently shipping a VR fitness game for Meta Quest
            and running a pharmacy chain as CTO. Deep expertise in system
            design, blockchain infrastructure, and full-stack development at
            scale.
          </p>
        </div>
      </section>
    </>
  )
}

export default About
