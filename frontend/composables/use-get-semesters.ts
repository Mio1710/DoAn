import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'
export default function useGetSemesters(params?: UnwrapRef<any>, options?: any) {
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
