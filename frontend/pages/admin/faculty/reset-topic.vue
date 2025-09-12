<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import topicStatus from '../../../plugins/filters/topic-status'
import ResetTopicAlert from "~/components/admin/super/molecules/ResetTopicAlert.vue";

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
  { title: 'Giảng viên', key: 'gv', width: '10%', minWidth: 100 },
  { title: 'Tên đề tài', key: 'ten', width: '20%', minWidth: 250 },
  { title: 'Mô tả', key: 'description', width: '35%', minWidth: 350 },
  { title: 'Yêu cầu', key: 'requirement', width: '20%', minWidth: 200 },
  { title: 'Kiến thức kỹ năng', key: 'knowledge', width: '15%', minWidth: 150 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 100 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})

const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: { viewAll: true },
}))

const { $api, $toast } = useNuxtApp()

const queryClient = useQueryClient()
const handleCheck = (item, status) => {
  try {
    $api.topic.checkTopic(item.id, status).then(() => {
      queryClient.invalidateQueries('topic')
      $toast.success('Đã cập nhật thành công')
    })
  } catch (error) {
    console.log(error)
  }
}

const { items, totalItems, isLoading, refetch, isFetching } = useGetTopic(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Tất cả đề tài</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex">
        <v-dialog max-width="500" width="50%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="warning" size="small" v-bind="activatorProps">
              <v-icon>mdi-alert</v-icon>
              <span>Reset đề tài </span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <reset-topic-alert @cancel="isActive.value = false" @success="refetch" />
          </template>
        </v-dialog>
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
          <template #item.gv="{ item }">
            <span>{{ item.teacher?.hodem }} {{ item.teacher?.ten }}</span>
          </template>
          <template #item.status="{ item }">
            <v-chip
              v-if="item.status != 'pending'"
              :color="topicStatus.statusColor(item.status)"
              size="small"
              variant="flat"
            >
              <span>{{ topicStatus.statusType(item.status) }}</span>
            </v-chip>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
