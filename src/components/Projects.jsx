import { useState, useEffect } from 'react'

function StatBadge({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: '#e8f5e9',
        color: '#2e7d32',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        whiteSpace: 'nowrap'
      }}
    >
      {children}
    </span>
  )
}

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1000) return Math.round(n / 1000) + 'K'
  return n.toString()
}

const projects = [
  {
    id: 'bettergov',
    name: 'BetterGovPH',
    role: 'Early Contributor',
    description:
      'Open-source civic tech portal analyzing the PH national budget in collaboration with the Senate Budget Committee. React frontend with 95+ components, Meilisearch indexing 1,000+ services, and Cloudflare Workers serverless backend.',
    badgeFn: (stats) => {
      const s = stats?.bettergov
      if (!s) return null
      return `${s.stars}★ · ${s.forks} forks`
    },
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
    badgeFn: (stats) => {
      const s = stats?.unionbank
      if (!s) return null
      return `${s.rating}★ · ${formatCount(s.count)} ratings`
    },
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
    badgeFn: (stats) => {
      const s = stats?.ocm
      const ethUsd = stats?.ethUsd
      if (!s) return null
      const usd = ethUsd
        ? ` (~$${Math.round(s.floor * ethUsd).toLocaleString()})`
        : ''
      return `Floor: ${s.floor} ETH${usd}`
    },
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
      'Curated marketplace for high-end Bitcoin Ordinals backed by $5M seed (Sora Ventures). Featured Asprey Bugatti Egg Collection (111 pieces, $20K-$200K+) and Frontline (10,000 pieces, 4,000+ wallets). Pioneered recursive inscriptions - inscribed p5.js and Three.js on Bitcoin.',
    badgeFn: () => '$5M seed',
    tags: [
      'Bitcoin Ordinals',
      'NFT Marketplace',
      'Web3',
      'Recursive Inscriptions'
    ],
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
    badgeFn: (stats) => {
      const s = stats?.squatopia
      if (!s) return null
      return `${s.rating}★ · ${s.count} ratings`
    },
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
      'Pharmacy chain and drug distribution company in Tarlac (3 branches). Built entire tech stack from zero: biometric attendance (99% sync reduction), multi-database inventory, GPS fleet tracking, and Terraform-deployed infrastructure on DigitalOcean.',
    badgeFn: () => '3 branches',
    tags: ['Django', 'PostgreSQL', 'Terraform', 'GPS Tracking', 'Healthcare'],
    link: 'https://atmosmed.ph/',
    imageClass: 'atmosmed',
    initial: 'AM',
    image: '/atmosmed.webp'
  }
]

function Projects() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/stats.json')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  return (
    <section className="card" id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => {
          const badge = project.badgeFn ? project.badgeFn(stats) : null

          return (
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
                <h3>
                  {project.name}
                  {badge && (
                    <>
                      {' '}
                      <StatBadge>{badge}</StatBadge>
                    </>
                  )}
                </h3>
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
          )
        })}
      </div>
    </section>
  )
}

export default Projects
