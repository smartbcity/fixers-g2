import { Theme } from '@smartb/g2-themes'
import { lowLevelStyles } from '@smartb/g2-themes'

export const containedUseStyles = lowLevelStyles<Theme>()({
    root: {
      minWidth: '80px',
      padding: '7px 12px',
      fontSize: '0.85rem',
      borderRadius: '4px',
      textTransform: 'none',
      boxShadow: theme => theme.shadows[1]
    },
    defaultColor: {
      background: theme => theme.colors.primary,
      '&:hover': {
        background: theme => theme.colors.primary
      }
    },
    success: {
      background:  theme => theme.colors.success,
      '&:hover': {
        background: theme => theme.colors.success
      }
    },
    fail: {
      background: theme => theme.colors.error,
      '&:hover': {
        background: theme => theme.colors.error
      }
    },
    advertissement: {
      background: theme => theme.colors.warning,
      '&:hover': {
        background: theme => theme.colors.warning
      }
    },
    buttonProgress: {
      color: 'white',
      marginRight: 5
    },
    icon: {
      marginRight: 5
    },
    disabled: {
      opacity: '0.7'
    }
  })

export const outlinedUseStyles = lowLevelStyles<Theme>()({
    root: {
      minWidth: '80px',
      padding: '7px 12px',
      fontSize: '0.85rem',
      textTransform: 'none',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      boxShadow: theme => theme.shadows[1],
      '&:hover': {
        backgroundColor: `rgba(0, 0, 0, 0.04)`
      }
    },
    defaultColor: {
      border: theme => `1px solid ${theme.colors.primary}`,
      color: theme => theme.colors.primary,
      '& span': {
        color: theme => theme.colors.primary
      },
      '&.Mui-disabled': {
        color: theme => theme.colors.primary
      }
    },
    success: {
      border: theme => `1px solid ${theme.colors.success}`,
      color:  theme => theme.colors.success,
      '& span': {
        color:  theme => theme.colors.success
      },
      '&.Mui-disabled': {
        color:  theme => theme.colors.success
      }
    },
    fail: {
      border: theme => `1px solid ${theme.colors.error}`,
      color: theme => theme.colors.error,
      '& span': {
        color: theme => theme.colors.error
      },
      '&.Mui-disabled': {
        color: theme => theme.colors.error
      }
    },
    advertissement: {
      border: theme => `1px solid ${theme.colors.warning}`,
      color: theme => theme.colors.warning,
      '& span': {
        color: theme => theme.colors.warning
      },
      '&.Mui-disabled': {
        color: theme => theme.colors.warning
      }
    },
    buttonProgress: {
      color: theme => theme.colors.primary,
      marginRight: 5
    },
    icon: {
      marginRight: 5
    },
    disabled: {
      opacity: '0.7'
    }
  })

export const textUseStyles = lowLevelStyles<Theme>()({
  root: {
    minWidth: '80px',
    padding: '7px 12px',
    fontSize: '0.85rem',
    textTransform: 'none',
    background: 'transparent',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: `rgba(0, 0, 0, 0.04)`
    }
  },
  defaultColor: {
    color: '#828282',
    '& span': {
      color: '#828282'
    },
    '&.Mui-disabled': {
      color: '#828282'
    }
  },
  success: {
    color: theme => theme.colors.success,
    '& span': {
      color: theme => theme.colors.success
    },
    '&.Mui-disabled': {
      color: theme => theme.colors.success
    }
  },
  fail: {
    color: theme => theme.colors.error,
    '& span': {
      color: theme => theme.colors.error
    },
    '&.Mui-disabled': {
      color: theme => theme.colors.error
    }
  },
  advertissement: {
    color: theme => theme.colors.warning,
    '& span': {
      color: theme => theme.colors.warning
    },
    '&.Mui-disabled': {
      color: theme => theme.colors.warning
    }
  },
  buttonProgress: {
    color: '#828282',
    marginRight: 5
  },
  icon: {
    marginRight: 5
  },
  disabled: {
    opacity: '0.7'
  }
})
