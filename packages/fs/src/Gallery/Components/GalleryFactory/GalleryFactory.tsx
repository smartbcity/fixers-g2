import React, { useCallback, useMemo, useState } from 'react'
import { FsFile } from '../../Domain'
import { cx } from '@emotion/css'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { AddPhotoAlternateRounded, CloseRounded } from '@mui/icons-material'
import {
  Dropzone,
  DropzoneStatus,
  IMAGE_MIME_TYPE,
  DropzoneProps
} from '@mantine/dropzone'
import { FileRejection } from 'react-dropzone'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { StackProps } from '@mantine/core'
import { DropError } from '@smartb/g2-components'

export interface GalleryFactoryClasses {
  image?: string
  imageContainer?: string
  closeButton?: string
  closeIcon?: string
  dropzone?: string
}

export interface GalleryFactoryStyles {
  image?: React.CSSProperties
  imageContainer?: React.CSSProperties
  closeButton?: React.CSSProperties
  closeIcon?: React.CSSProperties
  dropzone?: React.CSSProperties
}

const defaultErrorMessages: { [key in DropError]?: string } = {
  'file-invalid-type':
    'Les types de fichier accepté sont le: jpg, jpeg, png, gif, webp et svg',
  'file-too-large':
    'Un ou plusieurs fichiers sont trop volumineux: ils ne doivent pas dépasser 10Mo'
}

export interface GalleryFactoryBasicProps extends BasicProps {
  /**
   * The images to display in the gallery.
   */
  files: FsFile[]
  /**
   * The gallery's name use in the alt attribute of the images.
   */
  galleryName?: string
  /**
   * onDelete image event handler.
   */
  onDelete?: (file: FsFile) => void
  /**
   * onDelete image event handler.
   */
  onAdd?: (files: File[]) => void
  /**
   * onReject image event handler.
   */
  onReject?: (errors: DropError[]) => void
  /**
   * loading state.
   */
  isLoading?: boolean
  /**
   * use this to override the default dropzone container children
   */
  generateDropzone?: (status: DropzoneStatus) => JSX.Element
  /**
   * The props of the dropzone
   */
  dropzoneProps?: DropzoneProps
  /**
   * the strings in the component to do translations
   */
  strings?: {
    /**
     * @default 'Ajouter une ou plusieurs images'
     */
    addImages?: string
    errorMessages?: { [key in DropError]?: string }
  }
  /**
   * The classes applied to the different part of the component
   */
  classes?: GalleryFactoryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: GalleryFactoryStyles
}

export type GalleryFactoryProps = MergeMuiElementProps<
  StackProps,
  GalleryFactoryBasicProps
>

export const GalleryFactory = (props: GalleryFactoryProps) => {
  const {
    files = [],
    galleryName,
    onDelete,
    onAdd,
    onReject,
    isLoading = false,
    strings,
    classes,
    styles,
    className,
    generateDropzone,
    dropzoneProps,
    sx,
    ...rest
  } = props

  const [error, setError] = useState<DropError | undefined>(undefined)

  const images = useMemo(() => {
    return files.map((file) => {
      return (
        <Box
          className={cx(
            'AruiGalleryFactory-imageContainer',
            classes?.imageContainer
          )}
          style={styles?.imageContainer}
          key={file.path.name}
          sx={{
            position: 'relative',
            height: '100%'
          }}
        >
          {!!onDelete && (
            <IconButton
              className={cx(
                'AruiGalleryFactory-closeButton',
                classes?.closeButton
              )}
              style={styles?.closeButton}
              onClick={() => onDelete(file)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                borderRadius: '20px',
                background: 'rgb(73, 80, 87, 0.8)',
                color: 'white',
                '&:hover': {
                  background: 'rgb(73, 80, 87, 1)'
                }
              }}
            >
              <CloseRounded
                className={cx(
                  'AruiGalleryFactory-closeIcon',
                  classes?.closeIcon
                )}
                style={styles?.closeIcon}
                sx={{
                  width: '22px',
                  height: '22px'
                }}
              />
            </IconButton>
          )}
          <img
            className={cx('AruiGalleryFactory-image', classes?.image)}
            style={styles?.image}
            src={file.url}
            alt={`The image ${
              file.path.name.split('_')[1]
            } of the gallery ${galleryName}`}
            loading='lazy'
          />
        </Box>
      )
    })
  }, [files, galleryName, onDelete, classes, styles])

  const onRejectMemoized = useCallback(
    (fileRejections: FileRejection[]) => {
      if (onReject) {
        const errors: DropError[] = []
        fileRejections.forEach((reject) => {
          reject.errors.forEach((error) => {
            errors.push(error.code as DropError)
          })
        })
        onReject(errors)
      }
      setError(fileRejections[0].errors[0].code as DropError)
    },
    [onReject]
  )

  const onDrop = useCallback(
    (files: File[]) => {
      onAdd && onAdd(files)
      setError(undefined)
    },
    [onAdd]
  )

  const dropzone = useCallback(
    (status) =>
      generateDropzone
        ? generateDropzone(status)
        : dropzoneChildren(
            status,
            error
              ? !!strings?.errorMessages
                ? strings?.errorMessages[error]
                : defaultErrorMessages[error]
              : undefined,
            strings?.addImages
          ),
    [generateDropzone, error, strings]
  )

  return (
    //@ts-ignore
    <Stack
      className={cx('AruiGalleryFactory-root', className)}
      direction='row'
      alignItems='stretch'
      sx={{
        gap: '20px',
        overflow: 'auto',
        minHeight: '150px',
        ...sx,
        '& .AruiGalleryFactory-image': {
          borderRadius: '20px',
          height: '100%'
        },
        padding: '10px 0'
      }}
      {...rest}
    >
      {images}
      {!!onAdd &&
        (!isLoading ? (
          <Dropzone
            className={cx('AruiGalleryFactory-dropzone', classes?.dropzone)}
            style={styles?.dropzone}
            sx={{
              width: '300px',
              flexShrink: 0,
              maxWidth: '300px',
              borderRadius: '20px'
            }}
            onDrop={onDrop}
            onReject={onRejectMemoized}
            accept={IMAGE_MIME_TYPE}
            maxSize={10 * 1024 * 1024}
            {...dropzoneProps}
          >
            {dropzone}
          </Dropzone>
        ) : (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              flexShrink: 0,
              maxWidth: '300px'
            }}
          >
            <CircularProgress disableShrink />
          </Stack>
        ))}
    </Stack>
  )
}

export const dropzoneChildren = (
  _: DropzoneStatus,
  error?: string,
  addImagesString?: string
) => (
  <Stack
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}
  >
    <AddPhotoAlternateRounded
      sx={{
        width: '50px',
        height: '50px'
      }}
    />
    <Typography align='center'>
      {addImagesString ?? 'Ajouter une ou plusieurs images'}
    </Typography>
    {error && (
      <Typography
        sx={{ paddingTop: '15px' }}
        align='center'
        variant='body2'
        color='error'
      >
        {error}
      </Typography>
    )}
  </Stack>
)
