import Container from '@material-ui/core/Container'
import React from 'react'
import Navbar from 'components/Navbar'
import useStyles from './styles'

const isMobile = false

const PrivateRouteWrapper = (props) => {
  const { children } = props
  const classes = useStyles({isMobile})

  return (
    <>
      <Navbar
        classes={{...{appBar: classes.appBar}}}
        maxWidth='lg'
      />
        <Container className={classes.content} maxWidth='lg'>
          { children ? children : null}
        </Container>
    </>
  )
}

export default PrivateRouteWrapper
