import React from 'react'
import {
  DocumentHandler as AruiDocumentHandler,
  DocumentHandlerBasicProps
} from './DocumentHandler'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { Box, Stack } from '@mui/material'
import { useLocalDocumentHandler } from './useLocalDocumentHandler'
import { useLocalStorageDocumentHandler } from './useLocalStorageDocumentHandler'

export default {
  title: 'Components/DocumentHandler',
  component: AruiDocumentHandler,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=2024%3A2001'
    }
  },
  argTypes: {}
} as Meta

export const DocumentHandler: Story<DocumentHandlerBasicProps> = (
  args: DocumentHandlerBasicProps
) => (
  <Box
    sx={{
      width: '500px',
      height: '300px'
    }}
  >
    <AruiDocumentHandler {...args} />
  </Box>
)

export const DocumentHandlerVariant: Story = () => (
  <Stack
    sx={{
      alignItems: 'center',
      gap: '30px'
    }}
  >
    <AruiDocumentHandler label='mandatory.pdf' isRequired />
    <AruiDocumentHandler
      label='error.pdf'
      customErrorMessage='Your file is wrong'
    />
    <AruiDocumentHandler label='loading.pdf' isLoading />
    <AruiDocumentHandler
      label='uploaded.pdf'
      fileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    />
  </Stack>
)

export const useLocalDocumentHandlerExample: Story = () => {
  const { file, docmentHandlerProps } = useLocalDocumentHandler()
  console.log(file)
  return (
    <Box
      sx={{
        width: '500px',
        height: '300px'
      }}
    >
      <AruiDocumentHandler
        fileTypesAllowed={['pdf']}
        label={file?.name ?? 'Add your pdf file'}
        isRequired
        {...docmentHandlerProps}
      />
    </Box>
  )
}

export const useLocalStorageDocumentHandlerExample: Story = () => {
  const { file, docmentHandlerProps } =
    useLocalStorageDocumentHandler('fileExample')
  console.log(file)
  return (
    <Box
      sx={{
        width: '500px',
        height: '300px'
      }}
    >
      <AruiDocumentHandler
        fileTypesAllowed={['pdf']}
        label={file?.name ?? 'Add your pdf file'}
        isRequired
        {...docmentHandlerProps}
      />
    </Box>
  )
}

DocumentHandler.args = {
  label: 'Specifications.pdf',
  onDelete: () => {},
  onView: () => {},
  onDownload: () => {},
  fileTypesAllowed: ['pdf', 'jpeg', 'png']
}

DocumentHandler.storyName = 'DocumentHandler'
