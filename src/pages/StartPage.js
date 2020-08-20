import React from 'react'

import Header from '../components/Header'
import BriefcaseTabs from '../components/BriefcaseTabs'



const StartPage = () => {
  return (
    <>
      <Header />
      <main role='main' className='container'>
        <h1>Briefcase</h1>
        <BriefcaseTabs />
      </main>
    </>
  )
}

export default StartPage
