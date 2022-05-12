import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Form,
  FormField,
  useFormWithPartialFields,
  FormPartialField,
  Option
} from '@smartb/g2-forms'
import {
  Box,
  InputLabel,
  Stack,
  StackProps,
  styled,
  Typography
} from '@mui/material'
import { Button, DropPicture, DropPictureError } from '@smartb/g2-components'
import { Popover } from '@smartb/g2-notifications'
import { fileToBase64 } from '@smartb/g2-utils'
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

const StyledStack = styled(Stack)({
  '& .AruiPopover-root': {
    width: '80vw',
    maxWidth: '450px'
  },
  '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
    margin: 0
  },
  '& input[type=number]': {
    MozAppearance: 'textfield'
  },
  '& .mainFormLeft': {
    marginRight: '30px',
    width: '260px'
  },
  '& .mainFormRight': {
    width: '260px'
  }
})

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
  siretForm?: string
  leftForm?: string
  rightForm?: string
  dropPictureBox?: string
  actionsContainer?: string
  infoPopover?: string
}

export interface OrganizationFactoryStyles {
  siretForm?: React.CSSProperties
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  dropPictureBox?: React.CSSProperties
  actionsContainer?: React.CSSProperties
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
   * The label placed in the submit button
   * @default 'Valider'
   */
  submitButtonLabel?: string
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
}

export type OrganizationFactoryProps = MergeMuiElementProps<
  StackProps,
  OrganizationFactoryBasicProps
>

export const OrganizationFactory = (props: OrganizationFactoryProps) => {
  const {
    organization,
    onSubmit,
    getInseeOrganization,
    submitButtonLabel = 'Valider',
    className,
    classes,
    styles,
    rolesOptions,
    readonly = false,
    readonlyFields,
    isLoading = false,
    ...other
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(
    !organization && !readonly && !readonlyFields?.siret
  )
  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)
  const [imageError, setImageError] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [feedback, setFeedback] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setFeedback(undefined)
  }, [onSubmit])

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
        const feedback = await onSubmit({
          ...flatOrganizationToOrganization(values),
          id: organization?.id ?? ''
        })
        setFeedback(feedback)
      }
    },
    [onSubmit, image, organization]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized
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

  const siret = useMemo(
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
          disabled: readonly || readonlyFields?.siret
        }
      }
    ],
    [
      formState.validateField,
      fetchOrganization,
      siretValid,
      readonly,
      readonlyFields?.siret
    ]
  )

  const details = useMemo(
    (): FormField[] => [
      {
        key: 'name',
        name: 'name',
        type: 'textfield',
        label: 'Nom',
        textFieldProps: {
          disabled: readonly || readonlyFields?.name
        }
      },
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: 'Addresse (facultatif)',
        textFieldProps: {
          disabled: readonly || readonlyFields?.address
        }
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: 'Code postal (facultatif)',
        textFieldProps: {
          textFieldType: 'number',
          disabled: readonly || readonlyFields?.address
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: 'Ville (facultatif)',
        textFieldProps: {
          disabled: readonly || readonlyFields?.address
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
                disabled: readonly || readonlyFields?.roles,
                multiple: true
              }
            } as FormField
          ]
        : [])
    ],
    [readonly, readonlyFields?.siret]
  )

  const description = useMemo(
    (): FormField[] => [
      {
        key: 'website',
        name: 'website',
        type: 'textfield',
        label: 'Site web (facultatif)',
        textFieldProps: {
          disabled: readonly || readonlyFields?.website
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
          disabled: readonly || readonlyFields?.description
        }
      }
    ],
    [readonly]
  )

  const onDropError = useCallback((errorType: DropPictureError) => {
    if (errorType === 'file-too-large') {
      setImageError("La taille de l'image est limité à 1Mo")
    } else if (errorType === 'file-invalid-type') {
      setImageError("L'image doit être au format jpeg ou png")
    } else if (errorType === 'too-many-files') {
      setImageError("Ne déposez qu'une seule image à la fois")
    } else {
      setImageError("L'image est invalide")
    }
  }, [])

  const onPictureDropped = useCallback((image: File) => {
    fileToBase64(image).then((base64) => {
      setImage(base64)
    })
  }, [])

  const onRemovePicture = useCallback(() => {
    setImage(undefined)
  }, [])

  return (
    <StyledStack
      alignItems='center'
      width='100%'
      maxWidth='650px'
      spacing={2}
      onFocus={onCloseSiretInfo}
      className={cx('AruiOrganizationFactory-root', className)}
      {...other}
    >
      <Form
        className={cx('AruiOrganizationFactory-siretForm', classes?.siretForm)}
        style={styles?.siretForm}
        fields={siret}
        formState={formState}
        isLoading={isLoading}
      />
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        width='100%'
      >
        <Form
          className={cx(
            'AruiOrganizationFactory-leftForm',
            'mainFormLeft',
            classes?.leftForm
          )}
          style={styles?.leftForm}
          fields={details}
          formState={formState}
          isLoading={isLoading}
        />
        <Stack>
          <Box
            className={cx(
              'AruiOrganizationFactory-dropPictureBox',
              classes?.dropPictureBox
            )}
            style={styles?.dropPictureBox}
            sx={{
              margin: '20px 0',
              marginBottom: '23px',
              '& .AruiDropzone-root': {
                width: '260px',
                height: '155px'
              }
            }}
          >
            <InputLabel
              sx={{
                marginBottom: '15px',
                fontSize: 16,
                color: '#323338'
              }}
            >
              Logo de l'entreprise (facultatif)
            </InputLabel>
            <DropPicture
              errorMessage={imageError}
              readonly={readonly}
              onDropError={onDropError}
              onRemovePicture={onRemovePicture}
              initialPicture={organization?.image}
              onPictureDropped={onPictureDropped}
              addPictureHelperText='Ajouter une image'
              removePictureHelperText="Retirer l'image"
              alt="Le logo de l'entreprise"
            />
          </Box>
          <Form
            className={cx(
              'AruiOrganizationFactory-rightForm',
              'mainFormRight',
              classes?.rightForm
            )}
            style={styles?.rightForm}
            fields={description}
            formState={formState}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <Stack
        className={cx(
          'AruiOrganizationFactory-actionsContainer',
          classes?.actionsContainer
        )}
        style={styles?.actionsContainer}
        direction='row'
        justifyContent='flex-end'
        width='100%'
      >
        {!readonly && !isLoading && (
          <Button
            success={feedback !== undefined && feedback}
            fail={feedback !== undefined && !feedback}
            onClick={formState.submitForm}
          >
            {submitButtonLabel}
          </Button>
        )}
      </Stack>

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
    </StyledStack>
  )
}
