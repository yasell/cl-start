import React from 'react'
import { connect } from 'react-redux'

import { entitiesContractsSelector } from './store/reducers/contracts/selectors'
import './App.css'



function App(props) {
  console.log(props.stateEntities)
  console.log('--- -- ---')
  console.log(props.contractsEntities)

  return (
    <div className="App">
      <header className="App-header">
        Hello world
      </header>
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
