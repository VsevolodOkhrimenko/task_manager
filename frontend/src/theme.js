import { createTheme } from '@material-ui/core/styles'


export const colors = {
  light: {
    secondary: '#4CAF50'
  },
  dark: {
    secondary: '#4CAF50'
  },
  defaults: {
    white: '#FFF',
    error: '#F44336',
    warning: '#FF9800',
    success: '#4CAF50',
    info: '#2196F3',
    scrollbar: '#8888',
    scrollbarHover: '#9999',
    scrollbarBg: '#b7000000'
  }
}

const getTheme = (themeType = 'light') => createTheme({
  palette: {
    type: themeType,
    secondary: {
      main: colors[themeType].secondary
    }
  },
  typography: {
    fontFamily: [
      '"Montserrat"',
      '"Open Sans"',
      'sans-serif'
    ].join(', '),
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
      fontSize: 96,
      lineHeight: '117px',
      letterSpacing: '-1.5px',
      marginBottom: '0.3em'
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 300,
      fontSize: 60,
      lineHeight: '73px',
      letterSpacing: '-0.5px',
      marginBottom: '0.4em'
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: '59px',
      letterSpacing: 0,
      marginBottom: '0.5em'
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 400,
      fontSize: 34,
      lineHeight: '41px',
      letterSpacing: '0.25px',
      marginBottom: '0.6em'
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: '29px',
      letterSpacing: 0,
      marginBottom: '0.7em'
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      marginBottom: '0.8em'
    },
    subtitle1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      marginBottom: '0.6em'
    },
    subtitle2: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '21px',
      letterSpacing: '0.1px',
      marginBottom: '0.7em'
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.5px',
      marginBottom: '0.6em'
    },
    body2: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '21px',
      letterSpacing: '0.25px',
      marginBottom: '0.7em'
    },
    button: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '19px',
      letterSpacing: '0.75px'
    },
    caption: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '0.4px'
    },
    overline: {
      fontFamily: '"Open Sans", sans-serif',
      fontWeight: 400,
      fontSize: 10,
      lineHeight: '14px',
      letterSpacing: '1.5px'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 14
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontFamily: '"Graphik", sans-serif',
          margin: 0,
          marginBottom: 0,
          '& .app-wrapper': {
            display: 'flex',
            height: '100vh'
          }
        },
        '*::-webkit-scrollbar': {
          backgroundColor: colors.defaults.scrollbarBg,
          overflowY: 'scroll',
          width: 8
        },
        // background of the scrollbar except button or resizer
        '*::-webkit-scrollbar-track': {
          backgroundColor: 'inherit',
          '&:hover': {
            backgroundColor: 'inherit'
          }
        },
        // scrollbar itself
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: colors.defaults.scrollbar,
          borderRadius: 12,
          '&:hover': {
            backgroundColor: colors.defaults.scrollbarHover
          }
        },
        // set button(top and bottom of the scrollbar)
        '*::-webkit-scrollbar-button': {
          display: 'none'
        },
        '.snackbar-box': {
          padding: '0.5em 1rem',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          color: colors.defaults.white,
          '&.error': {
            backgroundColor: colors.defaults.error
          },
          '&.warning': {
            backgroundColor: colors.defaults.warning
          },
          '&.success': {
            backgroundColor: colors.defaults.success
          },
          '&.info': {
            backgroundColor: colors.defaults.info
          },
          '& svg': {
            marginRight: '0.5rem'
          }
        },

      }
    },
    MuiTextField: {
      root: {
        marginBottom: 20
      }
    },
    MuiInputBase: {
      root: {
        marginBottom: 0
      }
    },
    MuiButton: {
      root: {
        paddingTop: 13.5,
        paddingBottom: 13.5,
        textTransform: 'none',
        borderRadius: 10,
        marginBottom: 16,
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '21px',
        letterSpacing: '0.25px'
      },
      outlined: {
        paddingTop: 13.5,
        paddingBottom: 13.5,
        textTransform: 'none',
        borderRadius: 10,
        marginBottom: 16,
        fontWeight: 400,
        fontSize: 14,
        lineHeight: '21px',
        letterSpacing: '0.25px'
      }
    }
  }
})

export default getTheme
