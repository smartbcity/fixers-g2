import { FormComposableField, FormComposableState } from '@smartb/g2-composable'
import { useMemo, useCallback, useState } from 'react'
import {
  AdressFieldsName,
  mergeFields,
  requiredString,
  useAdressFields
} from '../../../Commons'
import { Organization, organizationToFlatOrganization } from '../../Domain'
import { siretValidation } from '../../Validation/siret'
import { OrganizationFactoryStrings } from './OrganizationFactory'

export type organizationFieldsName =
  | 'logo'
  | 'siret'
  | 'name'
  | 'description'
  | 'website'
  | 'roles'
  | AdressFieldsName

export type OrganizationFactoryFieldsOverride = Partial<
  Record<
    organizationFieldsName,
    Partial<FormComposableField<organizationFieldsName>>
  >
>

export interface useOrganizationFormFieldsProps {
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
   * The state of the form obtainable by calling useOrganizationFormState
   */
  formState?: FormComposableState
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: OrganizationFactoryStrings
  /**
   * use This prop to override the fields
   */
  fieldsOverride?: OrganizationFactoryFieldsOverride
  /**
   * Allow the organization to have multipe roles
   *
   * @default true
   */
  multipleRoles?: boolean
}

export const useOrganizationFormFields = (
  params?: useOrganizationFormFieldsProps
) => {
  const {
    formState,
    getInseeOrganization,
    setInseeOrganization,
    strings,
    multipleRoles = true,
    fieldsOverride
  } = params ?? {}

  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)

  const fetchOrganization = useCallback(async () => {
    if (getInseeOrganization && formState?.values.siret) {
      await getInseeOrganization(formState.values.siret).then((values) => {
        if (values) {
          const flat = organizationToFlatOrganization(values)
          for (var key in flat) {
            if (flat[key] == null) delete flat[key]
          }
          formState.setValues(
            (oldValues) => ({
              ...oldValues,
              ...flat
            }),
            false
          )
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
    formState?.values.siret,
    formState?.setValues,
    formState?.setFieldError,
    getInseeOrganization,
    strings?.siretNotFound,
    setInseeOrganization
  ])

  const { addressFields } = useAdressFields({
    strings,
    //@ts-ignore
    fieldsOverride
  })

  const fields = useMemo(
    (): Record<
      organizationFieldsName,
      FormComposableField<organizationFieldsName>
    > => ({
      logo: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          name: 'logo',
          label: "Logo de l'entreprise (faculatif)",
          type: 'dropPicture',
          params: {
            addPictureHelperText: 'Ajouter un logo (de préférence carré)',
            alt: "Le logo de l'entreprise",
            removePictureHelperText: 'Supprimer le logo',
            errorMessages: {
              'file-invalid-type': "L'image devrait être au format jpeg ou png",
              'file-too-large':
                'Votre image est trop lourde et ne devrait pas dépassé 10 Mo',
              'too-many-files': "Vous ne pouvez insérez q'une seule image"
            },
            height: '200px'
          }
        },
        fieldsOverride?.logo
      ),
      siret: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          key: 'siret',
          name: 'siret',
          label: 'Numéro de siret',
          type: 'textField',
          params: {
            textFieldType: 'search',
            iconPosition: 'end',
            noCheckOrClearIcon: true,
            validated: siretValid,
            // @ts-ignore
            ref: setSiretRef,
            onSearch: async () => {
              setSiretValid(false)
              if (!!formState && !(await formState.validateField('siret'))) {
                await fetchOrganization()
              }
            }
          },
          validator: (value: any) =>
            siretValidation(value, fieldsOverride?.siret?.readOnly)
        },
        fieldsOverride?.siret
      ),
      name: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          key: 'name',
          name: 'name',
          type: 'textField',
          label: 'Nom',
          validator: (value?: string) =>
            requiredString(strings?.requiredField, value)
        },
        fieldsOverride?.name
      ),
      roles: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          key: 'roles',
          name: 'roles',
          label: 'Rôle',
          type: 'select',
          params: {
            readOnlyType: 'chip',
            multiple: multipleRoles
          }
        },
        fieldsOverride?.roles
      ),
      ...addressFields,
      website: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          key: 'website',
          name: 'website',
          type: 'textField',
          label: 'Site web (facultatif)'
        },
        fieldsOverride?.website
      ),
      description: mergeFields<FormComposableField<organizationFieldsName>>(
        {
          key: 'description',
          name: 'description',
          type: 'textField',
          label: 'Description (facultatif)',
          params: {
            multiline: true,
            rows: 6
          }
        },
        fieldsOverride?.description
      )
    }),
    [
      addressFields,
      strings?.requiredField,
      siretValid,
      fetchOrganization,
      formState?.validateField,
      multipleRoles,
      fieldsOverride
    ]
  )

  const fieldsArray = useMemo(() => Object.values(fields), [fields])

  return {
    fields,
    siretValid,
    siretRef,
    fieldsArray
  }
}
