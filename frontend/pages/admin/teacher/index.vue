<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import { format } from 'date-fns'
import AppTextField from '~/components/common/atoms/AppTextField.vue'
import CreateTopic from '~/components/teacher/topic/molecules/CreateTopic.vue'
import topicStatus from '~/plugins/filters/topic-status'
import UpdateTopic from '~/components/teacher/topic/molecules/UpdateTopic.vue'
import DeleteTopicConfirmDialog from '~/components/teacher/topic/molecules/DeleteTopicConfirmDialog.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-teacher'],
})
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên đề tài', key: 'ten', width: '20%', minWidth: 250 },
  { title: 'Mô tả', key: 'description', width: '30%', minWidth: 350 },
  { title: 'Yêu cầu', key: 'requirement', width: '15%', minWidth: 150 },
  { title: 'Kiến thức kỹ năng', key: 'knowledge', width: '15%', minWidth: 150 },
  { title: 'GVHD', key: 'gv', width: '10%', minWidth: 100 },
  { title: 'Số lượng', key: 'numberStudent', align: 'center' },
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

const { items, totalItems, isLoading, refetch } = useGetTopic(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Quản lý đề tài</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm mới đề tài</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-topic @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <v-spacer />
        <v-checkbox v-model="filters.viewAll" density="compact" hide-details label="Xem tất cả" />
      </div>
      <div class="mt-2 h-[calc(100%_-_45px)] overflow-y-hidden">
        <v-data-table-virtual class="h-full" fixed-header :headers="headers" :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.gv="{ item }">
            <span>{{ item.teacher?.hodem }} {{ item.teacher?.ten }}</span>
          </template>
          <template #item.numberStudent="{ item }">
            <span>{{ item.currentNumberStudent }}/{{ item.numberStudent }}</span>
          </template>
          <template #item.status="{ item }">
            <v-chip :color="topicStatus.statusColor(item.status)" size="small" variant="flat">
              <span>{{ topicStatus.statusType(item.status) }}</span>
            </v-chip>
          </template>
          <template #item.action="{ item }">
            <v-dialog min-width="400" width="40%">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-if="data?.id == item?.teacher?.id"
                  v-bind="activatorProps"
                  color="success"
                  icon
                  size="small"
                  variant="text"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <update-topic :topic="item" @cancel="isActive.value = false" />
              </template>
            </v-dialog>
            <delete-topic-confirm-dialog :topic="item" />
          </template>
        </v-data-table-virtual>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
