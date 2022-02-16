import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './update.css'
import MenuItem from '@mui/material/MenuItem';
export default function AddOrModify() {
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            position:'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
              type="submit"
              variant="contained"
              sx={{position:'absolute',left:3,top:3}}
            >
              返回
            </Button>
          <Typography component="h1" variant="h5" sx={{mt:5}}>
            填写接口地址及调用方法
          </Typography>
          <Box component="form" onSubmit={() =>{}} noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id=""
              label="接口地址"
              name=""
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id=""
              select
              label="请求方法"
            >
              <MenuItem>
                GET
              </MenuItem>
              <MenuItem>
                POST
              </MenuItem>

            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              name=""
              label="接口说明"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 ,ml:20}}
            >
              确认
            </Button>
          </Box>
        </Box>
      </Container>
  )
}
