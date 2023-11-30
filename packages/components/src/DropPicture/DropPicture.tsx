import React, { useState, useEffect, useCallback, forwardRef } from 'react'
import { FileRejection, DropzoneProps, useDropzone } from 'react-dropzone'
import { Paper, Typography, Skeleton } from '@mui/material'
import { Clear, AddPhotoAlternate } from '@mui/icons-material'
import {
  BasicProps,
  MergeMuiElementProps,
  makeG2STyles
} from '@smartb/g2-themes'
import { Tooltip } from '@smartb/g2-notifications'
import { useTranslation } from 'react-i18next'

const useStyles = makeG2STyles<{ height: string }>()((theme, { height }) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: height
  },
  dropZone: {
    width: '100%',
    height: height,
    background: 'rgb(237, 237, 237)',
    border: 'dashed rgba(209,202,203,1) 2px',
    borderRadius: theme.borderRadius,
    position: 'relative',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none'
    }
  },
  error: {
    color: '#bd1313',
    fontSize: '12px'
  },
  image: {
    width: '100%',
    borderRadius: theme.borderRadius,
    objectFit: 'contain',
    height: height,
    position: 'relative'
  },
  clear: {
    color: '#757575',
    width: '40px',
    height: '40px',
    display: 'none',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%'
  },
  container: {
    width: '100%',
    height: height,
    position: 'relative',
    cursor: 'pointer',
    '&:hover img': {
      opacity: '0.4'
    },
    '&:hover svg': {
      display: 'block'
    }
  },
  add: {
    color: 'rgba(209,202,203,1)',
    width: '70px',
    height: '70px',
    position: 'absolute',
    transform: 'translate(-50%,-50%)',
    top: '50%',
    left: '50%'
  },
  hidder: {
    position: 'fixed',
    top: 0,
    left: 0
  }
}))

export type DropPictureError =
  | 'file-too-large'
  | 'too-many-files'
  | 'file-invalid-type'

interface DropPictureClasses {
  image?: string
  tooltip?: string
  dropZone?: string
  addPictureIcon?: string
  errorMessage?: string
  clearIcon?: string
}

interface DropPictureStyles {
  image?: React.CSSProperties
  tooltip?: React.CSSProperties
  dropZone?: React.CSSProperties
  addPictureIcon?: React.CSSProperties
  errorMessage?: React.CSSProperties
  clearIcon?: React.CSSProperties
}

export interface DropPictureBasicProps extends BasicProps {
  /**
   * The event called when a picture is dropped
   */
  onPictureDropped?: (picture: File) => void
  /**
   * The event called when the picture is removed
   */
  onRemovePicture?: () => void
  /**
   * The custom error message
   */
  customErrorMessage?: string
  /**
   * If true, the dropzone won't appear and the `initialPicture` or the `defaultPicture` will be displayed
   */
  readOnly?: boolean
  /**
   * The initial picture that can be removed and changed
   */
  pictureUrl?: string
  /**
   * The default picture that will be displayed if the first one doesn't exist or is unfundable. This prop is used only when `readOnly` is true
   */
  defaultPicture?: string
  /**
   * The maximum size in bytes the picture can be
   *
   * @default 10 * 1024 * 1024
   */
  maxSize?: number
  /**
   * The description of the picture
   *
   * @default "A picture"
   */
  alt?: string
  /**
   * isLoading state
   * @default false
   */
  isLoading?: boolean
  /**
   * the height of the component
   * @default "100%"
   */
  height?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: DropPictureClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: DropPictureStyles
}

export type DropPictureProps = MergeMuiElementProps<
  DropzoneProps,
  DropPictureBasicProps
>

