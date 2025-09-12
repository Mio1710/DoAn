<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import internStatus from '../../../../plugins/filters/topic-status'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import CreateIntern from '~/components/student/company/molecules/CreateIntern.vue'
import useTeacherGetStudentInterns from '~/composables/teacher/use-teacher-get-student-intern'
import ReportInternDetail from '~/components/teacher/student/organism/ReportInternDetail.vue'
definePageMeta({
  layout: 'auth',
  middleware: ['is-teacher'],
})

const redirect = (studentId) => {
  navigateTo(`guide-point/${studentId}`)
}

const isCreate = ref(false)
const semester = ref('')
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên sinh viên', key: 'student', width: '10%', minWidth: 150 },
  { title: 'MSSV', key: 'maso', width: '5%', minWidth: 100 },
  { title: 'Tên công ty', key: 'company_name', width: '15%', minWidth: 150 },
  { title: 'Địa chỉ', key: 'address', width: '20%', minWidth: 150 },
  // { title: 'Email công ty', key: 'company_email', width: '10%', minWidth: 150 },
  // { title: 'SĐT công ty', key: 'company_phone', width: '10%', minWidth: 100 },
  { title: 'Tên người hướng dẫn', key: 'supervisor_name', width: '10%', minWidth: 150 },
  { title: 'SĐT người hướng dẫn', key: 'supervisor_phone', width: '10%', minWidth: 100 },
  { title: 'Email người hướng dẫn', key: 'supervisor_email', width: '10%', minWidth: 150 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 100, align: 'center' },
  { title: 'Chi tiết', key: 'action', width: '10%', minWidth: 100, sortable: false, align: 'center' },
  // { title: '', key: 'action', width: 30 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})

const filters = ref({
  status: ['pending', 'approved'],
})

const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: { viewAll: true, ...filters.value },
}))

const { $api, $toast } = useNuxtApp()
const { data } = useAuth()

const handleActive = (item) => {
  try {
    $api.semester.activeSemester(item.id).then(() => {
      queryClient.invalidateQueries('semester')
      $toast.success('Đã cập nhật trạng thái thành công')
    })
  } catch (error) {
    console.log(error)
  }
}

// const { items, totalItems, isLoading, refetch } = useQuery(['interns', 'teacher'], () =>
//   $api.intern.getInternsByTeacher()
// )

const queryClient = useQueryClient()
const handleCheck = (item, status) => {
  try {
    $api.teacherIntern.checkTeacherIntern(item.id, status).then(() => {
      queryClient.invalidateQueries('teacher-intern')
      $toast.success('Đã cập nhật thành công')
    })
  } catch (error) {
    console.log(error)
  }
}

const { items, totalItems, isLoading, refetch } = useGetTeacherIntern(queryBuilder)

</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Danh sách thực tập</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex">
        <div class="d-flex">
          <v-checkbox
            v-model="filters.status"
            class="mr-4"
            color="warning"
            density="compact"
            hide-details
            label=" Chờ duyệt"
            value="pending"
          />
          <v-checkbox
            v-model="filters.status"
            class="mr-4"
            color="success"
            density="compact"
            hide-details
            label=" Đã duyệt"
            value="approved"
          />
          <v-checkbox
            v-model="filters.status"
            class="mr-4"
            color="error"
            density="compact"
            hide-details
            label=" Từ chối"
            value="rejected"
          />
        </div>
        <v-spacer />
        <v-btn color="success" :loading="isFetching" size="small" @click="refetch">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div class="mt-2 h-[calc(100%_-_30px)] overflow-y-hidden">
        <v-data-table
          class="h-full"
          fixed-header
          :headers="headers"
          hide-default-footer
          :items="items"
          :loading="isFetching"
        >
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.student="{ item }">
            <span>{{ item.student?.hodem }} {{ item.student?.ten }}</span>
          </template>
          <template #item.maso="{ item }">
            <span>{{ item.student?.maso }}</span>
          </template>
          <template #item.status="{ item }">
            <div class="ma-2 text-center">
              <v-chip
                :color="internStatus.statusColor(item.status)"
                size="small"
                variant="flat"
              >
                <span>{{ internStatus.statusType(item.status) }}</span>
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <!-- <v-btn rounded variant="text" @click="redirect(item.student.id)">
              <v-icon color="success">mdi-eye</v-icon>
            </v-btn> -->
            <v-dialog min-width="80" width="80%">
              <template #activator="{ props: activatorProps }">
                <v-btn rounded variant="text" v-bind="activatorProps">
                  <v-icon color="success">mdi-eye</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <report-intern-detail :item="item" @cancel="isActive.value = false" @success="refetch" />
              </template>
            </v-dialog>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
