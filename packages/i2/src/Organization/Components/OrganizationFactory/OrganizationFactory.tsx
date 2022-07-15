import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Form,
  FormField,
  useFormWithPartialFields,
  FormPartialField,
  Option,
  FormProps
} from '@smartb/g2-forms'
import { styled, Typography } from '@mui/material'
import { Popover } from '@smartb/g2-notifications'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { cx } from '@emotion/css'
import {
  FlatOrganization,
  flatOrganizationToOrganization,
  Organization,
  organizationToFlatOrganization
} from '../../Domain'
import { siretValidation } from '../../Validation/siret'
import { addressValidation } from '../../../Commons'
import { useDeletableForm } from '../../../Commons/useDeletableForm'

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

export interface OrganizationFactoryBasicProps extends BasicProps {
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
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * To activate Readonly view
   * @default false
   */
  readonly?: boolean
  /**
   * Use this prop if you want only some fields to be readonly
   */
  readonlyFields?: ReadonlyFields
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
   * The names of the fields to block
   */
  blockedFields?: string[]
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
    ...other
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(
    !organization && !readonly && !readonlyFields?.siret
  )
  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)

  const onCloseSiretInfo = useCallback(() => setOpenSiretInfo(false), [])

  const defaultRoles = useMemo(() => {
    const givenRoles = rolesOptions?.map((it) => it.key)
    return organization?.roles?.filter((it) => givenRoles?.includes(it))
  }, [rolesOptions, organization?.roles])

  const partialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'siret',
        defaultValue: organization?.siret,
        validator: siretValidation
      },
      {
        name: 'street',
        defaultValue: organization?.address?.street,
        validator: addressValidation.street
      },
      {
        name: 'postalCode',
        defaultValue: organization?.address?.postalCode,
        validator: addressValidation.postalCode
      },
      {
        name: 'city',
        defaultValue: organization?.address?.city,
        validator: addressValidation.city
      },
      {
        name: 'name',
        defaultValue: organization?.name,
        validator: (value?: string) => {
          if (readonlyFields?.name) return undefined
          const trimmed = (value ?? '').trim()
          if (!trimmed) return 'Vous devez renseigner le nom' as string
          return undefined
        }
      },
      {
        name: 'description',
        defaultValue: organization?.description
      },
      {
        name: 'website',
        defaultValue: organization?.website
      },
      {
        name: 'roles',
        defaultValue: defaultRoles
      }
    ],
    [organization, rolesOptions, readonlyFields]
  )

  const onSubmitMemoized = useCallback(
    async (values: FlatOrganization) => {
      if (onSubmit) {
        onSubmit({
          ...flatOrganizationToOrganization(values),
          id: organization?.id ?? ''
        })
      }
    },
    [onSubmit, organization]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized,
    formikConfig: {
      enableReinitialize: true
    }
  })

  const fetchOrganization = useCallback(() => {
    getInseeOrganization &&
      getInseeOrganization(formState.values.siret).then((values) => {
        if (values) {
          formState.setValues(organizationToFlatOrganization(values), false)
          setSiretValid(true)
        } else {
          formState.setFieldError(
            'siret',
            'Aucune information trouvé. Saisissez les informations ci-dessous manuellement'
          )
        }
      })
  }, [
    formState.values.siret,
    formState.setValues,
    formState.setFieldError,
    getInseeOrganization
  ])

  const organizationForm = useMemo(
    (): FormField[] => [
      {
        key: 'siret',
        name: 'siret',
        label: 'Numéro de siret',
        type: 'textfield',
        textFieldProps: {
          textFieldType: 'search-number',
          iconPosition: 'end',
          noCheckOrClearIcon: true,
          validated: siretValid,
          // @ts-ignore
          ref: setSiretRef,
          onSearch: () => {
            if (!formState.validateField('siret')) {
              fetchOrganization()
            }
          },
          readonly: readonlyFields?.siret
        }
      },
      {
        key: 'name',
        name: 'name',
        type: 'textfield',
        label: 'Nom',
        textFieldProps: {
          readonly: readonlyFields?.name
        }
      },
      ...(rolesOptions
        ? [
            {
              key: 'roles',
              name: 'roles',
              label: 'Type',
              type: 'select',
              selectProps: {
                options: rolesOptions,
                readonly: readonlyFields?.roles,
                readonlyType: 'chip',
                multiple: true
              }
            } as FormField
          ]
        : []),
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: 'Addresse (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: 'Code postal (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: 'Ville (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.address
        }
      },
      {
        key: 'website',
        name: 'website',
        type: 'textfield',
        label: 'Site web (facultatif)',
        textFieldProps: {
          readonly: readonlyFields?.website
        }
      },
      {
        key: 'description',
        name: 'description',
        type: 'textfield',
        label: 'Description (facultatif)',
        textFieldProps: {
          multiline: true,
          rows: 6,
          readonly: readonlyFields?.description
        }
      }
    ],
    [formState.validateField, fetchOrganization, siretValid, readonlyFields]
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
            Le numéro de siret permettra de remplir automatiquement une partie
            des champs suivant
          </Typography>
        </StyledPopover>
      )}
    </>
  )
}
