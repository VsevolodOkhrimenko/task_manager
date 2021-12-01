import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import { resetAuthToken } from 'utils/auth/actions'
import { useSelector, useDispatch } from 'react-redux'
import useStyles from './styles'


const Navbar = (props) => {
  const { classes, maxWidth } = props
  const localClasses = useStyles()
  const dispatch = useDispatch()
  const name = useSelector(state => state.auth.name)
  const username = useSelector(state => state.auth.username)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    setAnchorElUser(null)
    dispatch(resetAuthToken())
  }

  const getAvatarLetter = (avatrName) => {
    if (!avatrName) {
      return 'Un'
    }
    return avatrName[0].toUpperCase()
  }

  return (
    <AppBar
      position='fixed'
      className={classes.appBar}
    >
      <Container maxWidth={maxWidth || 'xl'}>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'flex' } }}
            className={localClasses.menuLogo}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {getAvatarLetter(name || username)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem className={localClasses.menuItem} onClick={handleLogout}>
                <Typography className={localClasses.menuText}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
