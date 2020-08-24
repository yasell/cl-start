import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import BriefcaseTabs from '../components/BriefcaseTabs'

import { getTemplatesList } from '../store/reducers/templates/actions'
import { entitiesContractsSelector, loadingContractsSelector, loadedContractsSelector } from '../store/reducers/templates/selectors'



class StartPage extends Component {
  state = {
    error: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error})
  }

  componentDidMount() {
    console.log('StartPage Mounted')
    this.props.getTemplatesList()
  }

  render() {
    const error = this.state.error

    console.log(this.props.templatesEntities)
    // console.log(this.props.templatesLoaded)
    // console.log(this.props.templatesLoading)

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
  store => {
    return {
      templatesEntities: entitiesContractsSelector(store),
      // templatesLoaded: loadedContractsSelector(store),
      // templatesLoading: loadingContractsSelector(store),
    }
  },
  {
    getTemplatesList: getTemplatesList,
  }
)(StartPage)
