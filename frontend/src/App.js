import { Snackbar } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  ErrorOutline,
  CheckCircleOutlineOutlined,
  WarningOutlined,
  InfoOutlined
} from '@material-ui/icons'
import React from 'react'
import Routes from 'routes'
import getTheme from 'theme'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from 'utils/common/actions'


function snackbarIcon(type) {
  switch (type) {
    case 'error':
      return <ErrorOutline />
    case 'warning':
      return <WarningOutlined />
    case 'info':
      return <InfoOutlined />
    default:
      return <CheckCircleOutlineOutlined />
  }
}

const App = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.authToken)
  const snackbarMessage = useSelector(state => state.common.snackbarMessage)
  const snackbarType = useSelector(state => state.common.snackbarType)
  const theme = useSelector(state => state.common.theme)

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline/>
      <div className='app-wrapper'>
        <Routes authToken={authToken} />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!snackbarMessage}
        onClose={() => dispatch(closeSnackbar())}
      >
        <div className={`snackbar-box ${snackbarType}`}>
          {snackbarIcon(snackbarType)} {snackbarMessage}
        </div>
      </Snackbar>
    </ThemeProvider>
  )
}


export default App
