import { computed } from 'vue'
import { useQuery } from 'vue-query'
import type { BaseQuery } from '~/types/query'
import type { UseQueryResponse } from '~/types/ResponseTypes'
import type { Semester } from '~/types/semester'

export default function useGetSemesters(params?: BaseQuery, options?: any): UseQueryResponse<Semester> {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['semester', params],
    () => {
      return $api.semester.getSemesters()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const items = computed(() => query.data.value || [])
  const totalItems = computed(() => query.data.value?.pagination?.total || 0)

  return {
    ...query,
    items,
    totalItems,
  }
}
