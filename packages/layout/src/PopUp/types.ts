export const classes = `interface PopUpClasses {
  title?: string
  content?: string
  actions?: string
  button?: string
}`

export const styles = `interface PopUpStyles {
  title?: React.CSSProperties
  content?: React.CSSProperties
  actions?: React.CSSProperties
  button?: React.CSSProperties
}`

export const Action = `type Action = {
  label: string
  handler: (event: React.ChangeEvent<{}>) => void
  variant?: Variant
}`
