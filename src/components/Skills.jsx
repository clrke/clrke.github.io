import React from 'react'

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Go',
  'Solidity',
  'Unity',
  'C#',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'REST APIs',
  'Web3',
  'Smart Contracts',
  'VR Development'
]

function Skills() {
  return (
    <section className="card" id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </section>
  )
}

export default Skills
