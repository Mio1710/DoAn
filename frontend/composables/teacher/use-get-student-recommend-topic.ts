import { Api } from '~/api'
import type { APIParams } from '~/types/ResponseTypes'

export default function useGetStudentRecommendTopics(params?: APIParams, options?: any) {
  const { $fetchClient } = useNuxtApp()
  const { data, error, execute, pending } = useAsyncData('getStudentRecommendTopics', () =>
  {
    console.log('Fetching student recommend topics with params:', params);

    return $fetchClient(`/teachers/student-topic/recommend-topics`, {
      body: params,
      ...options
    })
  }
  )

  return {
    items: data?.data ?? [],
    execute,
    error,
    isLoading: pending,
  }
}
