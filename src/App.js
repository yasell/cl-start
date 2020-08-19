import React from 'react'
import { connect } from 'react-redux'

import { entitiesContractsSelector } from './store/reducers/contracts/selectors'
import MainRouter from './modules/MainRouter'
import './App.css'



function App(props) {
  console.log(props)

  return (
    <div className="App">
      <MainRouter {...props} />
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    stateEntities: store.entities,
    contractsEntities: entitiesContractsSelector(store),
  }
}

const mapDispatchToProps = {
  // increment, decrement, reset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
