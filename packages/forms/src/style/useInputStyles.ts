import { makeG2STyles } from '@smartb/g2-themes'

const darkGrey = '#323338'
const textFieldGrey = '#C5C7D0'
const disabledColor = '#E6E9EF'

export const useInputStyles = makeG2STyles()((theme) => ({
  label: {
    marginBottom: theme.spacing,
    fontSize: 16,
    color: `${darkGrey}`
  },
  labelSmall: {
    fontSize: 14
  },
  input: {
    '& .MuiInputBase-input': {
      padding: '6px 7px',
      backgroundColor: 'unset'
    },
    '& .MuiSelect-root': {
      backgroundColor: 'white',
      borderRadius: theme.borderRadius,
      color: '#323338',
      textOverflow: 'ellipsis'
    },
    '& .MuiFilledInput-adornedEnd': {
      paddingRight: '10px'
    },
    '& .MuiFilledInput-adornedStart': {
      paddingLeft: '10px'
    },
    '& .MuiFilledInput-root.Mui-disabled': {
      border: `1px solid ${disabledColor}`,
      backgroundColor: disabledColor
    },
    '& .MuiInputBase-root': {
      width: '100%',
      margin: `0px`,
      paddingTop: '0px',
      border: `1px solid ${textFieldGrey}`,
      boxShadow: '0px 0px 0px 1px transparent',
      borderRadius: theme.borderRadius,
      backgroundColor: 'white'
    },
    '& .MuiSelect-select:focus': {
      background: 'unset'
    },
    '& .MuiInputBase-root.Mui-error': {
      border: `1px solid ${theme.colors.error}`
    },
    '& .MuiInputBase-root:hover': {
      border: `1px solid ${darkGrey}`,
      backgroundColor: 'white'
    },
    '& .MuiInputBase-root:focus': {
      border: `1px solid ${theme.colors.primary}`
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: `1px solid ${theme.colors.primary}`
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: theme.colors.error
    },
    '& .MuiInputLabel-filled .MuiInputLabel-filled.MuiInputLabel-shrink': {
      transform: 'translate(12px, 21px) scale(1)'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      fontWeight: 400,
      transform: 'translate(12px, 10px) scale(0.75)'
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 'none !important'
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: 'none'
    },
    '& .MuiFilledInput-input': {
      padding: '0px 10px'
    },
    '& .MuiFilledInput-inputAdornedStart': {
      padding: '0px 10px 0px 0px'
    },
    '& .MuiFilledInput-inputAdornedEnd': {
      padding: '0px 0px 0px 10px'
    },
    '& .MuiFilledInput-input::placeholder': {
      fontSize: '14px'
    },
    '& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)':
      {
        marginTop: '0px !important'
      }
  },
  inputValidated: {
    '& .MuiInputBase-root': {
      border: `1px solid ${theme.colors.success}`
    },
    '& .MuiInputBase-root:hover': {
      border: `1px solid ${theme.colors.success}`
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: `1px solid ${theme.colors.success}`
    },
    '& .MuiInputBase-root:focus': {
      border: `1px solid ${theme.colors.success}`
    }
  },
  inputError: {
    '& .MuiInputBase-root': {
      border: `1px solid ${theme.colors.error}`
    },
    '& .MuiInputBase-root:hover': {
      border: `1px solid ${theme.colors.error}`
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: `1px solid ${theme.colors.error}`
    },
    '& .MuiInputBase-root:focus': {
      border: `1px solid ${theme.colors.error}`
    }
  },
  inputLarge: {
    '& .MuiInputBase-root': {
      minHeight: '48px'
    },
    '& .MuiSelect-root': {
      height: '48px',
      lineHeight: '48px'
    }
  },
  inputMedium: {
    '& .MuiInputBase-root': {
      minHeight: '40px'
    },
    '& .MuiSelect-root': {
      height: '40px',
      lineHeight: '40px'
    }
  },
  inputSmall: {
    '& .MuiInputBase-root': {
      minHeight: '32px'
    },
    '& .MuiSelect-root': {
      height: '32px',
      lineHeight: '32px'
    },
    '& .MuiInputBase-input': {
      fontSize: '14px'
    },
    '& .MuiInputBase-input::placeholder': {
      fontSize: '14px'
    }
  },
  inputDisabled: {
    '& .MuiInputBase-root': {
      border: `1px solid ${disabledColor}`,
      background: disabledColor
    },
    '& .MuiInputBase-root:hover': {
      border: `1px solid ${disabledColor}`,
      backgroundColor: disabledColor
    },
    '& .MuiSelect-root': {
      backgroundColor: disabledColor,
      color: '#676879'
    }
  },
  inputWithClear: {
    '& .MuiFilledInput-inputAdornedEnd': {
      padding: '0px 15px 0px 10px'
    }
  },
  helperText: {
    position: 'absolute',
    top: '100%',
    color: `${theme.colors.error}`,
    margin: '0',
    marginTop: '3px'
  },
  clear: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    marginTop: '-12px',
    cursor: 'pointer',
    color: darkGrey
  },
  clearError: {
    color: theme.colors.error
  },
  validated: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    marginTop: '-12px',
    color: theme.colors.success
  }
}))
