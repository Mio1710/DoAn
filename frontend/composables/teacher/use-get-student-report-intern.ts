import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetStudentReportInterns(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()
  console.log('params in useQuery', params)

  const query = useQuery(
    ['student-report-intern', params],
    () => {
      return $api.teacher.getStudentReportInterns()
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

