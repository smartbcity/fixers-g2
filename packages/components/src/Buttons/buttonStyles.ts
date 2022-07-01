import { makeG2STyles } from '@smartb/g2-themes'

export const containedUseStyles = makeG2STyles()((theme) => ({
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
  }
}))

export const outlinedUseStyles = makeG2STyles()((theme) => ({
  root: {
    backgroundColor: '#ffffff',
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
  }
}))

export const textUseStyles = makeG2STyles()((theme) => ({
  root: {
    background: 'transparent',
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
  }
}))
