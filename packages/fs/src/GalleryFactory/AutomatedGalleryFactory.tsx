import { Stack, Typography } from '@mui/material'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useState } from 'react'
import { fileToBase64 } from 'utils'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { v4 as uuidv4 } from 'uuid'
import { FileDeleteCommand, FileUploadCommand, FsFile } from '../Gallery'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { Button } from '@smartb/g2-components'
import { DirectoryPath } from '../Gallery/types'

export type TrackedFsFile = FsFile & {
  isNew?: boolean
}

export interface AutomatedGalleryFactoryBasicProps {
  /**
   * the state in result of the hook useGetGallery
   */
  gallery: UseQueryResult<
    | {
        files: FsFile[]
      }
    | undefined
  >
  /**
   * the state in result of the hook useDeleteFiles
   */
  deleteFiles: UseMutationResult<
    {}[] | undefined,
    unknown,
    FileDeleteCommand[],
    unknown
  >
  /**
   * the state in result of the hook useUploadFiles
   */
  uploadFiles: UseMutationResult<
    {}[] | undefined,
    unknown,
    FileUploadCommand[],
    unknown
  >
  /**
   * the directory path of the gallery
   */
  directoryPath: DirectoryPath
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
  const { gallery, deleteFiles, uploadFiles, directoryPath, strings, ...rest } =
    props
  const [currentGallery, setCurrentGallery] = useState<TrackedFsFile[]>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

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
    if (deleteCommands.length > 0) {
      deleteFiles.mutateAsync(deleteCommands)
    }
    if (uploadCommands.length > 0) {
      await uploadFiles.mutateAsync(uploadCommands)
    }
    await gallery.refetch()
    setIsSaving(false)
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
