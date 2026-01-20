const projects = [
  {
    id: 'bettergov',
    name: 'BetterGovPH',
    role: 'Technical Contributor',
    description:
      'Open-source government services portal with 50+ contributors. React frontend with 95+ components, Meilisearch indexing 1,000+ services, and Cloudflare Workers serverless backend.',
    tags: ['React', 'TypeScript', 'Cloudflare', 'Meilisearch', 'Open Source'],
    link: 'https://bettergov.ph/',
    imageClass: 'bettergov',
    initial: 'BG',
    image: '/bettergov.webp'
  },
  {
    id: 'unionbank',
    name: 'UnionBank Online',
    role: 'Lead Back-end Engineer',
    description:
      'Mobile banking platform serving millions of Filipinos. Architected Java Spring Boot microservices on bare metal processing millions of daily transactions.',
    tags: ['Java', 'Spring Boot', 'Fintech', 'Microservices', 'API Design'],
    link: 'https://apps.apple.com/no/app/unionbank-online/id1242291412',
    imageClass: 'unionbank',
    initial: 'UB',
    image: '/unionbank.webp'
  },
  {
    id: 'ocm',
    name: 'OnChainMonkey',
    role: 'Senior Full-stack Engineer',
    description:
      'Multi-chain NFT platform with 10,000+ token holders. Contributed 1,282 commits to 32-package TypeScript monorepo (47,500+ LOC) across Ethereum, Bitcoin, and Stacks.',
    tags: ['TypeScript', 'Ethereum', 'Bitcoin', 'Web3', 'Monorepo'],
    link: 'https://onchainmonkey.com/',
    imageClass: 'ocm',
    initial: 'OCM',
    image: '/ocm.webp'
  },
  {
    id: 'osura',
    name: 'Osura',
    role: 'Senior Full-stack Engineer',
    description:
      'Premier marketplace for high-end Bitcoin Ordinals. Built inscription and trading capabilities for digital art permanently stored on the Bitcoin blockchain.',
    tags: ['Bitcoin Ordinals', 'NFT Marketplace', 'Web3', 'Digital Art'],
    link: 'https://osura.com/',
    imageClass: 'osura',
    initial: 'OS',
    image: '/osura.webp'
  },
  {
    id: 'squatopia',
    name: 'Squatopia',
    role: 'Founder & Lead Developer',
    description:
      'VR fitness roguelike for Meta Quest. Unity 6 with 313+ C# scripts, 300+ abilities, 15+ enemy AI behaviors, body tracking for 15+ movements, and 34+ language support.',
    tags: ['Unity', 'C#', 'Meta Quest', 'VR', 'Fitness Gaming'],
    link: 'https://www.meta.com/experiences/squatopia-infinite-action-roguelike/5461039960620791/',
    imageClass: 'squatopia',
    initial: 'SQ',
    image: '/squatopia.webp'
  },
  {
    id: 'atmosmed',
    name: 'AtmosMed',
    role: 'Chief Technology Officer',
    description:
      'Multi-branch pharmacy chain in Tarlac. Built biometric attendance (99% sync reduction), multi-database inventory system, GPS fleet tracking, and Terraform-deployed infrastructure.',
    tags: ['Django', 'PostgreSQL', 'Terraform', 'GPS Tracking', 'Healthcare'],
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
              <div
                className={`project-image placeholder ${project.imageClass}`}
              >
                {project.initial}
              </div>
            )}
            <div className="project-content">
              <h3>{project.name}</h3>
              <p className="project-role">{project.role}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={`${project.id}-${tag}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
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
