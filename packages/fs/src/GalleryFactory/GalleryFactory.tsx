import React, { useCallback, useMemo } from 'react'
import { FsFile } from '../Gallery/types'
import { cx } from '@emotion/css'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { AddPhotoAlternateRounded, CloseRounded } from '@mui/icons-material'
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { FileRejection } from 'react-dropzone'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { StackProps } from '@mantine/core'

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
   * the strings in the component to do translations
   */
  strings?: {
    /**
     * @default 'Ajouter une ou plusieurs images'
     */
    addImages?: string
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

export type DropError =
  | 'file-too-large'
  | 'too-many-files'
  | 'file-invalid-type'

export type GalleryFactoryProps = MergeMuiElementProps<
  StackProps,
  GalleryFactoryBasicProps
>

export const GalleryFactory = (props: GalleryFactoryProps) => {
  const {
    files,
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
    ...rest
  } = props

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
          <IconButton
            className={cx(
              'AruiGalleryFactory-closeButton',
              classes?.closeButton
            )}
            style={styles?.closeButton}
            onClick={() => onDelete && onDelete(file)}
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
              className={cx('AruiGalleryFactory-closeIcon', classes?.closeIcon)}
              style={styles?.closeIcon}
              sx={{
                width: '22px',
                height: '22px'
              }}
            />
          </IconButton>
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
    },
    [onReject]
  )

  const onDrop = useCallback(
    (files: File[]) => {
      onAdd && onAdd(files)
    },
    [onAdd]
  )

  return (
    <Stack
      className={cx('AruiGalleryFactory-root', className)}
      direction='row'
      alignItems='stretch'
      //@ts-ignore
      sx={{
        gap: '20px',
        overflow: 'auto',
        height: '100%',
        '& .AruiGalleryFactory-image': {
          borderRadius: '20px',
          height: '100%'
        },
        padding: '10px 0'
      }}
      {...rest}
    >
      {images}
      {!isLoading ? (
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
        >
          {(status) =>
            generateDropzone
              ? generateDropzone(status)
              : dropzoneChildren(status, strings?.addImages)
          }
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
      )}
    </Stack>
  )
}

export const dropzoneChildren = (
  _: DropzoneStatus,
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
    <Typography>
      {addImagesString ?? 'Ajouter une ou plusieurs images'}
    </Typography>
  </Stack>
)
