import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
export default function ApiSetting() {
  const [method, setMethod] = useState('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    /*
    console.log({
      url: data.get('url'),
      method: data.get('method'),
      description: data.get('description'),
    });

     */
  };
  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value as string);
  };
  return (
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
          <Typography component="h1" variant="h5" sx={{mt:5}}>
            填写接口地址及调用方法
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="接口地址"
              name="url"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="method"
              name='method'
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
