import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Form, FormField, FormProps } from '@smartb/g2-forms'
import { styled, Typography } from '@mui/material'
import { Popover } from '@smartb/g2-notifications'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import {
  FlatOrganization,
  Organization,
  organizationToFlatOrganization
} from '../../Domain'
import { AdressValidationStrings } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'
import {
  useOrganizationFormState,
  useOrganizationFormStateProps
} from './useOrganizationFormState'

export type Validated = boolean

export type ReadonlyFields = {
  [k in keyof Organization]?: boolean
}

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
   * @default "Numéro de siret"
   */
  siret?: string
  /**
   * @default "Nom"
   */
  name?: string
  /**
   * @default "Type"
   */
  roles?: string
  /**
   * @default "Addresse (facultatif)"
   */
  street?: string
  /**
   * @default "Code postal (facultatif)"
   */
  postalCode?: string
  /**
   * @default "Ville (facultatif)"
   */
  city?: string
  /**
   * @default "Site web (facultatif)"
   */
  website?: string
  /**
   * @default "Description (facultatif)"
   */
  description?: string
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
    useOrganizationFormStateProps<Organization> {
  /**
   * The base organization. If it's given the component should be considered as an updater of the object
   */
  organization?: Partial<Organization>
  /**
   * The event called after the research on the siret field
   * that should fill as much as it can the organization type
   */
  getInseeOrganization?: (siret: string) => Promise<Organization | undefined>
  /**
   * The event called after the insee api call.
   */
  setInseeOrganization?: (organization: any) => void
  /**
   * The submit event
   * @param organization the complete organization object after form Validation
   * @returns true if the Api call has been successfull
   */
  onSubmit?: (organization: Organization) => Promise<Validated> | Validated
  /**
   * The ref of the submit element
   */
  SubmitButtonRef?: React.RefObject<HTMLElement | undefined>
  /**
   * If you want to access the organization state from the form use this function
   */
  setOrganizationState?: (organization: FlatOrganization) => void
  /**
   * To activate Readonly view
   * @default false
   */
  readonly?: boolean
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
    organization,
    onSubmit,
    getInseeOrganization,
    SubmitButtonRef,
    className,
    classes,
    styles,
    rolesOptions,
    readonly = false,
    readonlyFields,
    isLoading = false,
    blockedFields,
    strings,
    multipleRoles = true,
    setOrganizationState,
    setInseeOrganization,
    ...other
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(
    !organization && !readonly && !readonlyFields?.siret
  )
  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)

  const onCloseSiretInfo = useCallback(() => setOpenSiretInfo(false), [])

  const formState = useOrganizationFormState(props)
  delete other.additionnalValidators
  delete other.additionalFields

  useEffect(() => {
    setOrganizationState &&
      setOrganizationState(formState.values as FlatOrganization)
  }, [formState.values, setOrganizationState])

  const fetchOrganization = useCallback(async () => {
    if (getInseeOrganization) {
      await getInseeOrganization(formState.values.siret).then((values) => {
        if (values) {
          formState.setValues(organizationToFlatOrganization(values), false)
          setSiretValid(true)
          setInseeOrganization && setInseeOrganization(values)
        } else {
          formState.setFieldError(
            'siret',
            strings?.siretNotFound ??
              'Aucune information trouvé. Saisissez les informations ci-dessous manuellement'
          )
        }
      })
    }
  }, [
    formState.values.siret,
    formState.setValues,
    formState.setFieldError,
    getInseeOrganization,
    strings?.siretNotFound,
    setInseeOrganization
  ])

  const organizationForm = useMemo(
    (): FormField[] => [
      {
        key: 'siret',
        name: 'siret',
        label: strings?.siret ?? 'Numéro de siret',
        type: 'textfield',
        textFieldProps: {
          textFieldType: 'search',
          iconPosition: 'end',
          noCheckOrClearIcon: true,
          validated: siretValid,
          // @ts-ignore
          ref: setSiretRef,
          onSearch: async () => {
            if (!formState.validateField('siret')) {
              await fetchOrganization()
            }
          },
          readonly: readonlyFields?.siret
        }
      },
      {
        key: 'name',
        name: 'name',
        type: 'textfield',
        label: strings?.name ?? 'Nom',
        textFieldProps: {
          readonly: readonlyFields?.name
        }
      },
      ...(rolesOptions
        ? [
            {
              key: 'roles',
              name: 'roles',
              label: strings?.roles ?? 'Rôle',
              type: 'select',
              selectProps: {
                options: rolesOptions,
                readonly: readonlyFields?.roles,
                readonlyType: 'chip',
                multiple: multipleRoles
              }
            } as FormField
          ]
        : []),
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: strings?.street ?? 'Addresse (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: strings?.postalCode ?? 'Code postal (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: strings?.city ?? 'Ville (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'website',
        name: 'website',
        type: 'textfield',
        label: strings?.website ?? 'Site web (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.website
        }
      },
      {
        key: 'description',
        name: 'description',
        type: 'textfield',
        label: strings?.description ?? 'Description (facultatif)',
        textFieldProps: {
          multiline: true,
          rows: 6,
          readonly: readonlyFields?.description
        }
      }
    ],
    [
      formState.validateField,
      fetchOrganization,
      siretValid,
      readonlyFields,
      strings,
      multipleRoles
    ]
  )

  const finalFields = useDeletableForm({
    initialFields: organizationForm,
    blockedFields: blockedFields
  })

  useEffect(() => {
    const element = SubmitButtonRef?.current
    if (element && !readonly) {
      element.onclick = formState.submitForm
    }
  }, [SubmitButtonRef?.current, formState.submitForm, readonly])

  return (
    <>
      <Form
        {...other}
        className={cx('AruiOrganizationFactory-root', className)}
        fields={finalFields}
        formState={formState}
        isLoading={isLoading}
        readonly={readonly}
        onFocus={onCloseSiretInfo}
        sx={{
          width: '100%',
          ...other.sx
        }}
      />
      {siretRef && (
        <StyledPopover
          // @ts-ignore
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
