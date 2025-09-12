<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import UpdateSemester from '~/components/admin/semester/molecules/UpdateSemester.vue'
import CreateSemester from '~/components/admin/semester/molecules/CreateSemester.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
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
  { title: 'Tên kỳ đăng ký', key: 'ten', width: '35%', minWidth: 250 },
  { title: 'Trạng thái', key: 'status', width: '15%', minWidth: 150 },
  { title: 'Thời gian mở', key: 'date', width: '15%', minWidth: 150 },
  { title: 'Công bố đề tài', key: 'public-topic', width: '15%', minWidth: 150 },
  { title: 'Đăng ký đề tài', key: 'register-topic', width: '15%', minWidth: 150 },
  { title: 'Đăng ký nhóm', key: 'register-group', width: '15%', minWidth: 150 },
  { title: 'Bảo vệ', key: 'defense', width: '15%', minWidth: 150 },
  { title: 'Kết quả', key: 'result', width: '15%', minWidth: 150 },
  { title: 'Ghi chú', key: 'note', width: '25%', minWidth: 200 },
  { title: 'Người tạo', key: 'name', width: '20%', minWidth: 200 },
  { title: 'Ngày tạo', key: 'created_at', width: '15%', minWidth: 100 },
  { title: '', key: 'action', width: 30 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 25,
  sortBy: '-created_at',
  sortType: 'asc',
})
const queryBuilder = computed(() => ({
  ...serverOptions.value,
}))

const { $api, $toast } = useNuxtApp()

const queryClient = useQueryClient()
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

const { items, totalItems, isLoading, refetch } = useGetSemesters(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Tạo đợt đăng ký mới</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog width="600">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm học kỳ</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-semester @cancel="isActive.value = false" />
          </template>
        </v-dialog>
      </div>
      <div class="mt-2">
        <v-data-table :headers="headers" hide-default-footer :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.status="{ item }">
            <v-switch v-model="item.status" color="success" hide-details @click="handleActive(item)" />
          </template>
          <template #item.created_at="{ item }">
            <span>{{ format(new Date(item?.created_at), 'dd/MM/yyyy') }}</span>
          </template>
          <template #item.name="{ item }">
            <span>{{ item.createdBy?.hodem + ' ' + item.createdBy?.ten }}</span>
          </template>
          <template #item.date="{ item }">
            <div v-if="item.start_date">{{ format(new Date(item?.start_date), 'dd/MM/yyyy HH:mm') }}</div>
            <div class="text-center">-</div>
            <div v-if="item.end_date">{{ format(new Date(item?.end_date), 'dd/MM/yyyy HH:mm') }}</div>
          </template>
          <template #item.public-topic="{ item }">
            <div v-if="item.start_publish_topic">{{ format(new Date(item?.start_publish_topic), 'dd/MM/yyyy HH:mm') }}</div>
            <div class="text-center">-</div>
            <div v-if="item.end_publish_topic">{{ format(new Date(item?.end_publish_topic), 'dd/MM/yyyy HH:mm') }}</div>
          </template>

          <template #item.register-topic="{ item }">
            <div v-if="item.start_register_topic">{{ format(new Date(item?.start_register_topic), 'dd/MM/yyyy HH:mm') }}</div>
            <div class="text-center">-</div>
            <div v-if="item.end_register_topic">{{ format(new Date(item?.end_register_topic), 'dd/MM/yyyy HH:mm') }}</div>
          </template>
          <template #item.register-group="{ item }">
            <div v-if="item.start_register_group">{{ format(new Date(item?.start_register_group), 'dd/MM/yyyy HH:mm') }}</div>
            <div class="text-center">-</div>
            <div v-if="item.end_register_group">{{ format(new Date(item?.end_register_group), 'dd/MM/yyyy HH:mm') }}</div>
          </template>
          <template #item.defense="{ item }">
            <div v-if="item.start_defense">{{ format(new Date(item?.start_defense), 'dd/MM/yyyy HH:mm') }}</div>
            <div class="text-center">-</div>
            <div v-if="item.end_defense">{{ format(new Date(item?.end_defense), 'dd/MM/yyyy HH:mm') }}</div>
          </template>
          <template #item.result="{ item }">
            <div v-if="item.public_result">{{ format(new Date(item?.public_result), 'dd/MM/yyyy HH:mm') }}</div>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn ref="btn" rounded variant="text" v-bind="activatorProps">
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-semester
                  :semester="item"
                  @cancel="isActive.value = false"
                  @delete="refetch"
                  @update="refetch"
                />
              </template>
            </v-dialog>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
