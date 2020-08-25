import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import BriefcaseTabs from '../components/BriefcaseTabs'

import { getTemplatesList } from '../store/reducers/templates/actions'



class StartPage extends Component {
  state = {
    error: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error})
  }

  componentDidMount() {
    // this.props.getTemplatesList()
  }

  render() {
    const error = this.state.error

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
}

export default connect(
  null,
  {
    getTemplatesList: getTemplatesList,
  }
)(StartPage)
