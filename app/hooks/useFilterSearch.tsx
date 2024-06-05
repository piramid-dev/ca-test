import { useSearchParams } from '@remix-run/react'
import {
  getFiltersFromQuery,
  setFiltersToQuery,
  getOrderFromQuery,
} from '~/lib/filter.utils'

export function useFilterSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')
  const orderQuery = searchParams.get('order')
  const activeFilters = getFiltersFromQuery(query)
  const order = getOrderFromQuery(orderQuery)

  const setFilters = (subject: string, value: string) => {
    const existingFilter = activeFilters.find(
      (filter) => filter.subject === subject,
    )

    const newFilters =
      activeFilters.length > 0 && existingFilter
        ? activeFilters
            .map((filter) => {
              if (filter.subject === subject) {
                // If the value is already in the filter, remove it
                if (filter.values.includes(value)) {
                  return {
                    ...filter,
                    values: filter.values.filter((v) => v !== value),
                  }
                }
                // If the value is not in the filter, add it
                return {
                  ...filter,
                  values: [...filter.values, value] as string[],
                }
              }
              return filter
              // return filter
            })
            .filter((filter) => filter.values.length > 0)
        : [...activeFilters, { subject, values: [value] }]

    const finalQuery = setFiltersToQuery(newFilters)

    return setSearchParams((prev) => {
      if (finalQuery) {
        prev.set('q', finalQuery)
      } else {
        prev.delete('q')
      }
      return prev
    })
  }

  const setOrder = ({ order, direction }) => {
    console.log('setParams', order, direction)

    // Update just the params but keep the existing filters
    const orderParams = order ? `${order}+${direction}` : ''
    setSearchParams((prev) => {
      prev.set('order', orderParams)
      return prev
    })
  }

  const clearFilters = () => {
    setSearchParams((prev) => {
      prev.delete('q')
      return prev
    })
  }

  return {
    activeFilters,
    order,
    setFilters,
    clearFilters,
    setOrder,
  }
}
