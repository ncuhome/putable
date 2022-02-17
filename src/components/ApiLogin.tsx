import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Typography} from "@mui/material";
import {LoginType, SpaceType} from "../lib/interface/local";
import {errorNotice, successNotice} from "./notice";
import {loginRequest} from "../lib/api/api";
import {addLoading, delLoading} from "./loading";

const theme = createTheme();

interface Props {
  spaceID: number
  spaceList?: SpaceType[]
  onSpaceChange: (data: SpaceType[]) => void
}
export default function Index(props: Props) {
  // TODO 改TextField受控组件，并在初始化时获取储存的值

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addLoading()
    await login(data)
    delLoading()
  }

  const login = async (data: FormData) => {
    let res = { token: ''}
    try {
      res = await loginRequest({
        url: data.get('url') as string,
        account: data.get('account') as string,
        password: data.get('password') as string,
      })
      successNotice('登录成功')
    } catch (err) {
      errorNotice(err as string)
      return
    }

    const newLogin: LoginType = {
      url: data.get('url') as string,
      account: data.get('account') as string,
      token: res.token
    }
    if(props.spaceList === undefined || props.spaceList.length - 1 < props.spaceID) {
      errorNotice('对象不存在')
      return
    }
    const newData = [...props.spaceList]
    newData[props.spaceID].login = newLogin
    props.onSpaceChange(newData)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        outline: 0
      }}>
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
          <Typography component="h1" variant="h5">
            登录以获取权限
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="登录接口地址"
              name="url"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="账号"
              name="account"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}