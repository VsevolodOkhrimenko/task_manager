import { makeStyles } from '@material-ui/core/styles'

const toolbarHeight = 64
const marginTopContent = toolbarHeight + 24


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: '100%',
    top: 0,
    right: 'auto',
    boxShadow: 'none',
    zIndex: 3
  },
  content: {
    paddingTop: marginTopContent,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
}))

export default useStyles
