const experiences = [
  {
    title: 'Technical Contributor',
    company: 'BetterGovPH',
    duration: '2025',
    description:
      'Contributing to open-source government services portal with 50+ volunteer developers. Built React frontend with 95+ components and Meilisearch integration indexing 1,000+ services. Developed real-time data feeds using Cloudflare Workers with D1 database and implemented WCAG accessibility compliance.',
    logo: '/bettergov.svg'
  },
  {
    title: 'Founder & Lead Developer',
    company: 'Squatopia',
    duration: '2024 - Present',
    description:
      'Designing and developing VR fitness roguelike for Meta Quest. Built Unity 6 application with 313+ C# scripts and Meta XR SDK. Designed 300+ abilities across 4-tier skill tree with 15+ enemy AI behaviors. Implemented real-time body tracking for 15+ fitness movements and localization for 34+ languages.',
    logo: '/squatopia-logo.webp'
  },
  {
    title: 'Senior Full-stack Engineer',
    company: 'Metagood (OnChainMonkey & Osura)',
    duration: '2021 - 2025',
    description:
      'Led architecture of multi-chain NFT platform serving 10,000+ token holders. Contributed 1,282 commits to 32-package TypeScript monorepo (47,500+ LOC). Designed cross-chain token tracking with real-time event monitoring. Built gamification systems including dual-currency economy and Discord/Twitter integrations. Developed Osura marketplace for Bitcoin Ordinals.',
    logo: '/metagood.jpg'
  },
  {
    title: 'Chief Technology Officer',
    company: 'AtmosMed Pharmacy',
    duration: '2021 - Present',
    description:
      'Founded and lead technology operations for multi-branch pharmaceutical distribution company. Scaled from 1 to 4 pharmacy branches across Tarlac. Architected biometric attendance system achieving 99% data sync reduction. Built multi-database inventory platform with Django, GPS tracking for delivery fleet, and deployed infrastructure on Digital Ocean using Terraform.',
    logo: '/atmosmed-logo.png'
  },
  {
    title: 'Lead Back-end Engineer',
    company:
      'Union Bank of the Philippines (via White Cloak Technologies, Inc.)',
    duration: '2017 - 2020',
    description:
      'Led backend engineering for UnionBank Online serving millions of active users. Architected Java Spring Boot microservices on bare metal infrastructure processing millions of daily transactions. Designed core banking APIs for fund transfers, bill payments, and check deposits. Mentored engineers and established development standards across mobile, QA, and operations teams.',
    logo: '/whitecloak.png'
  },
  {
    title: 'Data Scientist',
    company: 'Smart Communications (via Solutions Resource, Inc.)',
    duration: '2014 - 2016',
    description:
      "Applied machine learning to telecommunications data for one of the Philippines' largest telcos. Built NLP pipeline using Naive Bayes with n-grams for sentiment analysis on Twitter election data. Developed predictive models driving marketing and customer retention strategies.",
    logo: '/solutionsresource.jpg'
  }
]

function Experience() {
  return (
    <section className="card" id="experience">
      <h2>Experience</h2>
      {experiences.map((exp) => (
        <div key={exp.company} className="experience-item">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} className="experience-logo" />
          ) : (
            <div className="experience-logo-placeholder">
              {exp.company.charAt(0)}
            </div>
          )}
          <div className="experience-details">
            <h3>{exp.title}</h3>
            <p className="experience-company">{exp.company}</p>
            <p className="experience-duration">{exp.duration}</p>
            <p className="experience-description">{exp.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Experience
