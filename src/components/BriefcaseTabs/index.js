import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'

import TemplatesTable from '../TemplatesTable'
import TemplatesInProgressTable from '../TemplatesInProgressTable'
import TemplatesSentTable from '../TemplatesSentTable'

import { getTemplatesList } from '../../store/reducers/templates/actions'
import { getInProgressTemplatesList } from '../../store/reducers/templatesInProgress/actions'
import { getSentTemplatesList } from '../../store/reducers/templatesSent/actions'



const { TabPane } = Tabs
class BriefcaseTabs extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey='1'
        onChange={this.changeTabCallback}
      >
        <TabPane key='1' tab='Purchased Templates'>
          <TemplatesTable
            tabKey={1}
          />
        </TabPane>
        <TabPane key='2' tab='Contracts In Progress'>
          <TemplatesInProgressTable
            tabKey={2}
          />
        </TabPane>
        <TabPane key='3' tab='Executed Contracts'>
          <TemplatesSentTable
            tabKey={3}
          />
        </TabPane>
      </Tabs>
    )
  }

  changeTabCallback = (key) => {
    const { getTemplatesList, getInProgressTemplatesList, getSentTemplatesList } = this.props

    console.log('key...' + key)

    key === '1' ?
      getTemplatesList() :
      key === '2' ?
        getInProgressTemplatesList() :
        key === '3' && getSentTemplatesList()
  }
}

export default connect(
  null,
  {
    getTemplatesList: getTemplatesList,
    getInProgressTemplatesList: getInProgressTemplatesList,
    getSentTemplatesList: getSentTemplatesList,
  }
)(BriefcaseTabs)
