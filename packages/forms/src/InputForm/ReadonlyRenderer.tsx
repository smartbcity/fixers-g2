import { Stack, Typography } from '@mui/material'
import { Link as G2Link, Chip } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { InputFormProps } from './InputForm'
import { Link, LinkProps } from 'react-router-dom'

const getLabelOfOption = (
  option: any,
  getOptionLabel?: (option: any) => string
) => {
  if (option) {
    if (getOptionLabel) return getOptionLabel(option)
    if (option.label) return option.label
  }
  return undefined
}

export const ReadonlyRenderer = (props: Partial<InputFormProps>) => {
  const {
    readonlyType = 'text',
    inputType,
    value,
    values,
    choices,
    options,
    multiple,
    getReadonlyChipColor,
    getReadonlyTextUrl,
    getOptionLabel,
    readonlyElement,
    size
  } = props

  const hoptions = options ?? choices

  const textToDisplay = useMemo(() => {
    if (inputType === 'datePicker') return new Date(value).toLocaleDateString()
    if (inputType === 'radioChoices' && hoptions && value)
      return hoptions.find((c) => c.key === value)?.label
    if (multiple) {
      if (hoptions && values) {
        return values
          .map((v: any) =>
            getLabelOfOption(
              hoptions.find((o) => o.key === v || o.key === v.key),
              getOptionLabel
            )
          )
          .join(', ')
      }
    } else if (hoptions && value !== undefined) {
      const option = hoptions.find(
        (c) => c.key === value || c.key === value?.key
      )
      return getLabelOfOption(option, getOptionLabel)
    }
    return typeof value === 'string' || typeof value === 'number' ? value : ''
  }, [inputType, value, values, multiple, hoptions, getOptionLabel])

  const renderTag = useMemo(() => {
    if (readonlyType !== 'chip') return undefined
    if (!multiple) {
      const option = hoptions?.find((o) => o.key === value)
      return (
        <Chip
          label={textToDisplay}
          color={
            option?.color ??
            (getReadonlyChipColor && getReadonlyChipColor(textToDisplay))
          }
        />
      )
    } else if (hoptions && values) {
      return values.map((value) => {
        const option = hoptions.find((o) => o.key === value)
        if (!option) return undefined
        const label = getLabelOfOption(option, getOptionLabel)
        return (
          <Chip
            key={option.key.toString()}
            label={`${label}`}
            color={
              option?.color ??
              (getReadonlyChipColor && getReadonlyChipColor(option?.label))
            }
          />
        )
      })
    }
    return
  }, [readonlyType, textToDisplay, value, values, hoptions])

  const renderCustom = useMemo(() => {
    if (
      (readonlyType !== 'customElement' &&
        readonlyType !== 'customContainer') ||
      !readonlyElement
    )
      return undefined
    const Element = readonlyElement
    if (!multiple) {
      return <Element valueKey={value} value={textToDisplay} />
    } else if (hoptions && values && readonlyType === 'customElement') {
      return values.map((value) => {
        const option = hoptions.find((o) => o.key === value)
        if (!option) return undefined
        const label = getLabelOfOption(option, getOptionLabel)
        return (
          <Element
            key={option.key.toString()}
            valueKey={option.key}
            value={`${label}`}
          />
        )
      })
    } else if (hoptions && values && readonlyType === 'customContainer') {
      return (
        <Element
          values={values.map((value) => {
            const option = hoptions.find((o) => o.key === value)
            return option
          })}
        />
      )
    }
    return
  }, [readonlyType, textToDisplay, value, values, hoptions, readonlyElement])

  const url = useMemo(() => {
    if (!value || !getReadonlyTextUrl) return undefined
    return getReadonlyTextUrl(value)
  }, [value, getReadonlyTextUrl])

  if (readonlyType === 'text') {
    if (url)
      return (
        <G2Link<LinkProps>
          componentProps={{ to: url }}
          component={Link}
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readonlyLink'
        >
          {textToDisplay}
        </G2Link>
      )
    else
      return (
        <Typography
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readonlyText'
        >
          {textToDisplay}
        </Typography>
      )
  }
  if (readonlyType === 'chip') {
    return (
      <Stack
        direction='row'
        alignItems='center'
        flexWrap='wrap'
        sx={{
          gap: (theme) => theme.spacing(0.5)
        }}
      >
        {renderTag}
      </Stack>
    )
  }
  if (readonlyType === 'customElement') {
    return (
      <Stack
        direction='row'
        alignItems='center'
        flexWrap='wrap'
        sx={{
          gap: (theme) => theme.spacing(0.5)
        }}
      >
        {renderCustom}
      </Stack>
    )
  }
  return <>{renderCustom}</>
}
