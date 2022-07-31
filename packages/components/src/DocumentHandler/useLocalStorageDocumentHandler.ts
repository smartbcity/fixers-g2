import { useLocalStorage } from '@mantine/hooks'
import { Base64ToFile, fileToBase64 } from '@smartb/g2-utils'
import { useCallback, useEffect, useState } from 'react'

export const useLocalStorageDocumentHandler = (fileKey: string) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileUrl, setFileUrl] = useLocalStorage<string | undefined>({
    key: fileKey
  })
  const [fileName, setFileName] = useLocalStorage<string | undefined>({
    key: fileKey + '-fileName'
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (fileUrl) {
      const file = Base64ToFile(fileUrl, fileName)
      setFile(file)
    }
  }, [])

  const onAdd = useCallback(async (files: File[]) => {
    setIsLoading(true)
    const file = files[0]
    setFile(file)
    setFileName(file.name)
    const url = await fileToBase64(file)
    setFileUrl(url)
    setIsLoading(false)
  }, [])

  const onDelete = useCallback(() => {
    setFile(undefined)
    setFileUrl('')
    setFileName('')
  }, [])

  return {
    file,
    fileUrl,
    docmentHandlerProps: {
      fileUrl,
      isLoading,
      onAdd,
      onDelete,
      errorMessages: {
        'file-too-large':
          'Your file is too big, it should not exceed 4Mo to be saved locally on your device.'
      },
      dropzoneProps: {
        multiple: false,
        maxSize: 4 * 1024 * 1024
      }
    }
  }
}
