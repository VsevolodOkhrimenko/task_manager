import axios from 'axios'
import React, { useState, useEffect, useReducer } from 'react'
import {
  TextField,
  Button,
  Typography,
  Paper
} from '@material-ui/core'
import DocumentTitle from 'react-document-title'
import history from 'browserHistory'
import { resetAuthToken, storeAuthToken } from 'utils/auth/actions'
import { formReducer, getFieldError } from 'helpers/forms'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'
import Config from 'config'
import Loader from 'components/Loader'
import { useDispatch } from 'react-redux'
import useStyles from './styles'


const { backendUrl } = Config.network

const initFormsState = {
  errors: {}
}

const LoginPage = () => {
  const dispatch = useDispatch()
  const [formErrors, dispatchFormErrors] = useReducer(formReducer, initFormsState)
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    dispatch(resetAuthToken())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function loginSubmit(event) {
    event.preventDefault()
    dispatchFormErrors({
      type: 'reset'
    })
    const username = event.target.elements.username.value
    const password = event.target.elements.password.value
    const url = `${backendUrl}/auth-token/`
    const data = {
      username,
      password
    }
    delete axios.defaults.headers.common.Authorization
    setIsLoading(true)
    axios.post(url, data).then((body) => {
      setIsLoading(false)
      const { data } = body
      dispatch(storeAuthToken(data.token, true))
      history.push('')
    }).catch(err => {
      setIsLoading(false)
      if (err.response) {
        dispatch(checkErrorStatus(err.response.status))
        if (err.response.status === 400) {
          dispatchFormErrors({
            type: 'error',
            payload: err.response.data
          })
        } else {
          dispatchFormErrors({
            type: 'error',
            payload: {
              non_field_errors: [err.response.data.detail]
            }
          })
        }
      } else {
        console.log(err)
        dispatch(setSnackbar('Connection error', 'error'))
      }
    })
  }

  const handleInputChange = () => {
    dispatchFormErrors({
      type: 'reset'
    })
  }

  return (
    <>
      <DocumentTitle title='Login | Task manager' />
      <div className={classes.loginPage}>
        <Paper className={classes.loginPaper} square elevation={0}>
          {
            isLoading ? <Loader /> : null
          }
          <div className={classes.innerLoginContainer}>
            <Typography variant='h3' color='textPrimary'>
              Login
            </Typography>
            <Typography variant='body2' color='textPrimary'>
              Use your credentials to login in the app
            </Typography>
            <form onSubmit={loginSubmit} className={classes.form}>
              { getFieldError(formErrors, 'non_field_errors') ?
                <Typography variant='body2' color='error'>
                  {getFieldError(formErrors, 'non_field_errors')}
                </Typography>
                : null
              }
              <TextField
                required
                error={!!getFieldError(formErrors, 'username')}
                helperText={getFieldError(formErrors, 'username')}
                label='Username'
                type='text'
                name='username'
                fullWidth
                variant='outlined'
                onInput={handleInputChange}
                placeholder='john_smith'
                InputLabelProps={{
                  required: false
                }}
                className={classes.textField}
              />
              <TextField
                required
                error={!!getFieldError(formErrors, 'password')}
                helperText={getFieldError(formErrors, 'password')}
                label='Password'
                type='password'
                name='password'
                fullWidth
                variant='outlined'
                onInput={handleInputChange}
                placeholder='8+ characters'
                InputLabelProps={{
                  required: false
                }}
                className={classes.textField}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                className={classes.button}
              >
                Submit
              </Button>
            </form>
            <div className={classes.actions}>
              <Button
                onClick={() => history.push('/sign-up')}
                fullWidth
                color='primary'
                variant='outlined'
                className={classes.actionButton}
              >
                Don't have an accout?
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default LoginPage
