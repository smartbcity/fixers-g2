import {
  Box,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo } from 'react'
import { FiltersComposable, FiltersComposableProps } from './FiltersComposable'
import { Action, Actions } from '@smartb/g2-components'

export interface ResponsiveFiltersComposableBasicProps {
  openDrawer: boolean
  onCloseDrawer: () => void
  /**
   * the string used for the title above the filters
   * @default "Filters"
   */
  drawerTitle?: string
  /**
   * the string used for the button to clear the filters
   * @default "Clear"
   */
  clearString?: string
  /**
   * the string used for the button to apply the filters
   * @default "Apply"
   */
  applyString?: string
  /**
   * The props of the drawer component
   */
  drawerProps?: DrawerProps
}

export type ResponsiveFiltersComposableProps = MergeMuiElementProps<
  FiltersComposableProps<any>,
  ResponsiveFiltersComposableBasicProps
>

export const ResponsiveFiltersComposable = (
  props: ResponsiveFiltersComposableProps
) => {
  const {
    onCloseDrawer,
    openDrawer,
    formState,
    drawerTitle = 'Filters',
    clearString = 'Clear',
    applyString = 'Apply',
    fields,
    drawerProps,
    ...other
  } = props
  delete other.actions

  const onClear = useCallback(() => {
    const newValues = { ...formState.values }
    fields.forEach((field) => {
      delete newValues[field.name]
    })
    formState.setValues(newValues)
  }, [formState.setValues, fields, formState.values])

  const onApply = useCallback(() => {
    formState.submitForm()
    onCloseDrawer()
  }, [onCloseDrawer, formState.submitForm])

  const actions = useMemo(
    (): Action[] => [
      {
        key: 'clearButton',
        label: clearString,
        onClick: onClear,
        variant: 'outlined',
        sx: {
          width: '100%'
        }
      },
      {
        key: 'applyButton',
        label: applyString,
        onClick: onApply,
        sx: {
          width: '100%'
        }
      }
    ],
    [clearString, onClear, applyString, onApply]
  )

  return (
    <Drawer
      {...drawerProps}
      anchor='left'
      open={openDrawer}
      onClose={onApply}
      sx={{
        '& .MuiPaper-root': {
          padding: '20px',
          width: '100vw',
          boxSizing: 'border-box',
          maxWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          gap: (theme) => theme.spacing(5)
        },
        '& .AruiForm-field': {
          width: '100%'
        },
        ...drawerProps?.sx
      }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Box />
        <Typography variant='h6'>{drawerTitle}</Typography>
        <IconButton onClick={onApply}>
          <CloseRounded />
        </IconButton>
      </Stack>
      <FiltersComposable
        formState={formState}
        fields={fields}
        {...other}
        fieldsStackProps={{
          sx: {
            gap: (theme) => theme.spacing(2)
          }
        }}
        responsive={false}
        defaultSubmitBehavior={false}
        withFormikProvider={false}
      />
      <Box sx={{ flexGrow: 1 }} />
      <Actions actions={actions} />
    </Drawer>
  )
}
