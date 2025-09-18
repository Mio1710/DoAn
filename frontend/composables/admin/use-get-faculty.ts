import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'
export default function useGetFaculties(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['faculty', params],
    () => {
      return $api.faculty.getFaculties()
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
