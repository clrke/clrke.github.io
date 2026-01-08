import React from 'react'

const experiences = [
  {
    title: 'Early Contributor',
    company: 'BetterGovPH',
    duration: '2025',
    description: 'Contributed to an initiative aimed at improving government services and transparency through technology.',
    logo: '/bettergov.svg'
  },
  {
    title: 'Owner',
    company: 'Squatopia',
    duration: '2024 - Present',
    description: 'Developing an infinite action roguelike VR game for Meta Quest. Full ownership of game design, development, and publishing.',
    logo: '/squatopia-logo.webp'
  },
  {
    title: 'CTO',
    company: 'AtmosMed Pharmacy',
    duration: '2021 - Present',
    description: 'Building and operating a community pharmacy chain in Tarlac, Philippines. Overseeing technology solutions for inventory management and customer service.',
    logo: '/atmosmed-logo.jpg'
  },
  {
    title: 'Senior Full-stack Engineer',
    company: 'Metagood (OnChainMonkey & Osura)',
    duration: '2021 - 2025',
    description: 'Built and maintained Web3 platforms including OnChainMonkey NFT ecosystem and Osura Bitcoin Ordinals marketplace. Worked on smart contracts, frontend interfaces, and backend services.',
    logo: '/metagood.jpg'
  },
  {
    title: 'Lead Back-end Engineer',
    company: 'White Cloak Technologies, Inc.',
    duration: '2017 - 2020',
    description: 'As Chief Information Officer at White Cloak, deployed to Union Bank of the Philippines. Led backend development for the UnionBank Online mobile banking app. Architected scalable services handling millions of transactions for core banking features including fund transfers, bill payments, and check deposits.',
    logo: '/whitecloak.jpg'
  },
  {
    title: 'Data Scientist',
    company: 'Solutions Resource Inc.',
    duration: '2014 - 2016',
    description: 'Deployed to Smart Communications, Inc. Applied data science and machine learning techniques to analyze telecommunications data and derive actionable business insights.',
    logo: '/solutionsresource.jpg'
  }
]

function Experience() {
  return (
    <section className="card" id="experience">
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} className="experience-logo" />
          ) : (
            <div className="experience-logo-placeholder" style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'JetBrains Mono',
              fontSize: 20,
              fontWeight: 700,
              color: '#666',
              flexShrink: 0
            }}>
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
