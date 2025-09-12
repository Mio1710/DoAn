import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'
import _ from 'lodash'
import Parser from '~/utils/parser'

export default function useGetCurrentSemesters(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['semester', params],
    () => {

      return $api.semester.getActiveSemester()
    },
    {
      refetchOnWindowFocus: false,
      ...options,
    },
  )

  const items = computed(() => query.data?.value?.data || {})

  return {
    ...query,
    items,
  }
}
