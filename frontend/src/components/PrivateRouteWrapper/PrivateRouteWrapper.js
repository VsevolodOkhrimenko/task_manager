import { useEffect } from 'react'
import { getUserInfo } from 'utils/auth/actions'
import { useDispatch, useSelector } from 'react-redux'


const PrivateRouteWrapper = (props) => {
  const { children } = props
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.auth.authToken)

  useEffect(() => {
    if (authToken) {
      dispatch(getUserInfo())
    }
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  if (children) {
    return (
      children
    )
  } else {
    return null
  }
}

export default PrivateRouteWrapper
