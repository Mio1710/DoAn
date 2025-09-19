import { Api } from '~/api'
import type { APIParams } from '~/types/ResponseTypes'

export default function useGetStudentRecommendTopics(params?: APIParams, options?: any) {
  const { $api } = useNuxtApp()
  const { data, error, execute, pending } = useAsyncData('getStudentRecommendTopics', () =>
    $api.teacher.getStudentRecommendTopic()
  )

  return {
    items: data?.data ?? [],
    execute,
    error,
    isLoading: pending,
  }
}
