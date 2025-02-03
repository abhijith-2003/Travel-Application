import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from './../../context/AuthContext'


const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/travel',
    display: 'Travel'
  },
]

const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return window.removeEventListener('scroll', stickyHeaderFunc)
  }, [])

   const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu')
  return <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo mb-4">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5 p-2">
              {nav_links.map((item, index) => (
                <li className="nav_item" key={index}>
                  <NavLink to={item.path} className={navClass => navClass.isActive ? 'active_link' : ''}>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center gap-4  ">
              {
                user ? (
                  <>
                    <h6 className='mb-3 '>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h6>
                    <Button className="btn primary__btn mb-4" onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn mb-4"><Link to='/login'>Login</Link></Button>

                    <Button className="btn primary__btn mb-4"><Link to='/register'>Register</Link></Button>
                  </>
                )}

              <span className="mobile__menu mb-4" onClick={toggleMenu}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  </header>
}

export default Header
