import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  loginPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  loginPaper: {
    marginTop: '12.5vh',
    padding: '56px 16px',
    maxWidth: 600,
    width: '100%',
    height: 'fit-content',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerLoginContainer: {
    maxWidth: 488
  },
  form: {
    paddingTop: 56
  }
}))

export default useStyles
