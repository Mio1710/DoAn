import type { UnwrapRef } from 'vue'
import { computed } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetStudentResultTopics(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['student-result-topic', params],
    () => {
      return $api.results.getResultTopic()
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
