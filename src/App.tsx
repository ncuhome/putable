import { HashRouter } from 'react-router-dom'
import { CacheRoute, CacheSwitch } from 'react-router-cache-route'

import Home from './pages/Home'
import './lib/mock/mock'
import { LoadingProvider } from './components/loading'
import { NoticeProvider } from './components/notice'
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ffe57f',
    },
    error: {
      main: '#ef5350',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#42a5f5',
    },
    success: {
      main: '#66bb6a',
    },
    background: {
      default: '#212121',
      paper: '#303030',
    },
  },
})

const lightTheme = createTheme({})

function App() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <LoadingProvider>
        <NoticeProvider>
          <HashRouter>
            <CacheSwitch>
              <CacheRoute exact path="/" key="home" component={Home} />
            </CacheSwitch>
          </HashRouter>
        </NoticeProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default App
