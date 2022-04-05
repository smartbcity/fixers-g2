import React, { useState, useEffect, useCallback, forwardRef } from 'react'
import { FileRejection, DropzoneProps, useDropzone } from 'react-dropzone'
import { Paper, Typography } from '@mui/material'
import { Clear, AddPhotoAlternate } from '@mui/icons-material'
import {
  BasicProps,
  MergeMuiElementProps,
  makeG2STyles
} from '@smartb/g2-themes'
import { Tooltip } from '@smartb/g2-notifications'

const useStyles = makeG2STyles()({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  dropZone: {
    width: '100%',
    height: '100%',
    background: 'rgb(237, 237, 237)',
    border: 'dashed rgba(209,202,203,1) 2px',
    borderRadius: '5px',
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
    borderRadius: '5px',
    objectFit: 'cover',
    height: '100%'
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
    height: 'auto',
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
})

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
   * @deprecated Use onPictureDropped instead. Remove in 1.0.0-alpha.30
   */
  onPictureDroped?: (picture: File) => void
  /**
   * The event called when a picture is dropped
   */
  onPictureDropped?: (picture: File) => void
  /**
   * The event called when the picture is removed
   */
  onRemovePicture?: () => void
  /**
   * The event called when an invalid picture is dropped
   */
  onDropError?: (errorType: DropPictureError) => void
  /**
   * The error message to display under the component
   */
  errorMessage?: string
  /**
   * If true, the dropzone won't appear and the `initialPicture` or the `defaultPicture` will be displayed
   */
  readonly?: boolean
  /**
   * The initial picture that can be removed and changed
   */
  initialPicture?: string
  /**
   * The default picture that will be displayed if the first one doesn't exist or is unfindable. This prop is used only when `readonly` is true
   */
  defaultPicture?: string
  /**
   * The maximum size in bytes the picture can be
   *
   * @default 1000000
   */
  maxSize?: number
  /**
   * The text in the tooltip when a picture is dropable
   *
   * @default "'Add an image"
   */
  addPictureHelperText?: string
  /**
   * The text in the tooltip when a picture is removable
   *
   * @default "Delete this image"
   */
  removePictureHelperText?: string
  /**
   * The description of the picture
   *
   * @default "A picture"
   */
  alt?: string
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
    onPictureDroped,
    onPictureDropped,
    onRemovePicture,
    className,
    style,
    readonly = false,
    initialPicture = '',
    defaultPicture = '',
    maxSize = 1000000,
    errorMessage,
    onDropError,
    id,
    addPictureHelperText = 'Add an image',
    removePictureHelperText = 'Delete this image',
    alt = 'A picture',
    classes,
    styles,
    ...other
  } = props

  const defaultStyles = useStyles()
  const [logo, setLogo] = useState<string>(initialPicture)

  useEffect(() => {
    setLogo(initialPicture)
  }, [initialPicture])

  const onUpload = useCallback(
    (acceptedFiles: File[]) => {
      // TODO @deprecated replace by onPictureDropped
      onPictureDroped && onPictureDroped(acceptedFiles[0])
      onPictureDropped && onPictureDropped(acceptedFiles[0])
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = () => {
        setLogo(reader.result as string)
      }
    },
    [onPictureDroped, onPictureDropped]
  )

  const onReject = useCallback(
    (files: FileRejection[]) =>
      onDropError && onDropError(files[0].errors[0].code as DropPictureError),
    [onDropError]
  )

  const { getRootProps, getInputProps } = useDropzone({
    ...other,
    multiple: false,
    accept: 'image/jpeg, image/png',
    maxSize: maxSize,
    onDropAccepted: onUpload,
    onDropRejected: onReject
  })

  const onRemoveLogo = useCallback(() => {
    setLogo('')
    onRemovePicture && onRemovePicture()
  }, [onRemovePicture])

  const onError = useCallback(() => setLogo(''), [])

  if (readonly)
    return (
      <img
        src={logo !== '' ? logo : defaultPicture}
        className={defaultStyles.cx(
          defaultStyles.classes.image,
          classes?.image
        )}
        style={styles?.image}
        alt={alt}
        onError={onError}
      />
    )

  if (logo === '')
    return (
      <div
        ref={ref}
        className={defaultStyles.cx(
          defaultStyles.classes.root,
          'AruiDropzone-root',
          className
        )}
        style={style}
        id={id}
      >
        <Tooltip
          helperText={addPictureHelperText}
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
            <input {...getInputProps()} />
            <AddPhotoAlternate
              className={defaultStyles.cx(
                defaultStyles.classes.add,
                classes?.addPictureIcon
              )}
              style={styles?.addPictureIcon}
            />
          </Paper>
        </Tooltip>
        {!!errorMessage && (
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
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  return (
    <Tooltip
      helperText={removePictureHelperText}
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
        onClick={onRemoveLogo}
      >
        <img
          src={logo}
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