const DropPictureBase = (
  props: DropPictureProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const {
    onPictureDropped,
    onRemovePicture,
    className,
    style,
    readOnly = false,
    pictureUrl,
    defaultPicture = '',
    maxSize = 10 * 1024 * 1024,
    customErrorMessage,
    id,
    alt = 'A picture',
    classes,
    styles,
    isLoading = false,
    height = '100%',
    ...other
  } = props
  const [error, setError] = useState(customErrorMessage)
  const [unFound, setUnFound] = useState(false)
  const defaultStyles = useStyles({ height })
  const { t } = useTranslation()

  useEffect(() => {
    setError(customErrorMessage)
  }, [customErrorMessage])

  useEffect(() => {
    setUnFound(false)
  }, [readOnly])

  const onUpload = useCallback(
    (acceptedFiles: File[]) => {
      onPictureDropped && onPictureDropped(acceptedFiles[0])
    },
    [onPictureDropped]
  )

  const onReject = useCallback(
    (fileRejections: FileRejection[]) => {
      const code = fileRejections[0].errors[0].code as DropPictureError
      setError(
        t('g2.' + code, {
          formats: ['png', 'jpeg'].join(` ${t('g2.or')} `),
          sizeLimit: maxSize / 1024 / 1024
        })
      )
    },
    [maxSize]
  )

  const { getRootProps, getInputProps } = useDropzone({
    ...other,
    multiple: false,
    accept: 'image/jpeg, image/png',
    maxSize: maxSize,
    onDropAccepted: onUpload,
    onDropRejected: onReject
  })

  const onError = useCallback(() => setUnFound(true), [])

  if (isLoading)
    return (
      <Skeleton
        className={defaultStyles.cx('AruiDropzone-skeleton')}
        sx={{
          width: '100%',
          height: height,
          transform: 'none'
        }}
        animation='wave'
      />
    )
  if (readOnly)
    return (
      <img
        src={!unFound ? pictureUrl : defaultPicture}
        className={defaultStyles.cx(
          defaultStyles.classes.image,
          classes?.image,
          'AruiDropzone-image',
          className
        )}
        style={styles?.image}
        alt={alt}
        onError={onError}
      />
    )

  if (!pictureUrl)
    return (
      <div
        ref={ref}
        className={defaultStyles.cx(
          defaultStyles.classes.root,
          'AruiDropzone-root',
          className
        )}
        style={style}
      >
        <Tooltip
          helperText={t('g2.addPicture')}
          className={classes?.tooltip}
          style={styles?.tooltip}
        >
          <Paper
            elevation={0}
            className={defaultStyles.cx(
              defaultStyles.classes.dropZone,
              'AruiDropzone-dropzone',
              classes?.dropZone
            )}
            style={styles?.dropZone}
            {...getRootProps()}
          >
            <input id={id} {...getInputProps()} />
            <AddPhotoAlternate
              className={defaultStyles.cx(
                defaultStyles.classes.add,
                classes?.addPictureIcon
              )}
              style={styles?.addPictureIcon}
            />
          </Paper>
        </Tooltip>
        {!!error && (
          <Typography
            className={defaultStyles.cx(
              defaultStyles.classes.error,
              'AruiDropzone-error',
              classes?.errorMessage
            )}
            style={styles?.errorMessage}
            variant='body2'
            align='center'
          >
            {error}
          </Typography>
        )}
      </div>
    )
  return (
    <Tooltip
      helperText={t('g2.removePicture')}
      className={classes?.tooltip}
      style={styles?.tooltip}
    >
      <div
        ref={ref}
        className={defaultStyles.cx(
          defaultStyles.classes.container,
          'AruiDropzone-root',
          className
        )}
        style={style}
        id={id}
        onClick={onRemovePicture}
      >
        <img
          src={pictureUrl}
          className={defaultStyles.cx(
            defaultStyles.classes.image,
            'AruiDropzone-image',
            classes?.image
          )}
          style={styles?.image}
          alt={alt}
          onError={onError}
        />
        <Clear
          className={defaultStyles.cx(
            defaultStyles.classes.clear,
            'AruiDropzone-clearIcon',
            classes?.clearIcon
          )}
          style={styles?.clearIcon}
        />
      </div>
    </Tooltip>
  )
}

export const DropPicture = forwardRef(DropPictureBase) as typeof DropPictureBase
