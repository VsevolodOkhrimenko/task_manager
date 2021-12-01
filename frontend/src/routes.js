import React, { Suspense, useEffect } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import Loader from 'components/Loader'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { getUserInfo } from 'utils/auth/actions'


const HomePage = React.lazy(() => import('containers/HomePage'))
const SignUpPage = React.lazy(() => import('containers/SignUpPage'))
const LoginPage = React.lazy(() => import('containers/LoginPage'))

const Routes = (props) => {
  const { authToken } = props
  const dispatch = useDispatch()

  useEffect(() => {
    if (authToken) {
      dispatch(getUserInfo())
    }
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/sign-up' component={SignUpPage} />
        <PrivateRoute authToken={authToken} exact path='/' component={HomePage} />
      </Switch>
    </Suspense>
  )
}

export default Routes
