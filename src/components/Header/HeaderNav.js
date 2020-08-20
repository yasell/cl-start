import React from 'react'
import {NavLink} from 'react-router-dom'



const HeaderNav = () => {
  return (
    <nav>
      <NavLink to={'/'}>Briefcase</NavLink>
      <NavLink to={'/about'}>About</NavLink>
      <NavLink to={'/support'}>Support</NavLink>
    </nav>
  )
}

export default HeaderNav
