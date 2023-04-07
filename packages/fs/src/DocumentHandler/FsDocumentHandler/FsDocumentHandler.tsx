import { Stack } from '@mui/material'
import { DocumentHandler, DocumentHandlerProps } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { FsFile } from '../../Gallery'

export interface FsDocumentHandlerProps {
  /**
   * The files sent by fs
   */
  files?: FsFile[]
  /**
   * The documents to display. You should provide only the mandatory fields.
   */
  documents?: Omit<DocumentHandlerProps, 'fileUrl'>[]
  /**
   * Indicates if the component can accept custom documents from the user.
   *
   * @default false
   */
  acceptAdditionalDocuments?: boolean
  /**
   *
   * @default 'Ajouter des documents'
   */
  addDocumentsString?: string
  /**
   * onDeleteFile callback
   */
  onDeleteFile?: (file: FsFile) => void
}

export const FsDocumentHandler = (props: FsDocumentHandlerProps) => {
  const {
    documents = [],
    acceptAdditionalDocuments = false,
    files = [],
    onDeleteFile,
    addDocumentsString
  } = props

  const documentsDisplay = useMemo(() => {
    const documentList: JSX.Element[] = []
    files.forEach((file) => {
      const splitted = file.path.name.split('_')
      const name = splitted[1]
      documentList.push(
        <DocumentHandler
          key={file.path.name}
          label={name}
          fileUrl={file.url}
          onDelete={() => onDeleteFile && onDeleteFile(file)}
        />
      )
    })
    documents.forEach(({ label, ...rest }) => {
      const uploadedfile = files.find(
        (file) => file.path.name.split('_')[1] === label
      )
      if (!uploadedfile) {
        documentList.push(
          <DocumentHandler key={label} label={label} {...rest} />
        )
      }
    })
    if (acceptAdditionalDocuments) {
      documentList.push(
        <DocumentHandler
          key='additionalDocumentsDropzone'
          label={addDocumentsString ?? 'Ajouter des documents'}
        />
      )
    }
    return documentList
  }, [
    documents,
    files,
    onDeleteFile,
    acceptAdditionalDocuments,
    addDocumentsString
  ])

  return (
    <Stack
      sx={{
        gap: (theme) => theme.spacing(2)
      }}
    >
      {documentsDisplay}
    </Stack>
  )
}
