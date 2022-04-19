import { Stack, Typography } from '@mui/material'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useEffect, useState } from 'react'
import { fileToBase64 } from 'utils'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { v4 as uuidv4 } from 'uuid'
import { FileDeleteCommand, FileUploadCommand, FsFile } from '../Gallery'
import { UseMutationResult, useQueryClient, UseQueryResult } from 'react-query'
import { Button } from '@smartb/g2-components'
import { DirectoryPath } from '../Gallery/types'

export type TrackedFsFile = FsFile & {
  isNew?: boolean
}

export interface AutomatedGalleryFactoryBasicProps {
  /**
   * the hook to get the files
   */
  useGetGallery: () => UseQueryResult<
    | {
        files: FsFile[]
      }
    | undefined
  >
  /**
   * the hook to execute the delete commands after the save
   */
  useDeleteFiles: () => UseMutationResult<
    {}[] | undefined,
    unknown,
    FileDeleteCommand[],
    unknown
  >
  /**
   * the hook to execute the upload commands after the save
   */
  useUploadFiles: () => UseMutationResult<
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
     * @defualt 'Galerie'
     */
    gallery?: string
    /**
     * @defualt 'Eregistrer'
     */
    save?: string
    /**
     * @defualt 'Ajouter une ou plusieurs images'
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
    useGetGallery,
    useDeleteFiles,
    useUploadFiles,
    directoryPath,
    strings,
    ...rest
  } = props
  const [gallery, setgallery] = useState<TrackedFsFile[]>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const baseGallery = useGetGallery()
  const deletes = useDeleteFiles()
  const uploads = useUploadFiles()

  useEffect(() => {
    if (baseGallery.data) {
      setgallery(baseGallery.data.files)
    }
  }, [baseGallery.data])

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
        setgallery((oldValues) => [...oldValues, ...values])
        setIsLoading(false)
      })
      setHasChanges(true)
    },
    [directoryPath]
  )

  const onDelete = useCallback((file: FsFile) => {
    setgallery((oldValues) =>
      oldValues.filter((element) => file.id !== element.id)
    )
    setHasChanges(true)
  }, [])

  const onSave = useCallback(async () => {
    setIsSaving(true)
    const base = baseGallery.data?.files || []
    const deleteCommands: FileDeleteCommand[] = []
    const uploadCommands: FileUploadCommand[] = []
    gallery.forEach((element) => {
      if (element.isNew) {
        uploadCommands.push({
          content: element.url,
          path: element.path,
          metadata: {}
        })
      }
    })
    base.forEach((element) => {
      if (!gallery.find((element2) => element2.id === element.id)) {
        deleteCommands.push({
          ...element.path
        })
      }
    })
    if (deleteCommands.length > 0) {
      deletes.mutateAsync(deleteCommands)
    }
    if (uploadCommands.length > 0) {
      await uploads.mutateAsync(uploadCommands)
    }
    await baseGallery.refetch()
    setIsSaving(false)
    setHasChanges(false)
  }, [
    gallery,
    deletes.mutateAsync,
    uploads.mutateAsync,
    baseGallery.data,
    baseGallery.refetch
  ])

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          gap: '10px',
          marginBottom: '20px'
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
        files={gallery}
        onAdd={onAdd}
        onDelete={onDelete}
        isLoading={isLoading}
        strings={strings}
      />
    </>
  )
}
