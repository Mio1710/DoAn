import { computed } from 'vue'
import { UnwrapRef } from 'vue-demi'
import { useQuery } from 'vue-query'

export default function useGetMyReportInterns(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['my-report-intern', params],
    () => {
      // console.log('params in useQuery', params)
      return $api.reportIntern.getReportInterns()
      // return $api.teacher.getStudentReportInterns(params)
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
