import React, { Suspense } from 'react'
import PrivateRoute from 'components/PrivateRoute'
import Loader from 'components/Loader'
import { Route, Switch } from 'react-router-dom'


const HomePage = React.lazy(() => import('containers/HomePage'))

const Routes = (props) => {
  const { authToken } = props

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path='/login' component={HomePage} />
        <PrivateRoute authToken={authToken} exact path='/' component={HomePage} />
      </Switch>
    </Suspense>
  )
}

export default Routes
