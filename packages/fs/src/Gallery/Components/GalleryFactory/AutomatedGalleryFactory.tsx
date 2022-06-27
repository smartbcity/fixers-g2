import { Stack, Typography } from '@mui/material'
import { Button } from '@smartb/g2-components'
import { fsConfig } from '@smartb/g2-providers'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import { fileToBase64 } from '@smartb/g2-utils'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import {
  DeleteFilesOptions,
  GetGalleryOptions,
  UploadFilesOptions,
  useDeleteFiles,
  useGetGallery,
  useUploadFiles
} from '../..'
import {
  DirectoryPath,
  FileDeleteCommand,
  FsFile,
  TrackedFsFile
} from '../../Domain'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'

export interface AutomatedGalleryFactoryBasicProps {
  /**
   * the directory path of the gallery
   */
  directoryPath: DirectoryPath
  /**
   * The getGallery hook options
   */
  getGalleryOptions?: GetGalleryOptions
  /**
   * The getGallery query key
   */
  getGalleryQueryKey?: string
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
     * @default 'Annuler'
     */
    cancel?: string
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
    getGalleryOptions,
    deleteFilesOptions,
    uploadFilesOptions,
    getGalleryQueryKey,
    ...rest
  } = props
  const [currentGallery, setCurrentGallery] = useState<TrackedFsFile[]>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const gallery = useGetGallery({
    apiUrl: fsConfig().url,
    directoryPath: directoryPath,
    options: {
      ...getGalleryOptions
    },
    queryKey: getGalleryQueryKey
  })

  const deleteFiles = useDeleteFiles({
    apiUrl: fsConfig().url,
    options: {
      ...deleteFilesOptions,
      onSuccess: (data, varaibles, context) => {
        if (data) {
          const removesIds = data.map((event) => event.path.name)
          const filtered = (gallery.data?.items ?? []).filter(
            (file) => !removesIds.includes(file.path.name)
          )
          queryClient.setQueryData('gallery', { files: filtered })
        }
        deleteFilesOptions?.onSuccess?.(data, varaibles, context)
      }
    }
  })

  const uploadFiles = useUploadFiles({
    apiUrl: fsConfig().url,
    options: {
      ...uploadFilesOptions,
      onSuccess: (data, varaibles, context) => {
        if (data) {
          const galleryCopy = !!gallery.data?.items
            ? [...gallery.data?.items]
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
      setCurrentGallery(gallery.data.items)
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
          isNew: true,
          file: file
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
      oldValues.map((element) => {
        if (file.id === element.id) {
          return {
            ...element,
            isDeleted: true
          }
        }
        return element
      })
    )
    setHasChanges(true)
  }, [])

  const onCancel = useCallback(() => {
    setCurrentGallery(gallery.data?.items ?? [])
    setHasChanges(false)
  }, [gallery.data?.items])

  const onSave = useCallback(async () => {
    setIsSaving(true)
    setIsLoading(true)
    const filesToSave = currentGallery.filter(
      (file) => file.isNew && !file.isDeleted && !!file.file
    )
    const deleteCommands: FileDeleteCommand[] = currentGallery
      .filter((file) => file.isDeleted && !file.isNew)
      .map((file) => file.path)

    if (filesToSave.length > 0) {
      await uploadFiles.mutateAsync(filesToSave)
      filesToSave
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
    gallery.data
  ])

  const displayedGallery = useMemo(
    () => currentGallery.filter((file) => !file.isDeleted),
    [currentGallery]
  )

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          gap: '10px',
          marginBottom: (theme) => theme.spacing(2)
        }}
      >
        <Typography variant='h6'>{strings?.gallery ?? 'Galerie'}</Typography>
        {hasChanges && (
          <>
            <Button onClick={onSave} isLoading={isSaving}>
              {strings?.save ?? 'Enregistrer'}
            </Button>
            {!isSaving && (
              <Button onClick={onCancel}>{strings?.cancel ?? 'Annuler'}</Button>
            )}
          </>
        )}
      </Stack>
      <GalleryFactory
        {...rest}
        files={displayedGallery}
        onAdd={onAdd}
        onDelete={onDelete}
        isLoading={isLoading}
        strings={strings}
      />
    </>
  )
}
