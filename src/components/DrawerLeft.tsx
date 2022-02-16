import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import {ApiType, LoginType, SpaceType} from '../lib/interface/local'

const drawerWidth = 300;

export default function DrawerLeft() {
  const spaceList: SpaceType[] = [{
    name: '空间1',
    login: {
        url: '1',
        account: '1',
        token: '1'
      },
    apiList: [{
          url: '2',
          method: 'GET',
          description: '接口1',
        }
      ]
    }, {
      name: '空间2',
      login: {
        url: '',
        account: '',
        token: ''
      },
      apiList: []
    }
  ];
  return (
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
        <Toolbar />
        <Divider />
        {/* 空间折叠列表 */}
        <NestedItem spaceList={spaceList} />
        <AddSpace />
      </Drawer>
    </Box>
  );
}

function NestedItem({ spaceList }: { spaceList: SpaceType[]}) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {
        spaceList.map((item) => (
          <Space key={item.name} {...item} />
        ))
      }
    </List>
  );
}

function Space(props: SpaceType) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider variant="middle" component="li" />
        <List sx={{ pl: 3 }} component="div" disablePadding>
          <LoginState {...props.login} />
          {
                props.apiList.map((item) => (
                  <Ports key={item.url} {...item} />
                ))
              }
          <AddPort />
        </List>
      </Collapse>
      <Divider />
    </div>
  );
}

function LoginState(props: LoginType) {
  if (props.token !== '') {
    return (
      <div>
        <ListItem>
          <ListItemText primary="已登录" />
          <Button variant="outlined" size="small">切换</Button>
        </ListItem>
        <Divider variant="middle" component="li" />
      </div>
    );
  }
  return (
    <div>
      <ListItem>
        <ListItemText primary="未登录" />
        <Button variant="contained" size="small">登录</Button>
      </ListItem>
      <Divider variant="middle" component="li" />
    </div>
  );
}

function AddPort() {
  return (
    <ListItem>
      <Button sx={{ mx: 'auto' }} variant="outlined" size="small">添加接口</Button>
    </ListItem>
  );
}

function Ports(props: ApiType) {
  return (
    <div>
      <ListItem>
        <Chip label={props.method} color="primary" size="small" />
        <ListItemText primary={props.description} />
        <Button size="small">修改</Button>
        <Button variant="contained" size="small">发送</Button>
      </ListItem>
      <Divider variant="middle" component="li" />
    </div>
  );
}

function AddSpace() {
  return (
    <ListItem>
      <ListItemText primary="新空间" />
      <Button variant="outlined" size="small">添加</Button>
    </ListItem>
  );
}
