import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useTeacherGetStudentInterns(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['student-intern', params],
    () => {
      return $api.teacher.getStudentInterns()
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
