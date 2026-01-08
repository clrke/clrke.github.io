import React from 'react'

const projects = [
  {
    id: 'bettergov',
    name: 'BetterGovPH',
    role: 'Early Contributor',
    description: 'An initiative to improve government services and transparency through modern technology solutions.',
    tags: ['GovTech', 'Civic Tech', 'Public Service', 'Transparency'],
    link: 'https://bettergov.ph/',
    imageClass: 'bettergov',
    initial: 'BG',
    image: '/bettergov.webp'
  },
  {
    id: 'unionbank',
    name: 'UnionBank Online',
    role: 'Lead Back-end Engineer',
    description: 'Mobile banking app serving millions of Filipinos. Features include fund transfers, bill payments, check deposits, and real-time account management.',
    tags: ['Mobile Banking', 'iOS', 'Android', 'Finance', 'API Design'],
    link: 'https://apps.apple.com/no/app/unionbank-online/id1242291412',
    imageClass: 'unionbank',
    initial: 'UB',
    image: '/unionbank.webp'
  },
  {
    id: 'ocm',
    name: 'OnChainMonkey',
    role: 'Senior Full-stack Engineer',
    description: 'One of the first 10K PFP collections stored entirely on-chain. First to generate all images and metadata in a single transaction on Ethereum.',
    tags: ['NFT', 'Ethereum', 'Bitcoin', 'Web3', 'Smart Contracts'],
    link: 'https://onchainmonkey.com/',
    imageClass: 'ocm',
    initial: 'OCM',
    image: '/ocm.webp'
  },
  {
    id: 'osura',
    name: 'Osura',
    role: 'Senior Full-stack Engineer',
    description: 'Premier marketplace for high-end Bitcoin Ordinals collections. Curated platform for digital art permanently stored on the Bitcoin blockchain.',
    tags: ['Bitcoin Ordinals', 'NFT Marketplace', 'Web3', 'Digital Art'],
    link: 'https://osura.com/',
    imageClass: 'osura',
    initial: 'OS',
    image: '/osura.webp'
  },
  {
    id: 'squatopia',
    name: 'Squatopia',
    role: 'Owner',
    description: 'Infinite action roguelike VR game where your body is the controller. Squat to launch energy blasts, weave through lasers, and parry fireballs.',
    tags: ['VR', 'Meta Quest', 'Unity', 'Gaming', 'Fitness'],
    link: 'https://www.meta.com/experiences/squatopia-infinite-action-roguelike/5461039960620791/',
    imageClass: 'squatopia',
    initial: 'SQ',
    image: '/squatopia.webp'
  },
  {
    id: 'atmosmed',
    name: 'AtmosMed',
    role: 'CTO',
    description: 'Community pharmacy chain in Tarlac, Philippines. Trusted partner in health and wellness with multiple branches serving the local community.',
    tags: ['Healthcare', 'Pharmacy', 'E-commerce', 'Retail'],
    link: 'https://atmosmed.ph/',
    imageClass: 'atmosmed',
    initial: 'AM',
    image: '/atmosmed.webp'
  }
]

function Projects() {
  return (
    <section className="card" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
                loading="lazy"
              />
            ) : (
              <div className={`project-image placeholder ${project.imageClass}`}>
                {project.initial}
              </div>
            )}
            <div className="project-content">
              <h3>{project.name}</h3>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={`${project.id}-${tag}`} className="tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
