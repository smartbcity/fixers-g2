import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { Box } from '@mui/material'

export type SpacerRenderProps = FieldRenderProps<'spacer', any>

export const SpacerRender: ElementRendererFunction<SpacerRenderProps> = (
  props: SpacerRenderProps
) => {
  const { basicProps } = props
  return <Box key={basicProps.key} sx={{ flexGrow: 1 }} />
}
