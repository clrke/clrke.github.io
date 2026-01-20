const skills = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'C#',
  'Solidity',
  'React',
  'Node.js',
  'Spring Boot',
  'FastAPI',
  'Django',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Terraform',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'REST APIs',
  'Web3',
  'Smart Contracts',
  'Unity',
  'VR Development',
  'Machine Learning'
]

function Skills() {
  return (
    <section className="card" id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Skills
