import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetMyResultTopicLOs(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['student-result-topic-los', params],
    () => {
      return $api.results.getMyResultTopic()
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
