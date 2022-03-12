import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import { ApiType, SpaceType } from '../lib/interface/local'
import { errorNotice } from './notice'

interface Props {
  spaceID: number
  apiID?: number
  spaceList?: SpaceType[]
  onSpaceChange: (data: SpaceType[]) => void
}
export default function Index(props: Props) {
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    if (props.apiID === undefined) return
    if (
      props.spaceList === undefined ||
      props.spaceList.length - 1 < props.spaceID ||
      props.spaceList[props.spaceID].apiList.length - 1 < props.apiID
    ) {
      errorNotice('对象不存在')
      return
    }
    const api = props.spaceList[props.spaceID].apiList[props.apiID]
    setUrl(api.url)
    setMethod(api.method)
    setDescription(api.description)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const newApi: ApiType = {
      url: data.get('url') as string,
      method: data.get('method') as string,
      description: data.get('description') as string,
    }
    if (
      props.spaceList === undefined ||
      props.spaceList.length - 1 < props.spaceID
    ) {
      errorNotice('对象不存在')
      return
    }
    if (props.apiID === undefined) {
      const newData = [...props.spaceList]
      newData[props.spaceID].apiList.push(newApi)
      props.onSpaceChange(newData)
      return
    }
    if (props.spaceList[props.spaceID].apiList.length - 1 < props.apiID) {
      errorNotice('对象不存在')
      return
    }
    const newData = [...props.spaceList]
    newData[props.spaceID].apiList[props.apiID] = newApi
    props.onSpaceChange(newData)
  }
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value as string)
  }
  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value as string)
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value as string)
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        outline: 0,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          background: '#ffffff',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
          填写接口地址及调用方法
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="接口地址"
            name="url"
            value={url}
            onChange={handleUrlChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="method"
            name="method"
            select
            label="请求方法"
            value={method}
            onChange={handleMethodChange}
          >
            <MenuItem value={'GET'}>GET</MenuItem>
            <MenuItem value={'POST'}>POST</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="接口说明"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            确认
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
