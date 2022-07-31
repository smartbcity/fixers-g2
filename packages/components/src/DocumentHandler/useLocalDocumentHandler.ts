import { fileToBase64 } from '@smartb/g2-utils'
import { useCallback, useState } from 'react'

export const useLocalDocumentHandler = () => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onAdd = useCallback(async (files: File[]) => {
    setIsLoading(true)
    const file = files[0]
    setFile(file)
    const url = await fileToBase64(file)
    setFileUrl(url)
    setIsLoading(false)
  }, [])

  const onDelete = useCallback(() => {
    setFile(undefined)
    setFileUrl(undefined)
  }, [])

  return {
    file,
    fileUrl,
    docmentHandlerProps: {
      fileUrl,
      isLoading,
      onAdd,
      onDelete,
      dropzoneProps: {
        multiple: false
      }
    }
  }
}
