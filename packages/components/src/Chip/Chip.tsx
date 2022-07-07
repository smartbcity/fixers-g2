import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material'
import React from 'react'
import { ClearRounded } from '@mui/icons-material'
import { cx } from '@emotion/css'

export interface ChipBasicProps extends BasicProps {
  /**
   * The label of the chip
   */
  label: string
  /**
   * The color of the chip
   * @default "#676879"
   */
  color?: string
  /**
   * Callback fired when the delete icon is clicked. If set, the delete icon will be shown.
   */
  onDelete?: (event: any) => void
  /**
   * If label is bold or not
   * @default true
   */
  bold?: boolean
}

export type ChipProps = MergeMuiElementProps<MuiChipProps, ChipBasicProps>

export const Chip = (props: ChipProps) => {
  const { sx, color = '#676879', bold = true, className, ...other } = props
  return (
    <MuiChip
      className={cx('AruiChip-root', className)}
      sx={{
        bgcolor: color + '1A',
        color: color,
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        height: 'unset',
        padding: '6px 0',
        '& .MuiChip-deleteIcon': {
          color: color,
          fontSize: '20px'
        },
        '& .MuiChip-label': {
          fontWeight: bold ? 600 : ''
        },
        ...sx
      }}
      deleteIcon={<ClearRounded />}
      {...other}
    />
  )
}
