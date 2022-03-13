import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Api, LoginRequest, Space } from '../lib/interface/local'
import { useEffect, useState } from 'react'
import { globalStorage } from '../lib/storage/storage'
import Modal from '@mui/material/Modal'
import ApiLogin from './ApiLogin'
import ApiSetting from './ApiSetting'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import { DialogActions, DialogContent } from '@mui/material'
import { TableData, Rows } from '../lib/interface/api'
import { errorNotice, successNotice } from './notice'
import { getTableRequest, postTableRequest } from '../lib/api/api'
import { addLoading, delLoading } from './loading'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { parseExcel, rowsToExcel } from '../lib/excel'
const drawerWidth = 300

interface ApiLoginType {
  open: boolean
  spaceID: number
}
interface ApiSettingType {
  open: boolean
  spaceID: number
  apiID?: number
}

export default function Index({
  tableDataHandler,
  tableRowsData,
  setTableRows,
}: {
  tableDataHandler: (data: TableData) => void
  tableRowsData: Rows
  setTableRows: (rows: Rows) => void
}) {
  const apiLoginInit = { open: false, spaceID: 0 }
  const apiSettingInit = { open: false, spaceID: 0 }
  const [apiLogin, setApiLogin] = useState<ApiLoginType>(apiLoginInit)
  const [apiSetting, setApiSetting] = useState<ApiSettingType>(apiSettingInit)
  const [spaceList, setSpaceList] = useState<Space[]>()
  const [spaceName, setSpaceName] = useState('')
  const [spaceNameOpen, setSpaceNameOpen] = useState(false)
  useEffect(() => {
    let data = globalStorage.get<Space[]>('spaceList')
    if (data === null) {
      data = [
        {
          name: '测试空间',
          login: {
            url: '/login',
            account: 'pyf',
            token: 'json web token',
          },
          apiList: [
            {
              url: '/table',
              method: 'GET',
              description: '获取数据mock接口',
            },
            {
              url: '/table',
              method: 'POST',
              description: '推送数据mock接口',
            },
          ],
        },
        {
          name: '空间2',
          login: {
            url: '',
            account: '',
            token: '',
          },
          apiList: [],
        },
      ]
    }
    setSpaceList(data)
  }, [])

  useEffect(() => {
    if (spaceList) {
      globalStorage.set('spaceList', spaceList)
    }
  }, [spaceList])

  const handleOpenApiLogin = (spaceID: number) => {
    setApiLogin({ open: true, spaceID: spaceID })
  }
  const handleCloseApiLogin = () => setApiLogin(apiLoginInit)
  const handleOpenApiSetting = (spaceID: number, apiID?: number) => {
    setApiSetting({ open: true, spaceID: spaceID, apiID: apiID })
  }
  const handleCloseApiSetting = () => setApiSetting(apiSettingInit)

  const onApiLoginSpaceChange = (data: Space[]) => {
    setSpaceList(data)
    setApiLogin(apiLoginInit)
  }
  const onApiSettingSpaceChange = (data: Space[]) => {
    setSpaceList(data)
    setApiSetting(apiSettingInit)
  }
  const onSpaceNameChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSpaceName(event.target.value)
  }
  const onSpaceNameSubmit = () => {
    if (spaceList === undefined) return
    const newData = [...spaceList]
    newData.push({
      name: spaceName,
      login: {
        url: '',
        account: '',
        token: '',
      },
      apiList: [],
    })
    setSpaceList(newData)
    setSpaceNameOpen(false)
  }

  const handleSend = async (spaceID: number, apiID: number) => {
    addLoading()
    await apiRequest(spaceID, apiID)
    delLoading()
  }
  const apiRequest = async (spaceID: number, apiID: number) => {
    if (spaceList === undefined) return
    try {
      if (
        spaceList === null ||
        spaceList.length - 1 < spaceID ||
        spaceList[spaceID].apiList.length - 1 < apiID
      ) {
        throw '对象不存在'
      }
      const login = spaceList[spaceID].login
      const api = spaceList[spaceID].apiList[apiID]
      if (api.method === 'GET') {
        if (!confirm('发送GET请求将用新数据覆盖当前表格，是否继续')) return
        const tableData = await getTableRequest({
          url: api.url,
          token: login.token,
        })
        console.log(tableData)
        tableDataHandler(tableData)
        successNotice('请求成功')
      } else {
        if (!confirm('POST请求将发送至服务器，是否继续')) return
        await postTableRequest({
          url: api.url,
          token: login.token,
          data: {
            table: tableRowsData,
          },
        })
        successNotice('请求成功')
      }
    } catch (err) {
      errorNotice(err as string)
    }
  }

  const handleExport = () => {
    // wait for 500ms to make sure the table is saved
    setTimeout(() => rowsToExcel(tableRowsData), 500)
  }
  const handleImport = async (file: File) => {
    setTableRows(await parseExcel(file))
  }

  return (
    <>
      <Modal
        open={apiLogin.open}
        onClose={handleCloseApiLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ApiLogin
          spaceID={apiLogin.spaceID}
          spaceList={spaceList}
          onSpaceChange={onApiLoginSpaceChange}
        />
      </Modal>
      <Modal
        open={apiSetting.open}
        onClose={handleCloseApiSetting}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ApiSetting
          spaceID={apiSetting.spaceID}
          apiID={apiSetting.apiID}
          spaceList={spaceList}
          onSpaceChange={onApiSettingSpaceChange}
        />
      </Modal>
      <Dialog open={spaceNameOpen} onClose={() => setSpaceNameOpen(false)}>
        <DialogContent>
          <TextField
            margin="normal"
            required
            name="name"
            label="空间名称"
            id="name"
            value={spaceName}
            onChange={onSpaceNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSpaceNameSubmit}>确认</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              mt: 2,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudDownloadIcon />}
              onClick={handleExport}
            >
              导出表格
            </Button>
            <label htmlFor="excel-upload">
              <input
                id="excel-upload"
                style={{ display: 'none' }}
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) =>
                  e.target.files && handleImport(e.target.files[0])
                }
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                导入表格
              </Button>
            </label>
          </Box>
          <Divider />
          {/* 空间折叠列表 */}
          {
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {spaceList &&
                spaceList.map((item, index) => (
                  <SpaceViewer
                    spaceID={index}
                    key={index}
                    {...item}
                    handleSend={handleSend}
                    handleLogin={handleOpenApiLogin}
                    handleApiSetting={handleOpenApiSetting}
                  />
                ))}
            </List>
          }
          <ListItem>
            <ListItemText primary="新空间" />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setSpaceNameOpen(true)}
            >
              添加
            </Button>
          </ListItem>
        </Drawer>
      </Box>
    </>
  )
}

