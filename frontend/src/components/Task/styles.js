import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    '&.complete': {
      opacity: 0.3
    }
  },
  cardContent: {
    height: 63
  },
  actions: {
    justifyContent: 'space-between',
    padding: '8px 16px'
  },
  menuText: {
    marginBottom: 0
  },
  menuItem: {
    marginBottom: 0
  },
  markComplete: {
    marginBottom: 0,
    padding: '6px 8px'
  }
}))

export default useStyles
