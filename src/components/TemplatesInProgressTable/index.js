import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Menu, Dropdown, Button, Space } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import {
  foldersTemplatesInProgressSelector,
  templatesTemplatesInProgressSelector,
  loadingTemplatesInProgressSelector,
  loadedTemplatesInProgressSelector,
  deletedTemplatesInProgressSelector
} from '../../store/reducers/templatesInProgress/selectors'
import { getInProgressTemplatesList } from '../../store/reducers/templatesInProgress/actions'



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

class TemplatesInProgressTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      templates: [],
      tableData: []
    }
  }

  componentDidMount() {
    this.props.tabKey === 2 && this.props.getInProgressTemplatesList()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps)
    console.log(this.props)

    if (
      prevProps.foldersEntities.length !== this.props.foldersEntities.length ||
      prevProps.templatesEntities.length !== this.props.templatesEntities.length ||
      prevProps.templatesDeleted !== this.props.templatesDeleted && this.props.templatesDeleted
    ) {
      const entitiesMergedArray = [
        ...this.props.foldersEntities,
        ...this.props.templatesEntities
      ]

      console.log('Yo yo 222 !')

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
            render: (text, record, index) => (
              <Space size='middle'>
                <Button
                  type='primary'
                >
                  EDIT
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
            ),
          },
        ]

    // [
        //   {
        //     title: 'Contract Name',
        //     dataIndex: 'name',
        //     sorter: (a, b) => a.name.length - b.name.length,
        //     sortDirections: ['descend'],
        //   },
        //   {
        //     title: 'Last updated',
        //     dataIndex: 'updated',
        //     sorter: (a, b) => a.updated.length - b.updated.length,
        //     sortDirections: ['descend'],
        //   },
        //   {
        //     title: 'Status',
        //     dataIndex: 'status',
        //   },
        //   {
        //     title: 'Actions',
        //     dataIndex: 'actions',
        //     render: (text, record, index) => {
        //       return record.actions ?
        //         <Space size='middle'>
        //           <Button
        //             type='primary'
        //           >
        //             View
        //           </Button>
        //           <Dropdown
        //             overlay={() => this.moreActionsMenu({id: record.id, parentId: record.parentId})}>
        //             <Button
        //               icon={<MoreOutlined />}
        //             />
        //           </Dropdown>
        //         </Space> :
        //         null
        //     }
        //   },
        // ]

    // console.log(this.props.foldersEntities.map(el => el.toJS()))
    // console.log(this.props.templatesEntities.map(el => el.toJS()))
    console.log('tableData is ...')
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
      foldersEntities: foldersTemplatesInProgressSelector(store),
      templatesEntities: templatesTemplatesInProgressSelector(store),
      templatesLoaded: loadedTemplatesInProgressSelector(store),
      templatesLoading: loadingTemplatesInProgressSelector(store),
      templatesDeleted: deletedTemplatesInProgressSelector(store),
    }
  },
  {
    getInProgressTemplatesList: getInProgressTemplatesList,
  }
)(TemplatesInProgressTable)
