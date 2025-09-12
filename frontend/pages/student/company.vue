<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import CreateIntern from '~/components/student/company/molecules/CreateIntern.vue'
import internStatus from '~/plugins/filters/intern-status'
import UpdateIntern from '~/components/student/company/molecules/UpdateIntern.vue'
import DeleteIntern from '~/components/student/company/molecules/DeleteIntern.vue'

definePageMeta({
  layout: 'auth',
})
const isCreate = ref(false)
const semester = ref('')
const headers = [
  { title: 'Tên công ty', key: 'company_name', width: '15%', minWidth: 150 },
  { title: 'Địa chỉ', key: 'address', width: '15%', minWidth: 150 },
  { title: 'Email công ty', key: 'company_email', width: '10%', minWidth: 100 },
  { title: 'SĐT công ty', key: 'company_phone', width: '10%', minWidth: 100 },
  { title: 'Tên người hướng dẫn', key: 'supervisor_name', width: '10%', minWidth: 100 },
  { title: 'SĐT người hướng dẫn', key: 'supervisor_phone', width: '10%', minWidth: 100 },
  { title: 'Email người hướng dẫn', key: 'supervisor_email', width: '10%', minWidth: 100 },
  { title: 'GVHD', key: 'teacher', width: '10%', minWidth: 100 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 100, align: 'center' },
  { title: '', key: 'action', width: 30 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})
const filters = ref({
  viewAll: false,
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: filters.value,
}))

const { $api, $toast } = useNuxtApp()
const { data } = useAuth()
const queryClient = useQueryClient()

const { items, totalItems, isLoading, refetch } = useGetIntern(queryBuilder)
const hasRegistered = computed(() => {
  return items.value.some(item => item.student.id === data.value.id)
})
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Thực tập doanh nghiệp</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn v-if="!hasRegistered" color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Đăng ký thực tập</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-intern @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <v-spacer />
      </div>
      <div class="mt-2 h-[calc(100%-_45px)] overflow-y-hidden">
        <v-data-table-virtual class="h-full" fixed-header :headers="headers" :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.teacher="{ item }">
            <span>{{ item.teacher?.hodem }} {{ item.teacher?.ten }}</span>
          </template>
          <template #item.status="{ item }">
            <v-chip :color="internStatus.statusColor(item.status)" size="small" variant="flat">
              {{ internStatus.statusType(item.status) }}
            </v-chip>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-if="data?.id == item.student.id"
                  v-bind="activatorProps"
                  color="success"
                  :disabled="item.status == 'approved' || !item.status"
                  icon
                  size="small"
                  variant="text"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-intern :intern="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
            <delete-intern v-if="item.status == 'pending'" :intern="item" @success="refetch" />
          </template>
        </v-data-table-virtual>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>

