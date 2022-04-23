import { MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { Gallery, GalleryProps } from './Gallery'
import { FsFile } from '.'
import { UseQueryResult } from 'react-query'

export type TrackedFsFile = FsFile & {
  isNew?: boolean
}

export interface AutomatedGalleryBasicProps {
  /**
   * the state in result of the hook useGetGallery
   */
  gallery: UseQueryResult<
    | {
        files: FsFile[]
      }
    | undefined,
    unknown
  >
}

export type AutomatedGalleryProps = MergeMuiElementProps<
  Omit<GalleryProps, 'files'>,
  AutomatedGalleryBasicProps
>

export const AutomatedGallery = (props: AutomatedGalleryProps) => {
  const { gallery, ...rest } = props

  return <Gallery {...rest} files={gallery.data?.files ?? []} />
}
