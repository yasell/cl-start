import React from 'react'
import { Tabs } from 'antd'
import TemplatesTable from '../TemplatesTable'



const { TabPane } = Tabs

const BriefcaseTabs = () => {
  return (
    <Tabs
      defaultActiveKey='1'
      onChange={changeTabCallback}
    >
      <TabPane
        tab='Purchased Templates'
        key='1'
      >
        <TemplatesTable
          tabKey={1}
        />
      </TabPane>
      <TabPane
        tab='Contracts In Progress'
        key='2'
      >
        <TemplatesTable
          tabKey={2}
        />
      </TabPane>
      <TabPane
        tab='Executed Contracts'
        key='3'
      >
        <TemplatesTable
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
