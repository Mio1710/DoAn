import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetStudentReportTopics(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()
  console.log('params in useQuery', params)

  const query = useQuery(
    ['student-report-topic', params],
    () => {
      return $api.teacher.getStudentReportTopics()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const items = computed(() => query.data.value?.data || {})

  return {
    ...query,
    items,
  }
}
