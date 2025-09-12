<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import topicStatus from '../../../plugins/filters/topic-status'
import CreateTopic from "~/components/teacher/topic/molecules/CreateTopic.vue";
import CreateTopicBySuperTeacher from "~/components/teacher/topic/molecules/CreateTopicBySuperTeacher.vue";
import DeleteTopicConfirmDialog from "~/components/teacher/topic/molecules/DeleteTopicConfirmDialog.vue";

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
    width: 50,
  },
  { title: 'Giảng viên', key: 'gv', width: '10%', minWidth: 100 },
  { title: 'Tên đề tài', key: 'ten', width: '20%', minWidth: 250 },
  { title: 'Mô tả', key: 'description', width: '35%', minWidth: 350 },
  { title: 'Yêu cầu', key: 'requirement', width: '20%', minWidth: 200 },
  { title: 'Kiến thức kỹ năng', key: 'knowledge', width: '15%', minWidth: 150 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 100 },
  { title: 'Số lượng', key: 'numberStudent', align: 'center' },
  { title: '', key: 'action', width: 20 },
]
const serverOptions = ref({
  page: 1,
  rowsPerPage: 100,
  sortBy: '-created_at',
  sortType: 'asc',
})

const filters = ref({
  status: [],
})

const queryBuilder = computed(() => ({
  ...serverOptions.value,
  filters: { viewAll: true, ...filters.value },
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
    <div class="text-lg font-bold text-uppercase">Duyệt đề tài</div>
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
        <v-dialog min-width="400" width="40%">
          <template #activator="{ props: activatorProps }">
            <v-btn color="success" size="small" v-bind="activatorProps">
              <v-icon>mdi-plus</v-icon>
              <span>Thêm mới đề tài</span>
            </v-btn>
          </template>
          <template #default="{ isActive }">
            <create-topic-by-super-teacher @cancel="isActive.value = false" />
          </template>
        </v-dialog>
        <v-btn class="ml-2" color="success" :loading="isFetching" size="small" @click="refetch">
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
          :items-per-page="serverOptions.rowsPerPage"
        >
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.gv="{ item }">
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
                :color="topicStatus.statusColor(item.status)"
                size="small"
                variant="flat"
              >
                <span>{{ topicStatus.statusType(item.status) }}</span>
              </v-chip>
            </div>
          </template>
          <template #item.action="{ item }">
            <delete-topic-confirm-dialog :topic="item" />
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
