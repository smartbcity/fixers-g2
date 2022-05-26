import { useCallback, useEffect, useState } from 'react'
import { DropPictureError } from '@smartb/g2-components'
import { fileToBase64 } from '@smartb/g2-utils'

export interface DropZonePictureActions {
  errorMessage?: string
  image?: string
  initialPicture?: string
  onDropError: (errorType: DropPictureError) => void
  onPictureDropped: (image: File) => void
  onRemovePicture: () => void
}

export const useDropZonePicture = (img?: string): DropZonePictureActions => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [image, setImage] = useState<string | undefined>(img)
  useEffect(() => {
    img && setImage(img)
  }, [img])
  const onDropError = useCallback((errorType: DropPictureError) => {
    if (errorType === 'file-too-large') {
      setErrorMessage("La taille de l'image est limité à 1Mo")
    } else if (errorType === 'file-invalid-type') {
      setErrorMessage("L'image doit être au format jpeg ou png")
    } else if (errorType === 'too-many-files') {
      setErrorMessage("Ne déposez qu'une seule image à la fois")
    } else {
      setErrorMessage("L'image est invalide")
    }
  }, [])

  const onPictureDropped = useCallback((image: File) => {
    fileToBase64(image).then((base64) => {
      setImage(base64)
    })
  }, [])

  const onRemovePicture = useCallback(() => {
    setImage(undefined)
  }, [])

  return {
    errorMessage,
    image,
    onDropError,
    onPictureDropped,
    onRemovePicture,
    initialPicture: image
  }
}
