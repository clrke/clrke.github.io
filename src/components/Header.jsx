import React from 'react'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <a href="#" className="header-logo">clrke</a>
        <nav className="header-nav">
          <a href="#about">about</a>
          <a href="#experience">experience</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
