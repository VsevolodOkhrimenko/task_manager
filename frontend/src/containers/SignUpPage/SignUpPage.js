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
import { resetAuthToken } from 'utils/auth/actions'
import { formReducer, getFieldError } from 'helpers/forms'
import { checkErrorStatus, setSnackbar } from 'utils/common/actions'
import Config from 'config'
import Loader from 'components/Loader'
import { useDispatch } from 'react-redux'
import useStyles from './styles'


const { apiUrl } = Config.network

const initFormsState = {
  errors: {}
}

const SignUpPage = () => {
  const dispatch = useDispatch()
  const [formErrors, dispatchFormErrors] = useReducer(formReducer, initFormsState)
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    dispatch(resetAuthToken())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function signUpSubmit(event) {
    event.preventDefault()
    dispatchFormErrors({
      type: 'reset'
    })
    const name = event.target.elements.name.value
    const username = event.target.elements.username.value
    const password = event.target.elements.password.value
    const password2 = event.target.elements.password2.value
    if (password.length === 0) {
      dispatchFormErrors({
        type: 'error',
        payload: { password: ['Password is required.'] }
      })
      return
    }
    if (password2.length === 0) {
      dispatchFormErrors({
        type: 'error',
        payload: { password2: ['Password confirmation is required.'] }
      })
      return
    }
    if (password !== password2) {
      dispatchFormErrors({
        type: 'error',
        payload: {
          password: ['Passwords are not equal.'],
          password2: ['Passwords are not equal.']
        }
      })
      return
    }
    const url = `${apiUrl}users/`
    const data = {
      name,
      username,
      password,
      password2
    }
    delete axios.defaults.headers.common.Authorization
    setIsLoading(true)
    axios.post(url, data).then((body) => {
      setIsLoading(false)
      dispatch(setSnackbar('Account successfully created', 'success'))
      history.push('/login')
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
      <DocumentTitle title='Sign Up | Task manager' />
      <div className={classes.signUpPage}>
        <Paper className={classes.signUpPaper} square elevation={0}>
          {
            isLoading ? <Loader /> : null
          }
          <div className={classes.innerSignUpContainer}>
            <Typography variant='h3' color='textPrimary'>
              Sign Up
            </Typography>
            <Typography variant='body2' color='textPrimary'>
              Use this form to create your account
            </Typography>
            <form onSubmit={signUpSubmit} className={classes.form}>
              { getFieldError(formErrors, 'non_field_errors') ?
                <Typography variant='body2' color='error'>
                  {getFieldError(formErrors, 'non_field_errors')}
                </Typography>
                : null
              }
              <TextField
                error={!!getFieldError(formErrors, 'name')}
                helperText={getFieldError(formErrors, 'name')}
                label='Names'
                type='text'
                name='name'
                fullWidth
                variant='outlined'
                onInput={handleInputChange}
                placeholder='John Smith'
                InputLabelProps={{
                  required: false
                }}
                className={classes.textField}
              />
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
                  required: true
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
                  required: true
                }}
                className={classes.textField}
              />
              <TextField
                required
                error={!!getFieldError(formErrors, 'password2')}
                helperText={getFieldError(formErrors, 'password2')}
                label='Repeat password'
                type='password'
                name='password2'
                fullWidth
                variant='outlined'
                onInput={handleInputChange}
                placeholder='Repeat your password'
                InputLabelProps={{
                  required: true
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
                onClick={() => history.push('/login')}
                fullWidth
                color='primary'
                variant='outlined'
                className={classes.actionButton}
              >
                Already have an accout?
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default SignUpPage
