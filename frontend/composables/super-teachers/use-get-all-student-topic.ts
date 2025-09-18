import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetAllStudentTopics(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['all-student-topic', params],
    () => {
      return $api.superTeacher.getAllStudentTopics()
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
