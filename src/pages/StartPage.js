import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'
import BriefcaseTabs from '../components/BriefcaseTabs'

import { getTemplatesList } from '../store/reducers/templates/actions'
import {
  foldersTemplatesSelector,
  templatesTemplatesSelector,
  loadingTemplatesSelector,
  loadedTemplatesSelector
} from '../store/reducers/templates/selectors'



class StartPage extends Component {
  state = {
    error: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({error})
  }

  componentDidMount() {
    this.props.getTemplatesList()
  }

  render() {
    const error = this.state.error

    console.log(this.props.foldersEntities)
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
      foldersEntities: foldersTemplatesSelector(store),
      templatesEntities: templatesTemplatesSelector(store),
      templatesLoaded: loadedTemplatesSelector(store),
      templatesLoading: loadingTemplatesSelector(store),
    }
  },
  {
    getTemplatesList: getTemplatesList,
  }
)(StartPage)
