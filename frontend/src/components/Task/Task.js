import axios from 'axios'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { replaceByTargetFromArray, pythonDateTimeToJs, removeByIdFromArray } from 'helpers/common'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'
import { setTasks } from 'utils/tasks/actions'
import CreateTaskModal from 'components/CreateTaskModal'
import Loader from 'components/Loader'
import useStyles from './styles'
import Config from 'config'


const Task = (props) => {
  const {
    id,
    name,
    description,
    complete,
    modified
  } = props
  const { apiUrl } = Config.network
  const dispatch = useDispatch()
  const classes = useStyles()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [anchorElTask, setAnchorElTask] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const tasks = useSelector(state => state.tasks.tasks)

  const markComplete = () => {
    setIsLoading(true)
    const url = `${apiUrl}tasks/${id}/complete/`
    const requestData = {
      complete: !complete
    }
    axios.post(url, requestData).then((body) => {
      const { data } = body
      dispatch(setSnackbar('Task updated'))
      setIsLoading(false)
      dispatch(setTasks(replaceByTargetFromArray(tasks, data)))
    }).catch(err => {
      setIsLoading(false)
      if (err.response) {
        dispatch(checkErrorStatus(err.response.status))
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }

  const removeTask = () => {
    setIsLoading(true)
    const url = `${apiUrl}tasks/${id}/`
    axios.delete(url).then((body) => {
      dispatch(setSnackbar('Task removed'))
      setIsLoading(false)
      dispatch(setTasks(removeByIdFromArray(tasks, id)))
    }).catch(err => {
      setIsLoading(false)
      if (err.response) {
        dispatch(checkErrorStatus(err.response.status))
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }

  const handleMarkComplete = (event) => {
    event.preventDefault()
    if (!isLoading) {
      markComplete()
    }
  }

  const handleRemove = () => {
    handleCloseTaskMenu()
    if (!isLoading) {
      removeTask()
    }
  }

  const handleOpenTaskMenu = (event) => {
    setAnchorElTask(event.currentTarget)
  }

  const handleCloseTaskMenu = () => {
    setAnchorElTask(null)
  }

  const handleEditClick = () => {
    handleCloseTaskMenu()
    setShowTaskModal(true)
  }

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.gridItem}>
      <Card
        className={`${classes.card} ${complete ? 'complete' : ''}`}
      >
        { isLoading && <Loader /> }
        <CardHeader
          action={
            <IconButton
              aria-label='task-menu'
              onClick={handleOpenTaskMenu}
            >
              <MoreVertRoundedIcon />
            </IconButton>
          }
          title={name}
        />
        <Menu
          sx={{ mt: '45px' }}
          id='menu-task'
          anchorEl={anchorElTask}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElTask)}
          onClose={handleCloseTaskMenu}
        >
          <MenuItem className={classes.menuItem} onClick={handleEditClick}>
            <Typography className={classes.menuText}>Edit</Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={handleRemove}>
            <Typography color='error' className={classes.menuText}>Delete</Typography>
          </MenuItem>
        </Menu>
        <CardContent
          className={classes.cardContent}
        >
          <Typography noWrap variant='body2' color='textSecondary'>
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.actions}>
          <Typography variant='caption'>
            {pythonDateTimeToJs(modified)}
          </Typography>
          <Button
            endIcon={
              <CheckRoundedIcon />
            }
            color='secondary'
            onClick={handleMarkComplete}
            className={classes.markComplete}
            variant={complete ? 'contained' : 'text'}
          >
            Mark complete
          </Button>
        </CardActions>
      </Card>
      {
        showTaskModal &&
          <CreateTaskModal
            {...props}
            open={showTaskModal}
            onClose={() => setShowTaskModal(false)}
          />
      }
    </Grid>
  )
}

export default Task
