import React, { useState, useEffect } from 'react'
import { Box, Typography, makeStyles } from  '@mui/material'
import { PictureAsPdf, Clear } from '@mui/icons-material'
import pdfLogo from '../assets/pdf.png'
import { BasicProps } from '@smartb/g2-themes'
import { ClipLoader } from 'react-spinners'
import { CheckBox } from '../Checkbox'
import { useTheme } from '@smartb/g2-themes'

const useStyles = makeStyles(() => ({
  iframe: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    border: '#e3e3e3 1px solid',
    borderBottom: 'none'
  },
  container: {
    position: 'relative'
  },
  image: {
    width: '100%'
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    overflow: 'hidden',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    border: '#e3e3e3 1px solid',
    borderBottom: 'none'
  },
  titleContainer: {
    width: 'calc(100% - 10px)',
    height: '20%',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
    background: 'white',
    border: '#e3e3e3 1px solid',
    padding: '5px'
  },
  clear: {
    color: '#757575',
    position: 'absolute',
    right: '5px',
    cursor: 'pointer'
  },
  check: {
    position: 'absolute',
    right: '0px',
    marginRight: '-3px'
  },
  pdf: {
    color: '#e54539'
  },
  text: {
    marginLeft: '5px',
    fontSize: '12px',
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  clickableContainer: {
    cursor: 'pointer'
  },
  hoverComponent: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    position: 'absolute',
    top: '0',
    left: '0',
    background: 'rgba(240, 240, 240, 0.6)',
    border: '1px rgba(240, 240, 240, 0.6) solid'
  },
  loading: {
    background: 'rgba(240, 240, 240, 0.6)',
    border: '1px rgba(240, 240, 240, 0.6) solid'
  }
}))

export interface FilePreviewProps extends BasicProps {
  url?: string
  file?: File
  title: string
  readonly?: boolean
  onRemove?: () => void
  onClick?: () => void
  hoverComponent?: React.ReactNode
  isLoading?: boolean
  validated?: boolean
}

export const FilePreview = (props: FilePreviewProps) => {
  const {
    url = pdfLogo,
    file,
    readonly,
    title,
    className,
    style,
    onRemove,
    onClick,
    id,
    hoverComponent,
    isLoading = false,
    validated
  } = props
  const [urlData, setUrlData] = useState<string>('')
  const [hover, setHover] = useState<boolean>(false)
  const theme = useTheme()
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setUrlData(reader.result as string)
      }
    }
  }, [file])

  const classes = useStyles()
  return (
    <div
      className={`${className} ${classes.container} ${
        onClick && classes.clickableContainer
      }`}
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      id={id}
    >
      {urlData !== '' ? (
        <iframe src={urlData} className={classes.iframe} scrolling='no' />
      ) : (
        <div className={classes.imageContainer}>
          <img src={url} alt={title} className={classes.image} />
        </div>
      )}
      {((hoverComponent && hover) || isLoading) && (
        <div className={classes.hoverComponent}>
          {!isLoading ? (
            hoverComponent
          ) : (
            <Box
              display='flex'
              height='100%'
              justifyContent='center'
              alignItems='center'
              className={classes.loading}
            >
              <ClipLoader size={40} color={theme.colors.primary} />{' '}
            </Box>
          )}
        </div>
      )}
      <Box
        className={classes.titleContainer}
        display='flex'
        position='relative'
        alignItems='center'
      >
        <PictureAsPdf className={classes.pdf} />
        <Typography
          variant='body2'
          align='left'
          className={classes.text}
          style={{
            maxWidth:
              readonly && validated === undefined
                ? 'calc(100% - 30px)'
                : 'calc(100% - 50px)'
          }}
        >
          {title}
        </Typography>
        {!readonly ? (
          <Clear
            className={classes.clear}
            onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
              event.stopPropagation()
              onRemove && onRemove()
            }}
          />
        ) : (
          validated !== undefined && (
            <CheckBox className={classes.check} checked={validated} />
          )
        )}
      </Box>
    </div>
  )
}
