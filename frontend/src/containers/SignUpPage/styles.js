import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  signUpPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  signUpPaper: {
    marginTop: '4vh',
    padding: '56px 16px',
    maxWidth: 600,
    width: '100%',
    height: 'fit-content',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerSignUpContainer: {
    maxWidth: 488
  },
  form: {
    paddingTop: 56
  }
}))

export default useStyles
