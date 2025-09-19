import { Api } from '~/api'
import type { APIParams } from '~/types/ResponseTypes'

export default function useGetStudentRecommendTopics(params?: APIParams, options?: any) {
  const { $api } = useNuxtApp()
  const { data, error, execute, pending } = useAsyncData('get-student-recommend-topics', () =>
    $api.teacher.getStudentRecommendTopic()
  )

  return {
    items: data?.data ?? [],
    execute,
    error,
    isLoading: pending,
  }
}
