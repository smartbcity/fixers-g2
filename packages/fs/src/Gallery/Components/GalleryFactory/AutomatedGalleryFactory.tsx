import { Stack, Typography } from '@mui/material'
import { Button } from '@smartb/g2-components'
import { fsConfig } from '@smartb/g2-providers'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import {
  DeleteFilesOptions,
  GetGalleryOptions,
  UploadFilesOptions,
  useDeleteFiles,
  useGetGallery,
  useUploadFiles
} from '../..'
import { DirectoryPath, FileDeleteCommand } from '../../Domain'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { useLocalGalleryState } from './useLocalGalleryState'

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

  const {
    localGallery,
    displayedGallery,
    hasChanges,
    isLoading,
    setIsLoading,
    setHasChanges,
    onAdd,
    onCancel,
    onDelete
  } = useLocalGalleryState({
    directoryPath: directoryPath,
    initialGallery: gallery.data?.items
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
          queryClient.setQueryData(['gallery', directoryPath], {
            items: filtered
          })
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
          queryClient.setQueryData(['gallery', directoryPath], {
            items: galleryCopy
          })
        }
        uploadFilesOptions?.onSuccess?.(data, varaibles, context)
      }
    }
  })

  const onSave = useCallback(async () => {
    setIsSaving(true)
    setIsLoading(true)
    const filesToSave = localGallery.filter(
      (file) => file.isNew && !file.isDeleted && !!file.file
    )
    const deleteCommands: FileDeleteCommand[] = localGallery
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
    localGallery,
    deleteFiles.mutateAsync,
    uploadFiles.mutateAsync,
    gallery.data
  ])

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
