import React, { useContext, useState, useEffect, useRef, Component } from 'react'
import { connect } from 'react-redux'
import { Table, Menu, Dropdown, Button, Space, Form, Input } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import {
  foldersTemplatesSentSelector,
  templatesTemplatesSentSelector,
  loadingTemplatesSentSelector,
  loadedTemplatesSentSelector,
  deletedTemplatesSentSelector,
  createdTemplatesSentSelector
} from '../../store/reducers/templatesSent/selectors'
import { getSentTemplatesList, addTemplatesFolder, deleteTemplatesFolder, updateTemplatesFolder } from '../../store/reducers/templatesSent/actions'
import { REQUIRED_FIELD } from '../../constants/staticErrors'



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

const EditableContext = React.createContext()

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const isNewCell = record && record.newFolder
  const [editing, setEditing] = useState(!!isNewCell)
  const inputRef = useRef()
  const form = useContext(EditableContext)
  let childNode = children

  useEffect(() => {
    if (editing) {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      })
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)

    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
  }

  const save = async e => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: REQUIRED_FIELD,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

class TemplatesSentTable extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: 'Contract Name',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
        sortDirections: ['descend'],
        editable: true
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
          const isFolder = record.parentId >= 0

          return <Space size='middle'>
            {!isFolder &&
            <Button
              type='primary'
            >
              View
            </Button>
            }
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

    this.state = {
      templates: [],
      tableData: []
    }
  }

  componentDidMount() {}

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
    const { templatesLoading } = this.props
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: record.parentId >= 0,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        })
      }
    })
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    }

    // console.log(this.props.foldersEntities.map(el => el.toJS()))
    // console.log(this.props.templatesEntities.map(el => el.toJS()))
    // console.log('--- --- ---')
    // console.log( this.state.tableData )

    return (
      <>
        <Button
          onClick={ this.handleAddFolder }
          type='primary'
          style={{
            marginBottom: 16,
          }}
        >
          + NEW PROJECT
        </Button>
        <Table
          loading={ templatesLoading }
          pagination={ false }
          components={ components }
          rowClassName={(record) => record.parentId && 'editable-row'}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={ columns }
          dataSource={ this.state.tableData }
        />
      </>
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
    data.isFolder && this.props.deleteFolder(data)
  }

  handleAddFolder = () => {
    const newTableData = [...this.state.tableData]
    const newFolderData = {
      id: 0,
      key: `000-${(~~(Math.random() * 1e8)).toString(16)}`,
      parentId: 0,
      newFolder: true,
      title: 'NEW PROJECT',
      children: [],
    }
    const isFile = (element) => element.folder_id >= 0
    const isFileIndex = newTableData.findIndex(isFile)

    newTableData.splice(isFileIndex, 0, {...newFolderData})

    this.setState({
      tableData: newTableData
    })
  }

  handleSave = row => {
    const newData = [...this.state.tableData]
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    const newFolderData = {
      title: row.title,
      chapter: 'ENVELOPE_COMPLETE',
      parent_id: row.parentId
    }
    const updateFolderData = {
      id: row.id,
      title: row.title,
      chapter: 'ENVELOPE_COMPLETE'
    }

    newData.splice(index, 1, { ...item, ...row })

    this.setState({
      tableData: newData,
    }, () => {
      row.newFolder ?
        this.props.addTemplatesFolder(newFolderData) :
        this.props.updateTemplatesFolder(updateFolderData)
    })
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
      templatesCreated: createdTemplatesSentSelector(store),
    }
  },
  {
    getSentTemplatesList: getSentTemplatesList,
    addTemplatesFolder: addTemplatesFolder,
    deleteFolder: deleteTemplatesFolder,
    updateTemplatesFolder: updateTemplatesFolder
  }
)(TemplatesSentTable)
