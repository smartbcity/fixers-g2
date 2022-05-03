import { Stack, Typography } from '@mui/material'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useState } from 'react'
import { fileToBase64 } from '@smartb/g2-utils'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { v4 as uuidv4 } from 'uuid'
import {
  FileDeleteCommand,
  FileUploadCommand,
  FsFile,
  TrackedFsFile
} from '../../Domain'
import { Button } from '@smartb/g2-components'
import { DirectoryPath } from '../../Domain'
import {
  GetGalleryOptions,
  useGetGallery,
  useUploadFiles,
  useDeleteFiles,
  DeleteFilesOptions,
  UploadFilesOptions
} from '../..'
import { useQueryClient } from 'react-query'

export interface AutomatedGalleryFactoryBasicProps {
  /**
   * The Api url where to make the locals Api calls
   */
  apiUrl: string
  /**
   * The token to authorize the Api calls
   */
  jwt?: string
  /**
   * the directory path of the gallery
   */
  directoryPath: DirectoryPath
  /**
   * The getGallery hook options
   */
  getGalleryOptions?: GetGalleryOptions
  /**
   * The deleteFiles hook options
   */
  deleteFilesOptions?: DeleteFilesOptions
  /**
   * The uploadFiles hook options
   */
  uploadFilesOptions?: UploadFilesOptions
  /**
   * the strings in the component to do translations
   */
  strings?: {
    /**
     * @default 'Galerie'
     */
    gallery?: string
    /**
     * @default 'Eregistrer'
     */
    save?: string
    /**
     * @default 'Ajouter une ou plusieurs images'
     */
    addImages?: string
  }
}

export type AutomatedGalleryFactoryProps = MergeMuiElementProps<
  Omit<GalleryFactoryProps, 'files' | 'onAdd' | 'onDelete'>,
  AutomatedGalleryFactoryBasicProps
>

export const AutomatedGalleryFactory = (
  props: AutomatedGalleryFactoryProps
) => {
  const {
    directoryPath,
    strings,
    apiUrl,
    jwt,
    getGalleryOptions,
    deleteFilesOptions,
    uploadFilesOptions,
    ...rest
  } = props
  const [currentGallery, setCurrentGallery] = useState<TrackedFsFile[]>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const gallery = useGetGallery({
    apiUrl: apiUrl,
    directoryPath: directoryPath,
    jwt: jwt,
    options: {
      ...getGalleryOptions
    }
  })

  const deleteFiles = useDeleteFiles({
    apiUrl: apiUrl,
    jwt: jwt,
    options: {
      ...deleteFilesOptions,
      onSuccess: (data, varaibles, context) => {
        if (data) {
          const removesIds = data.map((event) => event.path.name)
          const filtered = (gallery.data?.files ?? []).filter(
            (file) => !removesIds.includes(file.path.name)
          )
          queryClient.setQueryData('gallery', { files: filtered })
        }
        deleteFilesOptions?.onSuccess?.(data, varaibles, context)
      }
    }
  })

  const uploadFiles = useUploadFiles({
    apiUrl: apiUrl,
    jwt: jwt,
    options: {
      ...uploadFilesOptions,
      onSuccess: (data, varaibles, context) => {
        if (data) {
          const galleryCopy = !!gallery.data?.files
            ? [...gallery.data?.files]
            : []
          data.forEach((event) => {
            galleryCopy.push(event)
          })
          queryClient.setQueryData('gallery', { files: galleryCopy })
        }
        uploadFilesOptions?.onSuccess?.(data, varaibles, context)
      }
    }
  })

  useEffect(() => {
    if (gallery.data) {
      setCurrentGallery(gallery.data.files)
    }
  }, [gallery.data])

  const onAdd = useCallback(
    (files: File[]) => {
      setIsLoading(true)
      const fsFiles = files.map(async (file): Promise<TrackedFsFile> => {
        const base64 = await fileToBase64(file)
        const name = `${uuidv4()}_${file.name}`
        return {
          id: name,
          metadata: {},
          path: {
            ...directoryPath,
            name: name
          },
          url: base64,
          isNew: true
        }
      })
      Promise.all(fsFiles).then((values) => {
        setCurrentGallery((oldValues) => [...oldValues, ...values])
        setIsLoading(false)
      })
      setHasChanges(true)
    },
    [directoryPath]
  )

  const onDelete = useCallback((file: FsFile) => {
    setCurrentGallery((oldValues) =>
      oldValues.filter((element) => file.id !== element.id)
    )
    setHasChanges(true)
  }, [])

  const onSave = useCallback(async () => {
    setIsSaving(true)
    setIsLoading(true)
    const base = gallery.data?.files || []
    const deleteCommands: FileDeleteCommand[] = []
    const uploadCommands: FileUploadCommand[] = []
    currentGallery.forEach((element) => {
      if (element.isNew) {
        uploadCommands.push({
          content: element.url,
          path: element.path,
          metadata: {}
        })
      }
    })
    base.forEach((element) => {
      if (!currentGallery.find((element2) => element2.id === element.id)) {
        deleteCommands.push({
          ...element.path
        })
      }
    })
    if (uploadCommands.length > 0) {
      await uploadFiles.mutateAsync(uploadCommands)
    }
    if (deleteCommands.length > 0) {
      await deleteFiles.mutateAsync(deleteCommands)
    }
    setIsSaving(false)
    setIsLoading(false)
    setHasChanges(false)
  }, [
    currentGallery,
    deleteFiles.mutateAsync,
    uploadFiles.mutateAsync,
    gallery.data,
    gallery.refetch
  ])

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          gap: '10px',
          marginBottom: '15px'
        }}
      >
        <Typography variant='h6'>{strings?.gallery ?? 'Galerie'}</Typography>
        {hasChanges && (
          <Button onClick={onSave} isLoading={isSaving}>
            {strings?.save ?? 'Enregistrer'}
          </Button>
        )}
      </Stack>
      <GalleryFactory
        {...rest}
        files={currentGallery}
        onAdd={onAdd}
        onDelete={onDelete}
        isLoading={isLoading}
        strings={strings}
      />
    </>
  )
}
