import React from 'react'
import Header from '../components/Header'



const ErrorPage = () => {
  return (
    <>
      <Header />
      <main role='main' className='container' style={{textAlign: 'center'}}>
        <h1>
          Oops!
        </h1>
        <h3>It seems like we couldn't find the page you were looking for</h3>
      </main>
    </>
  )
}

export default ErrorPage
