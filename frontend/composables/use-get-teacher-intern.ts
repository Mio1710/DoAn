import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'
export default function useGetTeacherInterns(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['teacher-intern', params],
    () => {
      return $api.teacherIntern.getTeacherInterns()
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
