import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Menu, Dropdown, Button, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import {
  foldersTemplatesSelector,
  templatesTemplatesSelector,
  loadingTemplatesSelector,
  loadedTemplatesSelector
} from '../../store/reducers/templates/selectors'



const moreActionsMenu = (
  <Menu
    onClick={handleMenuClick}
  >
    <Menu.Item key='1'>
      Download
    </Menu.Item>
    <Menu.Item key='2'>
      Delete
    </Menu.Item>
  </Menu>
)

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
}

function handleMenuClick({ key }) {
  console.log('click', key)
}

class TemplatesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      templates: []
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.templatesLoaded !== this.props.templatesLoaded && this.props.templatesLoaded && !this.props.templatesLoading) {
      const entitiesMergedArray = [
        ...this.props.foldersEntities,
        ...this.props.templatesEntities
      ]

      this.setState({
        templates: entitiesMergedArray.map(el => el.toJS())
      })
    }
  }

  render() {
    return this.body
  }

  get body() {
    const columns = this.props.tabKey === 1 ? [
      {
        title: 'Contract Name',
        dataIndex: 'title',
      },
      {
        title: 'Available usage',
        dataIndex: 'usage',
      },
      {
        title: 'Purchased on',
        dataIndex: 'purchased',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: () => (
          <Space size='middle'>
            <Button
              type='primary'
            >
              USE
            </Button>
            <Dropdown
              overlay={moreActionsMenu}>
              <Button
                icon={<MoreOutlined />}
              />
            </Dropdown>
          </Space>
        ),
      },
    ] :
      this.props.tabKey === 2 ? [
          {
            title: 'Contract Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Last updated',
            dataIndex: 'updated',
            sorter: (a, b) => a.updated.length - b.updated.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Status',
            dataIndex: 'status',
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: () => (
              <Space size='middle'>
                <Button
                  type='primary'
                >
                  EDIT
                </Button>
                <Dropdown
                  overlay={moreActionsMenu}>
                  <Button
                    icon={<MoreOutlined />}
                  />
                </Dropdown>
              </Space>
            ),
          },
        ] :
        [
          {
            title: 'Contract Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Last updated',
            dataIndex: 'updated',
            sorter: (a, b) => a.updated.length - b.updated.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Status',
            dataIndex: 'status',
          },
          {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record, index) => {
              return record.actions ?
                <Space size='middle'>
                  <Button
                    type='primary'
                  >
                    View
                  </Button>
                  <Dropdown
                    overlay={moreActionsMenu}>
                    <Button
                      icon={<MoreOutlined />}
                    />
                  </Dropdown>
                </Space> :
                null
            }
          },
        ]

    const data = this.props.tabKey === 1 ? [
      {
        key: '1',
        name: 'Life Rights Option Agreement',
        usage: 3,
        purchased: '7/26/2020 at 8:30 pm',
        actions: 'Use'
      },
      {
        key: '2',
        name: 'Intellectual Property Assignment Agreement',
        usage: 0,
        purchased: '7/26/2020 at 8:30 pm',
        actions: 'Renew'
      },
      {
        key: '3',
        name: 'Social Media Management Agreement',
        usage: 1,
        purchased: '7/26/2020 at 8:30 pm',
        actions: 'Use'
      },
      {
        key: '4',
        name: 'Life Rights Option Agreement',
        usage: 3,
        purchased: '7/26/2020 at 8:30 pm',
        actions: 'Use'
      },
    ] :
      this.props.tabKey === 2 ? [
          {
            key: '1',
            name: 'Intellectual Property Assignment Agreement (v03)',
            updated: '7/26/2020 at 8:30 pm',
            status: 'Draft',
            actions: 'Edit'
          },
          {
            key: '2',
            name: 'Intellectual Property Assignment Agreement (v02)',
            updated: '7/26/2020 at 8:30 pm',
            status: 'Draft',
            actions: 'Edit'
          },
          {
            key: '3',
            name: 'Life Rights Option Agreement  (Copy 2)',
            updated: '7/26/2020 at 8:30 pm',
            status: 'Draft',
            actions: 'Edit'
          },
        ] :
        [
          {
            key: '1',
            name: 'Project 1',
            updated: '',
            status: '',
            actions: '',
            children: [
              {
                key: '2',
                name: 'Intellectual Property Agreement',
                updated: '7/26/2020 at 8:30 pm',
                status: 'Completed',
                actions: 'View',
              },
              {
                key: '3',
                name: 'Social Media Agreement',
                updated: '7/26/2020 at 8:30 pm',
                status: 'Completed',
                actions: 'View',
              },
            ]
          },
          {
            key: '4',
            name: 'Project 2',
            updated: '',
            status: '',
            actions: '',
            children: [
              {
                key: '5',
                name: 'Life Rights Option Agreement  (Copy 3)',
                updated: '7/26/2020 at 8:30 pm',
                status: 'Completed',
                actions: 'View'
              },
              {
                key: '6',
                name: 'Intellectual Property Assignment Agreement (v01)',
                updated: '7/26/2020 at 8:30 pm',
                status: 'Completed',
                actions: 'View'
              },
            ]
          },
        ]

    const tableData = this.state.templates.map((item) => {
      if (item.children) {
        if (!Array.isArray(item.children)) {
          item.children = Object.keys(item.children).map(key => item.children[key])
        }
      }

      return item
    })

    console.log(this.props.foldersEntities.map(el => el.toJS()))
    console.log(this.props.templatesEntities.map(el => el.toJS()))
    console.log('--- --- ---')

    return (
      <Table
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={ columns }
        dataSource={ tableData }
      />
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
  null
)(TemplatesTable)
