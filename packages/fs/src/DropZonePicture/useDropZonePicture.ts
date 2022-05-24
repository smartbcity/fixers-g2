import { useCallback, useState } from 'react'
import { DropPictureError } from '@smartb/g2-components'
import { fileToBase64 } from '@smartb/g2-utils'

export const useDropZonePicture = (img?: string) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const [image, setImage] = useState<string | undefined>(img)

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

  // TODO Remove in next version g2 version onPictureDroped
  return {
    errorMessage,
    image,
    onDropError,
    onPictureDroped: onPictureDropped,
    onPictureDropped,
    onRemovePicture,
    initialPicture: image
  }
}
