import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import StartPage from '../pages/StartPage'
import ErrorPage from '../pages/ErrorPage'
import { START_PAGE } from '../constants/siteMap'



export default class MainRouter extends Component {
  render() {
    return (
      <Router>
        <main role='main'>
          <Switch>
            <Route path={START_PAGE} exact strict component={StartPage} />
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </Router>
    )
  }
}
