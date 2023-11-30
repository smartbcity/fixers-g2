import { UseTableOptions, useTable } from '../TableV2'
import { TableComposable, composableToColumns } from './composable'
import { useTranslation } from 'react-i18next'

export interface UseTableComposableOptions<Data extends {}>
  extends Omit<UseTableOptions<Data>, 'columns'> {
  /**
   * The composable template
   */
  tableComposable: TableComposable
}

export const useTableComposable = <Data extends {} = {}>(
  params: UseTableComposableOptions<Data>
) => {
  const { tableComposable, ...rest } = params

  const { i18n } = useTranslation()

  return useTable({
    columns: composableToColumns<Data>(tableComposable, i18n.language),
    ...rest
  })
}
