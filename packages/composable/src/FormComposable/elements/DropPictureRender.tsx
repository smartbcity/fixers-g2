import { DropPictureProps, DropPicture } from '@smartb/g2-components'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'
import { Box, InputLabel } from '@mui/material'

export type DropPictureExtendProps = Partial<
  Omit<
    DropPictureProps,
    'uploaded' | 'onAdd' | 'label' | 'classes' | 'styles' | 'getFileUrl'
  >
>

export type DropPictureRenderProps = FieldRenderProps<
  'dropPicture',
  DropPictureExtendProps
>

export const DropPictureRender: ElementRendererFunction<
  DropPictureRenderProps
> = (props: DropPictureRenderProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const { errorMessage, onChange, sx, label, id, ...basicPropsRest } =
    basicProps
  delete basicProps.emptyValueInReadOnly

  const localFile: File | undefined = getIn(formState.values, basicProps.name)
  const uploadedGetUrl: string | undefined = getIn(
    formState.values,
    basicProps.name + 'Uploaded'
  )
  if (basicProps.readOnly && !uploadedGetUrl && !localFile) return <></>
  return (
    <Box sx={sx}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <DropPicture
        id={id}
        pictureUrl={localFile ? URL.createObjectURL(localFile) : uploadedGetUrl}
        onPictureDropped={(picture: File) => {
          formState.setFieldValue(basicProps.name, picture, false)
          !!onChange && onChange(picture)
        }}
        onRemovePicture={
          !basicProps.readOnly
            ? () => {
                if (localFile)
                  formState.setFieldValue(basicProps.name, undefined, false)
                if (uploadedGetUrl)
                  formState.setFieldValue(
                    basicProps.name + 'Uploaded',
                    undefined,
                    false
                  )
              }
            : undefined
        }
        customErrorMessage={errorMessage}
        {...params}
        {...basicPropsRest}
      />
    </Box>
  )
}
