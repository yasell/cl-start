import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'

import MainRouter from './modules/MainRouter'
import 'antd/dist/antd.css'
import './styled/common.scss'



class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <MainRouter {...this.props}/>
      </ConnectedRouter>
    )
  }
}

export default App
