import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetActiveSemester(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['active-semester', params],
    () => {
      return $api.semester.getActiveSemester()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const activeSemester = computed(() => query?.data.value?.data || {})

  return {
    activeSemester,
  }
}
