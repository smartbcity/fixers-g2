import React, { useCallback, useMemo, useState } from 'react'
import {
  Form,
  FormField,
  useFormWithPartialFields,
  FormPartialField
} from '@smartb/g2-forms'
import { Box, InputLabel, Stack, styled, Typography } from '@mui/material'
import { Button, DropPicture, DropPictureError } from '@smartb/g2-components'
import { Popover } from '@smartb/g2-notifications'
import { fileToBase64 } from 'utils'

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

//@ts-ignore
const StyledPopover = styled(Popover)({
  width: '80vw',
  maxWidth: '450px'
})

export type Organization = {
  siret: number
  name: string
  description?: string
  webSite?: string
  address: string
  postalCode: number
  city: string
  image?: string
}

export interface OrgCreationProps {
  organization?: Organization
  getInseeOrganization?: (
    siret: string
  ) => Promise<Partial<Organization> | undefined>
  onSubmit?: (organization: Organization) => void
  submitButtonLabel?: string
}

export const OrgCreation = (props: OrgCreationProps) => {
  const {
    organization,
    onSubmit,
    getInseeOrganization,
    submitButtonLabel = 'Valider'
  } = props

  const [openSiretInfo, setOpenSiretInfo] = useState(!organization)
  const [siretValid, setSiretValid] = useState(false)
  const [siretRef, setSiretRef] = useState(null)
  const [imageError, setImageError] = useState<string | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)

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
        name: 'address',
        defaultValue: organization?.address,
        validator: (value?: string) => {
          const trimmed = (value ?? '').trim()
          if (!trimmed) return "Vous devez renseigner l'addresse" as string
          return undefined
        }
      },
      {
        name: 'postalCode',
        defaultValue: organization?.postalCode,
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
        defaultValue: organization?.city,
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
        defaultValue: organization?.name
      },
      {
        name: 'webSite',
        defaultValue: organization?.webSite
      }
    ],
    [organization]
  )

  const onSubmitMemoized = useCallback(
    (values: any) => {
      onSubmit &&
        onSubmit({
          address: values.address,
          city: values.city,
          name: values.name,
          postalCode: Number(values.postalCode),
          siret: Number(values.siret),
          description: values.description,
          webSite: values.webSite,
          image: image
        })
    },
    [onSubmit, image]
  )

  const formState = useFormWithPartialFields({
    fields: partialFields,
    onSubmit: onSubmitMemoized
  })

  const fetchOrganization = useCallback(() => {
    getInseeOrganization &&
      getInseeOrganization(formState.values['siret']).then((values) => {
        if (values) {
          formState.setValues(values, false)
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
        key: 'address',
        name: 'address',
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
        key: 'webSite',
        name: 'webSite',
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
    >
      <Form fields={siret} formState={formState} />
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='space-between'
        width='100%'
      >
        <Form className='mainFormLeft' fields={details} formState={formState} />
        <Stack>
          <Box
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
            className='mainFormRight'
            fields={description}
            formState={formState}
          />
        </Stack>
      </Stack>
      <Stack direction='row' justifyContent='flex-end' width='100%'>
        <Button onClick={formState.submitForm}>{submitButtonLabel}</Button>
      </Stack>

      {siretRef && (
        <StyledPopover
          open={openSiretInfo}
          onClose={onCloseSiretInfo}
          anchorEl={siretRef}
          placement='bottom'
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
