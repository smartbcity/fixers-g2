import { MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { Gallery, GalleryProps } from './Gallery'
import { DirectoryPath } from '../../Domain'
import { GetGalleryOptions, useGetGallery } from '../..'

export interface AutomatedGalleryBasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
  /**
   * The directoryPath of the gallery
   */
  directoryPath: DirectoryPath
  /**
   * The getGallery hook options
   */
  getGalleryOptions?: GetGalleryOptions
}

export type AutomatedGalleryProps = MergeMuiElementProps<
  Omit<GalleryProps, 'files'>,
  AutomatedGalleryBasicProps
>

export const AutomatedGallery = (props: AutomatedGalleryProps) => {
  const { apiUrl, jwt, getGalleryOptions, directoryPath, ...rest } = props

  const gallery = useGetGallery({
    apiUrl: apiUrl,
    jwt: jwt,
    directoryPath: directoryPath,
    options: getGalleryOptions
  })

  return <Gallery {...rest} files={gallery.data?.files ?? []} />
}
