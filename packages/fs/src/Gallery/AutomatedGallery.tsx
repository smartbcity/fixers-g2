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
   * the hook to get the files
   */
  useGetGallery: () => UseQueryResult<
    | {
        files: FsFile[]
      }
    | undefined
  >
}

export type AutomatedGalleryProps = MergeMuiElementProps<
  Omit<GalleryProps, 'files'>,
  AutomatedGalleryBasicProps
>

export const AutomatedGallery = (props: AutomatedGalleryProps) => {
  const { useGetGallery, ...rest } = props

  const gallery = useGetGallery()

  return <Gallery {...rest} files={gallery.data?.files ?? []} />
}
