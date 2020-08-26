import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Menu, Dropdown, Button, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import {
  foldersTemplatesSentSelector,
  templatesTemplatesSentSelector,
  loadingTemplatesSentSelector,
  loadedTemplatesSentSelector,
  deletedTemplatesSentSelector
} from '../../store/reducers/templatesSent/selectors'
import { getSentTemplatesList } from '../../store/reducers/templatesSent/actions'



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

class TemplatesSentTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      templates: [],
      tableData: []
    }
  }

  componentDidMount() {
    // console.log(this.props)

    this.props.tabKey === 3 && this.props.getSentTemplatesList()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.foldersEntities.length !== this.props.foldersEntities.length ||
      prevProps.templatesEntities.length !== this.props.templatesEntities.length ||
      prevProps.templatesDeleted !== this.props.templatesDeleted && this.props.templatesDeleted
    ) {
      const entitiesMergedArray = [
        ...this.props.foldersEntities,
        ...this.props.templatesEntities
      ]

      console.log('Yo yo 333!')

      this.setState({
        templates: entitiesMergedArray.map(el => el.toJS())
      }, () => {
        this.setState({
          tableData: this.state.templates.map((item) => {
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
        })
      })
    }
  }

  render() {
    return this.body
  }

  get body() {
    const columns = [
      {
        title: 'Contract Name',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
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
          return <Space size='middle'>
            <Button
              type='primary'
            >
              View
            </Button>
            <Dropdown
              trigger={['click']}
              overlay={ () => this.moreActionsMenu({
                id: record.id,
                parentId: record.parentId,
                folderId: record.folder_id
              }) }>
              <Button
                icon={<MoreOutlined />}
              />
            </Dropdown>
          </Space>
        }
      },
    ]

    // console.log(this.props.foldersEntities.map(el => el.toJS()))
    // console.log(this.props.templatesEntities.map(el => el.toJS()))
    // console.log('--- --- ---')
    console.log( this.state.tableData )

    return (
      <Table
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={ columns }
        dataSource={ this.state.tableData }
      />
    )
  }

  moreActionsMenu = (data) => {
    return <Menu
      // onClick={this.handleMenuClick}
    >
      <Menu.Item key='1' onClick={() => this.downloadClickHandler({id: data.id, parentId: data.parentId})}>
        Download
      </Menu.Item>
      <Menu.Item key='2' onClick={() => this.deleteClickHandler(data)}>
        Cancel
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

  deleteClickHandler = (data) => {
    console.log(data)
  }
}

export default connect(
  store => {
    return {
      foldersEntities: foldersTemplatesSentSelector(store),
      templatesEntities: templatesTemplatesSentSelector(store),
      templatesLoaded: loadedTemplatesSentSelector(store),
      templatesLoading: loadingTemplatesSentSelector(store),
      templatesDeleted: deletedTemplatesSentSelector(store),
    }
  },
  {
    getSentTemplatesList: getSentTemplatesList
  }
)(TemplatesSentTable)
