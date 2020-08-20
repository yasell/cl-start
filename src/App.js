import React from 'react'
import { connect } from 'react-redux'

import { entitiesContractsSelector } from './store/reducers/contracts/selectors'
import MainRouter from './modules/MainRouter'

import 'antd/dist/antd.css'
import './styled/common.scss'



function App(props) {
  console.log(props)

  return (
    <MainRouter {...props} />
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
