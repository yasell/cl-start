import React from 'react'

import Logo from '../Logo'
import UserNav from '../UserNav'

import HeaderNav from './HeaderNav'
import './header.scss'



const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <Logo />
        <HeaderNav />
        <UserNav />
      </div>
    </header>
  )
}

export default Header
