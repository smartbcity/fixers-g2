import { fileToBase64 } from '@smartb/g2-utils'
import { useCallback, useState } from 'react'

export const useLocalDocumentHandler = () => {
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
    async () => file ? fileToBase64(file) : "",
    [file],
  )

  return {
    file,
    getFileUrl,
    docmentHandlerProps: {
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
