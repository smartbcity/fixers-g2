import { fileToBase64 } from '@smartb/g2-utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DirectoryPath, FsFile, TrackedFsFile } from '../../Domain'
import { v4 as uuidv4 } from 'uuid'

export interface useLocalGalleryStateParams {
  initialGallery?: FsFile[]
  directoryPath?: DirectoryPath
}

export const useLocalGalleryState = (params?: useLocalGalleryStateParams) => {
  const { initialGallery, directoryPath } = params ?? {}
  const [currentGallery, setCurrentGallery] = useState<TrackedFsFile[]>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (initialGallery) {
      setCurrentGallery(initialGallery)
    }
  }, [initialGallery])

  const onAdd = useCallback(
    (files: File[]) => {
      setIsLoading(true)
      const fsFiles = files.map(async (file): Promise<TrackedFsFile> => {
        const base64 = await fileToBase64(file)
        const name = `${uuidv4()}_${file.name}`
        return {
          id: name,
          metadata: {},
          //@ts-ignore
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
    setCurrentGallery(initialGallery ?? [])
    setHasChanges(false)
  }, [initialGallery])

  const displayedGallery = useMemo(
    () => currentGallery.filter((file) => !file.isDeleted),
    [currentGallery]
  )

  return {
    hasChanges,
    isLoading,
    onAdd,
    onDelete,
    onCancel,
    setHasChanges,
    setIsLoading,
    localGallery: currentGallery,
    displayedGallery
  }
}
