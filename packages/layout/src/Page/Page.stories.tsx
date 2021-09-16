import React, { useMemo } from 'react'
import { Page as AruiPage, pageBasicProps } from './Page'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { styles, classes } from './types'
import {Filters, useFilters, FiltersField, FiltersAction} from '@smartb/g2-forms'

export default {
  title: 'Layout/Page',
  component: AruiPage,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'PageClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PageStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

const Template: Story<pageBasicProps> = (args: pageBasicProps) => {

  const fields: FiltersField[] = [
    {
      key: "storybook-filters-field-from",
      name: "from",
      label: "From",
      type: "datepicker"
    },
    {
      key: "storybook-filters-field-to",
      name: "to",
      label: "To",
      type: "datepicker"
    },
    {
      key: "storybook-filters-field-keyword",
      name: "keyword",
      label: "Keyword",
      type: "textfield",
      textFieldProps: {textFieldType: "search"}
    },
    {
      key: "storybook-filters-field-country",
      name: "country",
      label: "Country",
      type: "select",
      selectProps: { 
        options: [{ key: "paris", label: 'Paris' }, { key: "lyon", label: 'Lyon' }, { key: "nice", label: 'Nice' }, { key: "marseille", label: 'Marseille' }, { key: "montpellier", label: 'Montpellier' }],
        multiple: true
      }
    }
  ]

  const formState = useFilters({
    fields: fields,
    onSubmit: (values) => {console.log("submitted");console.log(values)}
  })

  const actions = useMemo((): FiltersAction[] => [
    {
      label: 'reset',
      key: 'resetFiltersButton',
      variant: "text",
      onClick: () => formState.resetForm()
    }
  ], [formState.resetForm])

  return (
  <AruiPage {...args} headerContent={<Filters fields={fields} formState={formState} actions={actions} />} />
)}

export const Page = Template.bind({})
Page.args = {
  children: (
    <div
      style={{ height: '120vh', width: '70vw', background: 'rgba(0,0,0,0.1)' }}
    >
      je suis la page
    </div>
  ),
  onGoBackClick: () => {},
  goBackLabel: 'Retour'
}

Page.storyName = 'Page'
