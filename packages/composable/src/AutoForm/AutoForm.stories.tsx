import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { AutoForm, AutoFormProps } from './AutoForm'
import { BrowserRouter } from 'react-router-dom'
import json from './autoForm.json'
import { autoFormFormatter } from './autoFormFormatter'
import { Button } from '@smartb/g2-components'

export default {
  title: 'Composable/AutoForm',
  component: AutoForm
} as Meta

export const AutoFormStory: StoryFn<AutoFormProps> = (args: AutoFormProps) => {
  return (
    <BrowserRouter>
      <AutoForm
        {...args}
        onSubmit={(command, values) => console.log(command, values)}
        getFormActions={(formState) => (
          <Button onClick={formState.submitForm}>Submit</Button>
        )}
      />
    </BrowserRouter>
  )
}

AutoFormStory.args = {
  //@ts-ignore
  formData: autoFormFormatter(json)
}
