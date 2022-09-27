import { useCallback, useState } from 'react'
import { DocumentHandlerProps } from './DocumentHandler'

export interface LocalDocumentHandler {
  file?: File
  getFileUrl: () => string
  documentHandlerProps: DocumentHandlerProps
}

export const useLocalDocumentHandler = (): LocalDocumentHandler => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onAdd = useCallback(async (files: File[]) => {
    setIsLoading(true)
    const file = files[0]
    setFile(file)
    setIsLoading(false)
  }, [])

  const onDelete = useCallback(() => {
    setFile(undefined)
  }, [])

  const getFileUrl = useCallback(
    () => (file ? URL.createObjectURL(file) : ''),
    [file]
  )

  return {
    file,
    getFileUrl,
    documentHandlerProps: {
      uploaded: !!file,
      getFileUrl,
      isLoading,
      onAdd,
      onDelete,
      dropzoneProps: {
        multiple: false
      }
    }
  }
}
