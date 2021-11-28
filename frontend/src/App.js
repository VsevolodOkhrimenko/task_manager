import React from 'react'
import Routes from 'routes'
import { useSelector } from 'react-redux'

const App = () => {
  const authToken = useSelector(state => state.auth.authToken)

  return (
    <div className='app-wrapper'>
      <Routes authToken={authToken} />
    </div>
  )
}


export default App
