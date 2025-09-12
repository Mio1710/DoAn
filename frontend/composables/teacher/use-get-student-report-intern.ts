// import { computed } from 'vue'
// import { UnwrapRef } from 'vue-demi'
// import { useQuery } from 'vue-query'

// export default function useGetStudentReportInterns(params?: UnwrapRef<any>, options?: any) {
//   const { $api } = useNuxtApp()

//   const query = useQuery(
//     ['student-report-intern', params],
//     () => {
//       return $api.teacher.getStudentReportInterns()
//     },
//     {
//       refetchOnWindowFocus: false,
//       ...options,
//     },
//   )

//   const items = computed(() => query.data.value?.data || {})

//   return {
//     ...query,
//     items,
//   }
// }

import { computed } from 'vue'
import { UnwrapRef } from 'vue-demi'
import { useQuery } from 'vue-query'
import Parser from '~/utils/parser'
import { sortsParser } from '~/utils/sortParser'

export default function useGetStudentReportInterns(params?: UnwrapRef<any>, options?: any) {
  const { $api } = useNuxtApp()
  console.log('params in useQuery', params)

  const query = useQuery(
    ['student-report-intern', params],
    () => {
      const { sortBy, sortType } = params.value
      const sorts = sortsParser(sortBy, sortType)
      console.log('params in useQuery', params, params.value)

      const query = new Parser({
        includes: [],
        appends: [],
        fields: {},
        filters: {},
        sorts,
        page: params.value.page,
        limit: params.value.rowsPerPage,
        payload: null,
        ...params.value,
      }).query()

      return $api.teacher.getStudentReportInterns(query)
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

