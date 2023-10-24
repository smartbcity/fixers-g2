import {
  TableCellChipProps,
  TableCellContactProps,
  TableCellDateProps,
  TableCellIconTagProps,
  TableCellLinkProps,
  TableCellNumberProps,
  TableCellProfileProps,
  TableCellStatusProps,
  TableCellTextProps
} from '../ColumnFactory'

export interface ChipProperties {
  type: 'chip'
  properties?: TableCellChipProps
}

export interface ContactProperties {
  type: 'contact'
  properties?: TableCellContactProps
}

export interface DateProperties {
  type: 'date'
  properties?: TableCellDateProps
}

export interface LinkProperties {
  type: 'link'
  properties?: TableCellLinkProps
}

export interface NumberProperties {
  type: 'number'
  properties?: TableCellNumberProps
}

export interface ProfileProperties {
  type: 'profile'
  properties?: TableCellProfileProps
}

export interface StatusProperties {
  type: 'status'
  properties?: TableCellStatusProps
}

export interface TextProperties {
  type: 'text'
  properties?: TableCellTextProps
}

export interface IconTagProperties {
  type: 'iconTag'
  properties?: TableCellIconTagProps
}

export type ColumnProperties =
  | ChipProperties
  | ContactProperties
  | DateProperties
  | LinkProperties
  | NumberProperties
  | ProfileProperties
  | StatusProperties
  | TextProperties
  | IconTagProperties
