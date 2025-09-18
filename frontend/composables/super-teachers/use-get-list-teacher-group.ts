import { computed, type UnwrapRef } from 'vue'
import { useQuery } from 'vue-query'

export default function useGetListTeacherGroups(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()

  const query = useQuery(
    ['teacher-group', params],
    () => {
      return $api.teacherGroup.getTeacherGroups()
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
