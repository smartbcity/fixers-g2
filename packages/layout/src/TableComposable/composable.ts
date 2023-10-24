import { getIn } from '@smartb/g2-utils'
import { ColumnFactory, ColumnGenerators } from '../ColumnFactory'
import { G2ColumnDef } from '../TableV2'
import { ColumnProperties } from './columns'

export type NameLocalized = Record<string, string>

export type ColumnType = keyof ColumnGenerators<{}, G2ColumnDef<{}>>

export interface TableComposable {
  id?: string
  name?: NameLocalized
  columns: Column[]
}

export interface ColumnBase {
  name?: NameLocalized
  identifier: string
  style?: React.CSSProperties
}

export type Column = ColumnBase & ColumnProperties

export const composableToColumns = <Data extends {}>(
  table: TableComposable,
  lng: string
) => {
  return ColumnFactory<Data>({
    generateColumns: (generators) =>
      table.columns.map((el): G2ColumnDef<Data> => {
        return generators[el.type]({
          id: el.identifier,
          header: el.name ? el.name[lng] : '',
          //@ts-ignore
          getCellProps: (data) => {
            return {
              ...el.properties,
              value: getIn(data, el.identifier)
            }
          }
        })
      })
  })
}