interface SpaceProps extends Space {
  spaceID: number
  handleLogin: (spaceID: number) => void
  handleApiSetting: (spaceID: number, apiID?: number) => void
  handleSend: (spaceID: number, apiID: number) => void
}
function SpaceViewer(props: SpaceProps) {
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider variant="middle" component="li" />
        <List sx={{ pl: 3 }} component="div" disablePadding>
          <LoginItem
            {...props.login}
            handleLogin={props.handleLogin}
            spaceID={props.spaceID}
          />
          {props.apiList.map((item, index) => (
            <Ports
              spaceID={props.spaceID}
              apiID={index}
              key={index}
              {...item}
              handleApiSetting={props.handleApiSetting}
              handleSend={props.handleSend}
            />
          ))}
          <ListItem>
            <Button
              sx={{ mx: 'auto', fontSize: 10 }}
              variant="outlined"
              size="small"
              onClick={() => props.handleApiSetting(props.spaceID)}
            >
              添加接口
            </Button>
          </ListItem>
        </List>
      </Collapse>
      <Divider />
    </div>
  )
}

interface LoginItemProps extends LoginRequest {
  spaceID: number
  handleLogin: (spaceID: number) => void
}
function LoginItem(props: LoginItemProps) {
  if (props.token !== '') {
    return (
      <div>
        <ListItem>
          <ListItemText primary="已登录" />
          <Button
            sx={{ fontSize: 10 }}
            variant="outlined"
            size="small"
            onClick={() => props.handleLogin(props.spaceID)}
          >
            切换
          </Button>
        </ListItem>
        <Divider variant="middle" component="li" />
      </div>
    )
  }
  return (
    <div>
      <ListItem>
        <ListItemText primary="未登录" />
        <Button
          variant="outlined"
          size="small"
          onClick={() => props.handleLogin(props.spaceID)}
        >
          登录
        </Button>
      </ListItem>
      <Divider variant="middle" component="li" />
    </div>
  )
}

interface PortsProps extends Api {
  spaceID: number
  apiID: number
  handleApiSetting: (spaceID: number, apiID: number) => void
  handleSend: (spaceID: number, apiID: number) => void
}
function Ports(props: PortsProps) {
  const onSend = () => {
    props.handleSend(props.spaceID, props.apiID)
  }
  return (
    <div>
      <ListItem>
        <span style={{ fontSize: 12, flex: 1 }}>{props.description}</span>
        <Button
          size="small"
          onClick={() => props.handleApiSetting(props.spaceID, props.apiID)}
        >
          修改
        </Button>
        <Button variant="contained" size="small" onClick={onSend}>
          发送
        </Button>
      </ListItem>
      <Divider variant="middle" component="li" />
    </div>
  )
}
