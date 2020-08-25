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
        dataIndex: 'date',
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
                USE
              </Button>
              <Dropdown
                trigger={['click']}
                overlay={ () => this.moreActionsMenu({id: record.id, title: record.title}) }>
                <Button
                  icon={<MoreOutlined />}
                />
              </Dropdown>
            </Space> :
            <Dropdown
              trigger={['click']}
              overlay={ () => this.moreActionsMenu({id: record.id, title: record.title}) }>
              <Button
                icon={<MoreOutlined />}
              />
            </Dropdown>
        },
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
    const tableData = this.state.templates.map((item) => {
      // init children array
      if (item.children) {
        if (!Array.isArray(item.children)) {
          item.children = Object.keys(item.children).map(key => item.children[key])

          item.children.map((el) => {
            if (el.templates) {
              Object.keys(el.templates).map((key, index) => el.children.push(el.templates[key]))
            }

            return el
          })
        }
      }

      // add templates to children array
      if (item.templates) {
        Object.keys(item.templates).map((key, index) => item.children.push(item.templates[key]))
      }

      return item
    })

    // console.log(this.props.foldersEntities.map(el => el.toJS()))
    // console.log(this.props.templatesEntities.map(el => el.toJS()))
    console.log('--- --- ---')
    console.log( tableData )

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

  moreActionsMenu = (data) => {
    return <Menu
      // onClick={this.handleMenuClick}
    >
      <Menu.Item key='1' onClick={() => this.downloadClickHandler(data.id)}>
        Download
      </Menu.Item>
      <Menu.Item key='2' onClick={() => this.deleteClickHandler(data.id)}>
        Delete
      </Menu.Item>
    </Menu>
  }

  // handleMenuClick = ({ item, key }) => {
  //   console.log(key)
  //   console.log(item)
  // }

  downloadClickHandler = (id) => {
    console.log(id)
  }

  deleteClickHandler = (id) => {
    console.log(id)
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
