import { computed } from 'vue'
import { UnwrapRef } from 'vue-demi'
import { useQuery } from 'vue-query'

export default function useGetStudentResultTopicLOs(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  console.log('params in useQuery', params)
  const query = useQuery(
    ['student-result-topic-los', params],
    () => {
      return $api.teacher.getStudentResultLOs(params)
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
