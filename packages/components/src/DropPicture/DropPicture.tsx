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
import clsx from 'clsx'

//@ts-ignore
const useStyles = makeG2STyles()({
  root: {
    position: 'relative',
    width: `100%`,
    height: `100%`
  },
  dropZone: {
    width: `100%`,
    height: `100%`,
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
    width: `100%`,
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
    width: `100%`,
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
  onPictureDroped?: (picture: File) => void
  /**
   * The event called when the picture is removed
   */
  onRemovePicture?: () => void
  /**
   * The event called when an invalid picture is dropped
   */
  onDropError?: (
    errorType:
      | 'file-too-large'
      | 'too-many-files'
      | 'file-invalid-type'
      | string
  ) => void
  /**
   * The error message to display under the component
   */
  errorMessage?: string
  /**
   * Set the width for the dropzone area
   *
   * @default 200
   */
  width?: number
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
   * @default "Ajouter une image"
   */
  addPictureHelperText?: string
  /**
   * The text in the tooltip when a picture is removable
   *
   * @default "Supprimer cette image"
   */
  removePictureHelperText?: string
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
    onRemovePicture,
    className,
    style,
    width = 200,
    readonly = false,
    initialPicture = '',
    defaultPicture = '',
    maxSize = 1000000,
    errorMessage,
    onDropError,
    id,
    addPictureHelperText = 'Ajouter une image',
    removePictureHelperText = 'Supprimer cette image',
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
      onPictureDroped && onPictureDroped(acceptedFiles[0])
      const reader = new FileReader()
      reader.readAsDataURL(acceptedFiles[0])
      reader.onload = () => {
        setLogo(reader.result as string)
      }
    },
    [onPictureDroped]
  )

  const onReject = useCallback(
    (files: FileRejection[]) =>
      onDropError && onDropError(files[0].errors[0].code),
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
        className={clsx(defaultStyles.classes.image, classes?.image)}
        style={styles?.image}
        alt='A picture'
        onError={onError}
      />
    )

  if (logo === '')
    return (
      <div
        ref={ref}
        className={clsx(
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
            className={clsx(
              defaultStyles.classes.dropZone,
              'AruiDropzone-dropzone',
              classes?.dropZone
            )}
            style={styles?.dropZone}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <AddPhotoAlternate
              className={clsx(
                defaultStyles.classes.add,
                classes?.addPictureIcon
              )}
              style={styles?.addPictureIcon}
            />
          </Paper>
        </Tooltip>
        {!!errorMessage && (
          <Typography
            className={clsx(
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
        className={clsx(
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
          className={clsx(
            defaultStyles.classes.image,
            'AruiDropzone-image',
            classes?.image
          )}
          style={styles?.image}
          alt='The uploaded picture'
          onError={onError}
        />
        <Clear
          className={clsx(
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
