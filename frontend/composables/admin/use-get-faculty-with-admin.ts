import { computed } from 'vue'
import { useQuery } from 'vue-query'
import type { Faculty } from '~/types/faculty'
import type { BaseQuery } from '~/types/query'
import type { UseQueryResponse } from '~/types/ResponseTypes'

export default function useGetFacultyWithAdmin(params?: BaseQuery, options?: any): UseQueryResponse<Faculty> {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['faculty-admins', params],
    () => {
      return $api.superAdmin.getFacultyWithAdmin()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const items = computed(() => query.data.value?.data || [])
  const totalItems = computed(() => query.data.value?.pagination?.total || 0)

  return {
    ...query,
    items,
    totalItems,
  }
}
