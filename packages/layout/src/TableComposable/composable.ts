import { getIn } from '@smartb/g2-utils'
import { ColumnFactory, ColumnGenerators } from '../ColumnFactory'
import { G2ColumnDef } from '../TableV2'

export type NameLocalized = Record<string, string>

export type ColumnType = keyof ColumnGenerators<{}, G2ColumnDef<{}>>

export interface TableComposable {
  id?: string
  name?: NameLocalized
  columns: Column[]
}

export interface Column<T extends ColumnType = ColumnType> {
  id?: string
  name?: NameLocalized
  identifier: string
  type: T
  properties?: any
  style?: React.CSSProperties
}

export const composableToColumns = <Data extends {}>(
  table: TableComposable,
  lng: string
) => {
  return ColumnFactory<Data>({
    generateColumns: (generators) =>
      table.columns.map((el): G2ColumnDef<Data> => {
        return generators[el.type]({
          header: el.name ? el.name[lng] : '',
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
