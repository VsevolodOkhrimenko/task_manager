import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24
  },
  appBar: {
    padding: '24px 24px 0px 24px'
  },
  appBarHeader: {
    paddingLeft: 0
  },
  toolBar: {
    minHeight: 0
  },
  dialog: {
    '& .MuiDialog-paperScrollPaper': {
      borderRadius: 10
    },
  },
  dialogActions: {
    padding: 0,
    '& .MuiButtonBase-root': {
      marginBottom: 0
    }
  },
  checkbox: {
    marginBottom: 20,
    '& .MuiTypography-body1': {
      marginBottom: 0
    }
  }
}))

export default useStyles
