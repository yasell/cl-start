import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Dropdown, Menu, Space, Table} from 'antd'
import {MoreOutlined} from '@ant-design/icons'

import {
  deletedTemplatesSelector,
  foldersTemplatesSelector,
  loadedTemplatesSelector,
  loadingTemplatesSelector,
  templatesTemplatesSelector
} from '../../store/reducers/templates/selectors'
import { getTemplatesList, deleteTemplatesFolder } from '../../store/reducers/templates/actions'


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

class TemplatesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      templates: [],
      tableData: []
    }
  }

  componentDidMount() {
    this.props.tabKey === 1 && this.props.getTemplatesList()
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

      console.log('Yo yo!')

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
                overlay={ () => this.moreActionsMenu({
                  id: record.id,
                  parentId: record.parentId,
                  folderId: record.folder_id
                }) }>
                <Button
                  icon={<MoreOutlined />}
                />
              </Dropdown>
            </Space> :
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
        },
      },
    ]

    // console.log(this.props.foldersEntities.map(el => el.toJS()))
    // console.log(this.props.templatesEntities.map(el => el.toJS()))
    // console.log('--- --- ---')
    // console.log( this.state.tableData )

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
    data.isFolder = data.parentId >= 0

    return <Menu
      // onClick={this.handleMenuClick}
    >
      <Menu.Item key='1' onClick={() => this.downloadClickHandler({id: data.id, parentId: data.parentId})}>
        Download
      </Menu.Item>
      <Menu.Item key='2' onClick={() => this.deleteClickHandler(data)}>
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

  deleteClickHandler = (data) => {
    data.isFolder && this.props.deleteFolder(data)
  }
}

export default connect(
  store => {
    return {
      foldersEntities: foldersTemplatesSelector(store),
      templatesEntities: templatesTemplatesSelector(store),
      templatesLoaded: loadedTemplatesSelector(store),
      templatesLoading: loadingTemplatesSelector(store),
      templatesDeleted: deletedTemplatesSelector(store),
    }
  },
  {
    getTemplatesList: getTemplatesList,
    deleteFolder: deleteTemplatesFolder,
  }
)(TemplatesTable)
