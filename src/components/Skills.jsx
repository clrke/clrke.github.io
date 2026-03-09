const skills = [
  'TypeScript',
  'React',
  'Node.js',
  'JavaScript',
  'Python',
  'Java',
  'Rust',
  'Go',
  'C#',
  'Solidity',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST APIs',
  'AWS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'Spring Boot',
  'FastAPI',
  'Django',
  'Web3',
  'Smart Contracts',
  'Claude Code',
  'AI-Assisted Dev',
  'Unity',
  'VR Development',
  'Machine Learning',
  'MySQL'
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
