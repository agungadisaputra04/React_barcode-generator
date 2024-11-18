import { useState, useEffect} from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'

import { navLinks} from '../data/index'
import { NavLink} from 'react-router-dom'

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);

 const changeBackgroundColor = () => {
  if (window.scrollY > 10) {
    setChangeColor(true)
  }else {
    setChangeColor(false)
  }
 };

 useEffect(() => {
  changeBackgroundColor();

  window.addEventListener('scroll', changeBackgroundColor)
 })

  return (
    <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
      <Container>
        <Navbar.Brand href="#home" className={`fs-3 fw-bold ${changeColor ? 'text-dark' : 'text-white'}`}>Brownsite.</Navbar.Brand>
        <Navbar.Toggle
  aria-controls="basic-navbar-nav"
  className={`custom-navbar-toggler  ${changeColor ? 'bg-light' : 'bg-danger'}`}
/>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-center mx-auto">
            {navLinks.map((link) => {
              return(
                <div className='nav-link' key={link.id}>
               <NavLink 
                  to={link.path} 
                  className={({ isActive, isPending }) =>
                    `${changeColor ? 'text-dark' : 'text-white'} ${isPending ? "pending" : isActive ? "active" : ""}`
                  }
                  end
                >
                  {link.text}
                </NavLink>
            </div>
              );
            })}
          </Nav>
          <div className='text-center'>
            <button className={`btn ${changeColor ? 'btn-danger' : 'btn-light'}`}>Login for More</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
