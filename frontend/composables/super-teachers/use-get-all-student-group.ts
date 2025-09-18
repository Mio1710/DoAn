import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'
export default function useGetAllStudentGroups(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['student-group', params],
    () => {
      return $api.superTeacher.getAllStudentGroups()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const items = computed(() => query.data.value?.data || [])

  return {
    ...query,
    items,
  }
}
