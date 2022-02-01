import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Form,
  FormField,
  useFormWithPartialFields,
  FormPartialField
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
import { fileToBase64 } from 'utils'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import clsx from 'clsx'
import {
  FlatOrganization,
  flatOrganizationToOrganization,
  Organization,
  organizationToFlatOrganization
} from './types'

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

//@ts-ignore
const StyledPopover = styled(Popover)({
  width: '80vw',
  maxWidth: '450px'
})

export interface OrgCreationClasses {
  siretForm?: string
  leftForm?: string
  rightForm?: string
  dropPictureBox?: string
  actionsContainer?: string
  infoPopover?: string
}

export interface OrgCreationStyles {
  siretForm?: React.CSSProperties
  leftForm?: React.CSSProperties
  rightForm?: React.CSSProperties
  dropPictureBox?: React.CSSProperties
  actionsContainer?: React.CSSProperties
  infoPopover?: React.CSSProperties
}

export interface OrgCreationBasicProps extends BasicProps {
  /**
   * The base organization. If it's given the component should be considered as an updater of the object
   */
  organization?: Organization
  /**
   * The event called after the research on the siret field
   * that should fill as much as it can the organization type
   */
  getInseeOrganization?: (siret: string) => Promise<Organization | undefined>
  /**
   * The submit event
   * @default 'Valider'
   * @param organization the complete organization object after form validation
   * @returns true if the api call has been successfull
   */
  onSubmit?: (organization: Organization) => Promise<Validated> | Validated
  /**
   * The label placed in the submit button
   * @default 'Valider'
   */
  submitButtonLabel?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: OrgCreationClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: OrgCreationStyles
}

export type OrgCreationProps = MergeMuiElementProps<
  StackProps,
  OrgCreationBasicProps
>

export const OrgCreation = (props: OrgCreationProps) => {
  const {
    organization,
    onSubmit,
    getInseeOrganization,
    submitButtonLabel = 'Valider',
    className,
    classes,
    styles,
    ...other
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(!organization)
  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)
  const [imageError, setImageError] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)
  const [feedback, setFeedback] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setFeedback(undefined)
  }, [onSubmit])

  const onCloseSiretInfo = useCallback(() => setOpenSiretInfo(false), [])

  const partialFields = useMemo(
    (): FormPartialField[] => [
      {
        name: 'siret',
        defaultValue: organization?.siret,
        validator: (value?: string | number) => {
          const string = String(value).trim()
          if (!string || !value)
            return 'Vous devez renseigner le numéro de siret' as string
          if (string.length != 14)
            return 'un numéro de siret doit être composé de 14 chiffres' as string
          return undefined
        }
      },
      {
        name: 'street',
        defaultValue: organization?.address.street,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed) return "Vous devez renseigner l'addresse" as string
          return undefined
        }
      },
      {
        name: 'postalCode',
        defaultValue: organization?.address.postalCode,
        validator: (value?: string | number) => {
          const string = String(value).trim()
          if (!string || !value)
            return 'Vous devez renseigner le code postal' as string
          if (string.length != 5)
            return 'un code postal doit être composé de 5 chiffres' as string
          return undefined
        }
      },
      {
        name: 'city',
        defaultValue: organization?.address.city,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed) return 'Vous devez renseigner la ville' as string
          return undefined
        }
      },
      {
        name: 'name',
        defaultValue: organization?.name,
        validator: (value?: string) => {
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
      }
    ],
    [organization]
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
      getInseeOrganization(formState.values['siret']).then((values) => {
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
    formState.values['siret'],
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
          //@ts-ignore
          ref: setSiretRef,
          onSearch: () => {
            if (!formState.validateField('siret')) {
              fetchOrganization()
            }
          }
        }
      }
    ],
    [formState.validateField, fetchOrganization, siretValid]
  )

  const details = useMemo(
    (): FormField[] => [
      {
        key: 'name',
        name: 'name',
        type: 'textfield',
        label: 'Nom'
      },
      {
        key: 'street',
        name: 'street',
        type: 'textfield',
        label: 'addresse'
      },
      {
        key: 'postalCode',
        name: 'postalCode',
        type: 'textfield',
        label: 'Code postal',
        textFieldProps: {
          textFieldType: 'number'
        }
      },
      {
        key: 'city',
        name: 'city',
        type: 'textfield',
        label: 'Ville'
      },
      {
        key: 'website',
        name: 'website',
        type: 'textfield',
        label: 'Site web (optionnel)'
      }
    ],
    []
  )

  const description = useMemo(
    (): FormField[] => [
      {
        key: 'description',
        name: 'description',
        type: 'textfield',
        label: 'Description (optionnel)',
        textFieldProps: {
          multiline: true,
          rows: 11
        }
      }
    ],
    []
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

  const onPictureDroped = useCallback((image: File) => {
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
      className={clsx(className, 'AruiOrgCreation-root')}
      {...other}
    >
      <Form
        className={clsx(classes?.siretForm, 'AruiOrgCreation-siretForm')}
        style={styles?.siretForm}
        fields={siret}
        formState={formState}
      />
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        width='100%'
      >
        <Form
          className={clsx(
            classes?.leftForm,
            'AruiOrgCreation-leftForm',
            'mainFormLeft'
          )}
          style={styles?.leftForm}
          fields={details}
          formState={formState}
        />
        <Stack>
          <Box
            className={clsx(
              classes?.dropPictureBox,
              'AruiOrgCreation-dropPictureBox'
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
              Logo de l'entreprise (optionnel)
            </InputLabel>
            <DropPicture
              errorMessage={imageError}
              onDropError={onDropError}
              onRemovePicture={onRemovePicture}
              initialPicture={organization?.image}
              onPictureDroped={onPictureDroped}
              addPictureHelperText='Ajouter une image'
              removePictureHelperText="Retirer l'image"
              alt="Le logo de l'entreprise"
            />
          </Box>
          <Form
            className={clsx(
              classes?.rightForm,
              'AruiOrgCreation-rightForm',
              'mainFormRight'
            )}
            style={styles?.rightForm}
            fields={description}
            formState={formState}
          />
        </Stack>
      </Stack>
      <Stack
        className={clsx(
          classes?.actionsContainer,
          'AruiOrgCreation-actionsContainer'
        )}
        style={styles?.actionsContainer}
        direction='row'
        justifyContent='flex-end'
        width='100%'
      >
        <Button
          success={feedback !== undefined && feedback}
          fail={feedback !== undefined && !feedback}
          onClick={formState.submitForm}
        >
          {submitButtonLabel}
        </Button>
      </Stack>

      {siretRef && (
        <StyledPopover
          //@ts-ignore
          open={openSiretInfo}
          onClose={onCloseSiretInfo}
          anchorEl={siretRef}
          placement='bottom'
          className={clsx(classes?.infoPopover, 'AruiOrgCreation-infoPopover')}
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
