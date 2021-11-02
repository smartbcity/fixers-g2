import { makeG2STyles } from '@smartb/g2-themes'

export const containedUseStyles = makeG2STyles()((theme) => ({
  root: {
    minWidth: '80px',
    padding: '7px 12px',
    fontSize: '0.85rem',
    borderRadius: '4px',
    textTransform: 'none',
    boxShadow: theme.shadows[1]
  },
  defaultColor: {
    background: theme.colors.primary,
    '&:hover': {
      background: theme.colors.primary
    }
  },
  success: {
    background: theme.colors.success,
    '&:hover': {
      background: theme.colors.success
    }
  },
  fail: {
    background: theme.colors.error,
    '&:hover': {
      background: theme.colors.error
    }
  },
  advertissement: {
    background: theme.colors.warning,
    '&:hover': {
      background: theme.colors.warning
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
}))

export const outlinedUseStyles = makeG2STyles()((theme) => ({
  root: {
    minWidth: '80px',
    padding: '7px 12px',
    fontSize: '0.85rem',
    textTransform: 'none',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: theme.shadows[1],
    '&:hover': {
      backgroundColor: `rgba(0, 0, 0, 0.04)`
    }
  },
  defaultColor: {
    border: `1px solid ${theme.colors.primary}`,
    color: theme.colors.primary,
    '& span': {
      color: theme.colors.primary
    },
    '&.Mui-disabled': {
      color: theme.colors.primary
    }
  },
  success: {
    border: `1px solid ${theme.colors.success}`,
    color: theme.colors.success,
    '& span': {
      color: theme.colors.success
    },
    '&.Mui-disabled': {
      color: theme.colors.success
    }
  },
  fail: {
    border: `1px solid ${theme.colors.error}`,
    color: theme.colors.error,
    '& span': {
      color: theme.colors.error
    },
    '&.Mui-disabled': {
      color: theme.colors.error
    }
  },
  advertissement: {
    border: `1px solid ${theme.colors.warning}`,
    color: theme.colors.warning,
    '& span': {
      color: theme.colors.warning
    },
    '&.Mui-disabled': {
      color: theme.colors.warning
    }
  },
  buttonProgress: {
    color: theme.colors.primary,
    marginRight: 5
  },
  icon: {
    marginRight: 5
  },
  disabled: {
    opacity: '0.7'
  }
}))

export const textUseStyles = makeG2STyles()((theme) => ({
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
    color: theme.colors.success,
    '& span': {
      color: theme.colors.success
    },
    '&.Mui-disabled': {
      color: theme.colors.success
    }
  },
  fail: {
    color: theme.colors.error,
    '& span': {
      color: theme.colors.error
    },
    '&.Mui-disabled': {
      color: theme.colors.error
    }
  },
  advertissement: {
    color: theme.colors.warning,
    '& span': {
      color: theme.colors.warning
    },
    '&.Mui-disabled': {
      color: theme.colors.warning
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
}))
