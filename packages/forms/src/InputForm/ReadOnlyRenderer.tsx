import { Stack, Typography } from '@mui/material'
import { Link as G2Link, Chip } from '@smartb/g2-components'
import React, { useMemo } from 'react'
import { InputFormProps } from './InputForm'
import { Link, LinkProps } from 'react-router-dom'
import { Option } from '../Select'

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

export const ReadOnlyRenderer = (props: Partial<InputFormProps>) => {
  const {
    readOnlyType = 'text',
    inputType,
    value,
    values,
    choices,
    options,
    multiple,
    getReadOnlyChipColor,
    getReadOnlyTextUrl,
    getOptionLabel,
    readOnlyElement,
    emptyValueInReadOnly,
    size
  } = props

  const hoptions = options ?? choices

  const valuesIsEmpty =
    (props.value == undefined || props.value === '') &&
    (props.values == undefined || props.values.length === 0)

  const textToDisplay = useMemo(() => {
    if (valuesIsEmpty) return emptyValueInReadOnly
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
  }, [
    inputType,
    value,
    values,
    multiple,
    hoptions,
    getOptionLabel,
    emptyValueInReadOnly,
    valuesIsEmpty
  ])

  const renderTag = useMemo(() => {
    if (readOnlyType !== 'chip') return undefined
    if (!multiple || valuesIsEmpty) {
      const option = hoptions?.find((o) => o.key === value)
      return (
        <Chip
          label={textToDisplay}
          color={
            option?.color ??
            (getReadOnlyChipColor && getReadOnlyChipColor(textToDisplay))
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
              (getReadOnlyChipColor && getReadOnlyChipColor(option?.key))
            }
          />
        )
      })
    }
    return
  }, [readOnlyType, textToDisplay, value, values, hoptions, valuesIsEmpty])

  const renderCustom = useMemo(() => {
    if (
      (readOnlyType !== 'customElement' &&
        readOnlyType !== 'customContainer') ||
      !readOnlyElement
    )
      return undefined
    const Element = readOnlyElement
    if (!multiple) {
      return <Element valueKey={value} value={textToDisplay} />
    } else if (hoptions && values && readOnlyType === 'customElement') {
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
    } else if (hoptions && values && readOnlyType === 'customContainer') {
      const completeValues: Option[] = []
      values.forEach((value) => {
        const option = hoptions.find((o) => o.key === value)
        if (option) completeValues.push(option)
      })
      return <Element values={completeValues} />
    }
    return
  }, [readOnlyType, textToDisplay, value, values, hoptions, readOnlyElement])

  const url = useMemo(() => {
    if (!value || !getReadOnlyTextUrl) return undefined
    return getReadOnlyTextUrl(value)
  }, [value, getReadOnlyTextUrl])

  if (readOnlyType === 'text') {
    if (url)
      return (
        <G2Link<LinkProps>
          componentProps={{ to: url }}
          component={Link}
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readOnlyLink'
        >
          {textToDisplay}
        </G2Link>
      )
    else
      return (
        <Typography
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readOnlyText'
        >
          {textToDisplay}
        </Typography>
      )
  }
  if (readOnlyType === 'chip') {
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
  if (readOnlyType === 'customElement') {
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
