<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import internStatus from '../../../plugins/filters/topic-status'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import CreateIntern from '~/components/student/company/molecules/CreateIntern.vue'
import UpdateIntern from '~/components/student/company/molecules/UpdateIntern.vue'
import CreateTeacherGroup from '~/components/admin/super/molecules/CreateTeacherGroup.vue'
import CreateAssignTeacher from '~/components/admin/super/molecules/CreateAssignTeacher.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-super-teacher'],
})

const isCreate = ref(false)
const semester = ref('')
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 20,
  },
  { title: 'Tên sinh viên', key: 'student', width: '20%', minWidth: 150 },
  { title: 'MSSV', key: 'maso', width: '10%', minWidth: 100 },
  { title: 'Tên công ty', key: 'company_name', width: '20%', minWidth: 150 },
  { title: 'Địa chỉ', key: 'address', width: '20%', minWidth: 150},
  // { title: 'Email công ty', key: 'company_email', width: '10%', minWidth: 150 },
  // { title: 'SĐT công ty', key: 'company_phone', width: '10%', minWidth: 100 },
  // { title: 'Tên người hướng dẫn', key: 'supervisor_name', width: '10%', minWidth: 100 },
  // { title: 'SĐT người hướng dẫn', key: 'supervisor_phone', width: '10%', minWidth: 100 },
  // { title: 'Email người hướng dẫn', key: 'supervisor_email', width: '10%', minWidth: 100 },
  { title: 'GVHD', key: 'teacher', width: '12%', minWidth: 100 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 100, align: 'center' },
  { title: 'Phân công GVHD', key: 'action', width: 30 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})

const filters = ref({
  status: [],
})

const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: { viewAll: true, ...filters.value },
  // filters: filters.value,
}))

const { $api, $toast } = useNuxtApp()
const { data } = useAuth()

const queryClient = useQueryClient()
const handleCheck = (item, status) => {
  try {
    $api.intern.checkIntern(item.id, status).then(() => {
      queryClient.invalidateQueries('intern')
      $toast.success('Đã cập nhật thành công')
    })
  } catch (error) {
    console.log(error)
  }
}

const { items, totalItems, isLoading, refetch, isFetching } = useGetIntern(queryBuilder)

</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Duyệt đăng ký thực tập</div>
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
        <v-data-table-virtual
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
          <template #item.teacher="{ item }">
            <span>{{ item.teacher?.hodem }} {{ item.teacher?.ten }}</span>
          </template>
          <template #item.status="{ item }">
            <div class="ma-2 text-center">
              <v-chip
                v-if="item.status == 'pending'"
                class="mb-2"
                color="success"
                size="small"
                variant="outlined"
                @click="handleCheck(item, 'approved')"
              >
                <v-icon>mdi-check</v-icon>
                <span>Duyệt</span>
              </v-chip>
              <v-chip
                v-if="item.status == 'pending'"
                color="error"
                size="small"
                variant="outlined"
                @click="handleCheck(item, 'rejected')"
              >
                <v-icon>mdi-close</v-icon>
                <span>Từ chối</span>
              </v-chip>
              <v-chip
                v-if="item.status != 'pending'"
                :color="internStatus.statusColor(item.status)"
                size="small"
                variant="flat"
              >
                <span>{{ internStatus.statusType(item.status) }}</span>
              </v-chip>
            </div>
          </template>
        <template #item.action="{ item }">
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn v-if ="!item.teacher" color="success" size="small" v-bind="activatorProps">
              <span>Phân công</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-assign-teacher :intern="item" @cancel="isActive.value = false" />
          </template>
        </v-dialog>
      </template>
        </v-data-table-virtual>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>

