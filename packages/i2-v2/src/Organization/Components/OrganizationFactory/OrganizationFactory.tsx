import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { FormProps } from '@smartb/g2-forms'
import { styled, Typography } from '@mui/material'
import { Popover } from '@smartb/g2-notifications'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import { Organization } from '../../Domain'
import { AdressValidationStrings } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import {
  FormComposable,
  FormComposableField,
  FormComposableState
} from '@smartb/g2-composable'
import {
  organizationFieldsName,
  useOrganizationFormFields,
  useOrganizationFormFieldsProps
} from './useOrganizationFormFields'

// @ts-ignore
const StyledPopover = styled(Popover)({
  width: '80vw',
  maxWidth: '450px'
})

export interface OrganizationFactoryClasses {
  dropPictureBox?: string
  infoPopover?: string
}

export interface OrganizationFactoryStyles {
  dropPictureBox?: React.CSSProperties
  infoPopover?: React.CSSProperties
}

export interface OrganizationFactoryStrings extends AdressValidationStrings {
  /**
   * @default "le champ est obligatoire"
   */
  requiredField?: string
  /**
   * @default "Aucune information trouvé. Saisissez les informations ci-dessous manuellement"
   */
  siretNotFound?: string
  /**
   * @default "Le numéro de siret permettra de remplir automatiquement une partie des champs suivant"
   */
  siretDescription?: string
}

export interface OrganizationFactoryBasicProps
  extends BasicProps,
    useOrganizationFormFieldsProps {
  /**
   * The base organization. If it's given the component should be considered as an updater of the object
   */
  organization?: Partial<Organization>
  /**
   * The state of the form obtainable by calling useUserFormState
   */
  formState: FormComposableState
  /**
   * The additional fields to add to the form
   */
  additionalFields?: FormComposableField[]
  /**
   * The name of the field you want to block in the form state
   */
  blockedFields?: organizationFieldsName[]
  /**
   * To activate ReadOnly view
   * @default false
   */
  readOnly?: boolean
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: OrganizationFactoryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: OrganizationFactoryStyles
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: OrganizationFactoryStrings
}

export type OrganizationFactoryProps = MergeMuiElementProps<
  Omit<FormProps, 'fields' | 'formState'>,
  OrganizationFactoryBasicProps
>

export const OrganizationFactory = (props: OrganizationFactoryProps) => {
  const {
    additionalFields = [],
    blockedFields = [],
    organization,
    onSubmit,
    getInseeOrganization,
    className,
    classes,
    styles,
    readOnly = false,
    isLoading = false,
    strings,
    multipleRoles = true,
    fieldsOverride,
    setInseeOrganization,
    formState,
    ...other
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(
    !organization && !readOnly && !fieldsOverride?.siret?.readOnly && !isLoading
  )

  useEffect(() => {
    if (
      !organization &&
      !readOnly &&
      !fieldsOverride?.siret?.readOnly &&
      !isLoading
    )
      setOpenSiretInfo(true)
  }, [organization, readOnly, fieldsOverride?.siret?.readOnly, isLoading])

  const onCloseSiretInfo = useCallback(() => setOpenSiretInfo(false), [])

  const { fieldsArray, siretRef } = useOrganizationFormFields(props)

  const definitivBlockedFields = useMemo(
    (): organizationFieldsName[] => [
      //@ts-ignore
      ...(!fieldsOverride?.roles?.params?.options
        ? (['roles'] as organizationFieldsName[])
        : []),
      ...blockedFields
    ],
    [blockedFields, fieldsOverride]
  )

  const finalFields = useDeletableForm({
    initialFields: fieldsArray,
    additionalFields: additionalFields,
    blockedFields: definitivBlockedFields
  })

  return (
    <>
      <FormComposable
        {...other}
        className={cx('AruiOrganizationFactory-root', className)}
        fields={finalFields}
        formState={formState}
        isLoading={isLoading}
        readOnly={readOnly}
        onFocus={onCloseSiretInfo}
        sx={{
          width: '100%',
          ...other.sx
        }}
      />
      {siretRef && (
        // @ts-ignore
        <StyledPopover
          open={openSiretInfo}
          onClose={onCloseSiretInfo}
          anchorEl={siretRef}
          placement='bottom'
          className={cx(
            'AruiOrganizationFactory-infoPopover',
            classes?.infoPopover
          )}
          style={styles?.infoPopover}
        >
          <Typography variant='body1'>
            {strings?.siretDescription ??
              'Le numéro de siret permettra de remplir automatiquement une partie des champs suivants'}
          </Typography>
        </StyledPopover>
      )}
    </>
  )
}
