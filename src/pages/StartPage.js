import React from 'react'
import { Tabs } from 'antd'

import Header from '../components/Header'



const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

const StartPage = () => {
  return (
    <>
      <Header />
      <main role='main' className='container'>
        <h1>Briefcase</h1>
        <Tabs
          defaultActiveKey='1'
          onChange={callback}
        >
          <TabPane
            tab='Purchased Templates'
            key='1'
          >
            Content of Tab Pane 1
          </TabPane>
          <TabPane
            tab='Contracts In Progress'
            key='2'
          >
            Content of Tab Pane 2
          </TabPane>
          <TabPane
            tab='Executed Contracts'
            key='3'
          >
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </main>
    </>
  )
}

export default StartPage
