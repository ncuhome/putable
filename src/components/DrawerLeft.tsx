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

const drawerWidth = 300;

export default function DrawerLeft() {
  const spaceList = [
    { name: '空间1', state: 0, ports: [] },
    {
      name: '空间2',
      state: 1,
      ports: [{ Pname: '接口1', type: 'GET' }, { Pname: '接口2', type: 'POST' }],
    },
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

interface NestedItem {
  spaceList: SpaceProps[]
}
function NestedItem(props: NestedItem) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {
        props.spaceList.map((item) => (
          <Space key={item.name} name={item.name} state={item.state} ports={item.ports} />
        ))
      }
    </List>
  );
}

interface SpaceProps {
  name: string,
  state: number,
  ports: PortsProps[]
}
function Space(props: SpaceProps) {
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
          <LoginState state={props.state} />
          {
                props.ports.map((item) => (
                  <Ports key={item.Pname} Pname={item.Pname} type={item.type} />
                ))
              }
          <AddPort />
        </List>
      </Collapse>
      <Divider />
    </div>
  );
}

interface LoginStateProps {
  state: number
}
function LoginState(props: LoginStateProps) {
  if (props.state === 1) {
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

interface PortsProps {
  type: string
  Pname: string
}

function Ports(props: PortsProps) {
  return (
    <div>
      <ListItem>
        <Chip label={props.type} color="primary" size="small" />
        <ListItemText primary={props.Pname} />
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
