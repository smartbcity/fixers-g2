import { FunctionComponent, ReactElement } from 'react'
import {
  RadioChoicesProps,
  InputForm,
  InputFormBasicProps
} from '@smartb/g2-forms'
import { FieldRenderProps } from '../factories/FormElementsFactories'

export type RadioChoicesExtendProps = Partial<
  Omit<
    RadioChoicesProps & InputFormBasicProps<'radioChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

type RadioChoicesRenderPros = FieldRenderProps<
  'radioChoices',
  RadioChoicesExtendProps
>

export const RadioChoicesRender: FunctionComponent<RadioChoicesRenderPros> = (
  props: RadioChoicesRenderPros
): ReactElement => {
  const { element, formState, formProps } = props
  return (
    // @ts-ignore
    <InputForm
      inputType='radioChoices'
      value={formState.getFieldProps(formProps.name).value ?? ''}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: string) => {
        formState.setFieldValue(formProps.name, value, false)
        !!formProps.onChange && formProps.onChange(value)
      }}
      {...element.props}
      {...formProps}
    />
  )
}
