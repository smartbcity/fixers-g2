import { ImageList, ImageListItem, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { FsFile } from '../../Domain'
import { cx } from '@emotion/css'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { AutoCompleteBasicProps } from '@smartb/g2-forms/src/AutoComplete'
import { ImageListProps } from '@mui/material/ImageList/ImageList'

export interface GalleryClasses {
  image?: string
  item?: string
}

export interface GalleryStyles {
  image?: React.CSSProperties
  item?: React.CSSProperties
}

export type GridProps<T = any> = MergeMuiElementProps<
  ImageListProps,
  AutoCompleteBasicProps<T>
>

export interface GalleryProps extends BasicProps {
  /**
   * The images to display in the gallery.
   */
  files: FsFile[]
  /**
   * The variants to display in the gallery.
   *
   * @default "grid"
   */
  variant?: 'grid' | 'verticalList' | 'horizontalList'
  /**
   * The gallery's name use in the alt attribute of the images.
   */
  galleryName?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: GalleryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: GalleryStyles
  /**
   * the props of the grid if you choosed it
   */
  gridProps?: GridProps
}

export const Gallery = (props: GalleryProps) => {
  const {
    files,
    variant = 'grid',
    galleryName,
    classes,
    styles,
    className,
    gridProps,
    ...other
  } = props

  const images = useMemo(() => {
    if (variant !== 'grid') {
      return files.map((file) => {
        return (
          <img
            className={cx('AruiGallery-image', classes?.image)}
            key={file.path.name}
            src={file.url}
            alt={`The image ${
              file.path.name.split('_')[1]
            } of the gallery ${galleryName}`}
            loading='lazy'
          />
        )
      })
    } else {
      return files.map((file) => {
        return (
          <ImageListItem key={file.path.name} className={classes?.item}>
            <img
              className={cx('AruiGallery-image', classes?.image)}
              src={file.url}
              alt={`The image ${
                file.path.name.split('_')[1]
              } of the gallery ${galleryName}`}
              loading='lazy'
            />
          </ImageListItem>
        )
      })
    }
  }, [variant, files, galleryName, classes?.image, classes?.item])

  if (variant !== 'grid')
    return (
      <Stack
        {...other}
        className={cx('AruiGallery-root', className)}
        direction={variant === 'verticalList' ? 'column' : 'row'}
        alignItems='stretch'
        sx={{
          gap: '20px',
          overflow: 'auto',
          height: '100%',
          '& .AruiGallery-image': {
            borderRadius: '20px'
          }
        }}
      >
        {images}
      </Stack>
    )
  return (
    <ImageList
      {...other}
      variant='masonry'
      cols={2}
      gap={20}
      {...gridProps}
      className={cx('AruiGallery-root', className, gridProps?.className)}
      sx={{
        '& .AruiGallery-image': {
          borderRadius: '20px',
          height: '100%'
        },
        ...gridProps?.sx
      }}
    >
      {images}
    </ImageList>
  )
}
