import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  homePage: {
    width: '100%',
    height: 'calc(100% - 88px)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  tasksWrapper: {
    overflowY: 'auto',
    height: 'calc(100% - 24px)',
    position: 'relative',
    alignContent: 'flex-start'
  },
  loaderWrapper: {
    position: 'relative',
    width: '100%',
    height: 190
  }
}))

export default useStyles
