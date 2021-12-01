import axios from 'axios'
import {
  AppBar,
  Toolbar,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField
} from '@material-ui/core'
import React, { useEffect, useState, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formReducer, getFieldError } from 'helpers/forms'
import { replaceByTargetFromArray } from 'helpers/common'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'
import { setTasks } from 'utils/tasks/actions'
import Loader from 'components/Loader'
import Config from 'config'
import useStyles from './styles'


const initFormsState = {
  errors: {}
}

const CreateTaskModal = (props) => {
  const {
    open,
    onClose,
    maxWidth,
    actionText,
    id,
    name,
    description,
    complete
  } = props
  const { apiUrl } = Config.network
  const dispatch = useDispatch()
  const classes = useStyles()
  const [formErrors, dispatchFormErrors] = useReducer(formReducer, initFormsState)
  const tasks = useSelector(state => state.tasks.tasks)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef()

  const [isComplete, setIsComplete] = useState(Boolean(complete))

  useEffect(() => {
    dispatchFormErrors({ type: 'reset' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addTaskSubmit = (event) => {
    event.preventDefault()
    dispatchFormErrors({ type: 'reset' })
    setIsLoading(true)
    const url = `${apiUrl}tasks/`
    const requestData = {
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      complete: isComplete
    }
    axios.post(url, requestData).then((body) => {
      const { data } = body
      dispatch(setSnackbar('Task created'))
      setIsLoading(false)
      dispatch(setTasks([...[data], ...tasks]))
      onClose()
    }).catch(err => {
      if (err.response) {
        dispatch(checkErrorStatus(err.response.status))
        setIsLoading(false)
        if (err.response.status === 400) {
          dispatchFormErrors({
            type: 'error',
            payload: err.response.data
          })
        } else {
          dispatchFormErrors({
            type: 'error',
            payload: {
              nonField: [err.response.data.detail]
            }
          })
        }
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }

  const editTaskSubmit = (event) => {
    event.preventDefault()
    dispatchFormErrors({ type: 'reset' })
    setIsLoading(true)
    const url = `${apiUrl}tasks/${id}/`
    const requestData = {
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      complete: isComplete
    }
    axios.put(url, requestData).then((body) => {
      const { data } = body
      dispatch(setSnackbar('Task updated'))
      setIsLoading(false)
      dispatch(setTasks(replaceByTargetFromArray(tasks, data)))
      onClose()
    }).catch(err => {
      if (err.response) {
        dispatch(checkErrorStatus(err.response.status))
        setIsLoading(false)
        if (err.response.status === 400) {
          dispatchFormErrors({
            type: 'error',
            payload: err.response.data
          })
        } else {
          dispatchFormErrors({
            type: 'error',
            payload: {
              nonField: [err.response.data.detail]
            }
          })
        }
      } else {
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }

  return (
    <Dialog
      maxWidth={maxWidth || 'sm'}
      fullWidth
      open={open}
      onClose={onClose}
      disableEnforceFocus={true}
      className={classes.dialog}
    >
      { isLoading ? <Loader /> : null }
      <AppBar
        position='static'
        color='transparent'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar disableGutters className={classes.toolBar}>
          <Typography variant='subtitle1' className={classes.appBarHeader}>
            {name || 'New Task'}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.dialogContent}>
          <form onSubmit={id ? editTaskSubmit : addTaskSubmit} ref={formRef} className={classes.form}>
            { getFieldError(formErrors, 'non_field_errors') ?
              <Typography variant='body2' color='error'>
                {getFieldError(formErrors, 'non_field_errors')}
              </Typography>
              : null
            }

            <TextField
              required
              error={!!getFieldError(formErrors, 'name')}
              helperText={getFieldError(formErrors, 'name')}
              label='Name'
              type='text'
              name='name'
              fullWidth
              variant='outlined'
              defaultValue={name || ''}
              color='primary'
              className={classes.textField}
              InputLabelProps={{
                required: true
              }}
            />

            <TextField
              error={!!getFieldError(formErrors, 'description')}
              helperText={getFieldError(formErrors, 'description')}
              label='Desctiption'
              type='text'
              name='description'
              fullWidth
              variant='outlined'
              multiline
              minRows={6}
              maxRows={6}
              defaultValue={description || ''}
              color='primary'
              className={classes.textField}
              InputLabelProps={{
                required: false
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isComplete}
                  color='primary'
                  onChange={(event) => setIsComplete(event.currentTarget.checked)}
                />
              }
              label='Complete?'
              className={classes.checkbox}
            />

          </form>
          <DialogActions
            className={classes.dialogActions}
          >
            <Button
              onClick={onClose}
              variant='outlined'
              color='default'
              disableElevation
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type='submit'
              onClick={() => formRef.current.dispatchEvent(new Event('submit'))}
              variant='contained'
              color='primary'
              disableElevation
              fullWidth
            >
              { actionText || 'Submit' }
            </Button>
          </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTaskModal
