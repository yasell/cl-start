import React from 'react'
import { Tabs } from 'antd'

import TemplatesTable from '../TemplatesTable'
import TemplatesInProgressTable from '../TemplatesInProgressTable'
import TemplatesSentTable from '../TemplatesSentTable'



const { TabPane } = Tabs

const BriefcaseTabs = (props) => {

  return (
    <Tabs
      defaultActiveKey='1'
      onChange={changeTabCallback}
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

function changeTabCallback(key) {
  // console.log(key)
}

export default BriefcaseTabs
