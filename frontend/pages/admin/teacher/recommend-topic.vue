<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import topicStatus from '~/plugins/filters/topic-status'
import useGetStudentRecommendTopics from '~/composables/teacher/use-get-student-recommend-topic'
import CreateTopic from '~/components/teacher/topic/molecules/CreateTopic.vue'
import RejectRecommendTopic from '~/components/teacher/topic/molecules/RejectRecommendTopic.vue'

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
  { title: 'Tên đề tài', key: 'ten', minWidth: 250 },
  { title: 'Mô tả', key: 'description', width: '30%', minWidth: 350 },
  { title: 'Kiến thức kỹ năng', key: 'knowledge', width: '15%', minWidth: 150 },
  { title: 'Sinh viên', key: 'sv', width: '10%', minWidth: 100 },
  { title: 'Trạng thái', key: 'status', width: '10%', minWidth: 180, align: 'center' },
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

const queryClient = useQueryClient()

const { $api, $toast } = useNuxtApp()

const { items, isLoading, refetch } = useGetStudentRecommendTopics(queryBuilder)

const onReject = (item) => {
  $api.teacher.updateRecommendTopic(item.id, { status: 'rejected' }).then(() => {
    $toast.success('Đã từ chối đề tài')
    queryClient.invalidateQueries('student-recommend-topic')
  })
}

const onSuccess = (item) => {
  $api.teacher.updateRecommendTopic(item.id, { status: 'approved' }).then(() => {
    $toast.success('Đã chấp nhận đề tài')
    queryClient.invalidateQueries('student-recommend-topic')
  })
}
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Đề tài sinh viên đăng ký</div>
    <v-card class="pa-3 h-full" color="white" variant="flat">
      <div class="d-flex items-center">
        <v-spacer />
        <v-btn icon size="x-small" variant="text" @click="refetch()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </div>
      <div class="mt-2 h-[calc(100%_-_45px)] overflow-y-hidden">
        <v-data-table-virtual class="h-full" fixed-header :headers="headers" :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.gv="{ item }">
            <span>{{ item.teacher?.hodem }} {{ item.teacher?.ten }}</span>
          </template>
          <template #item.sv="{ item }">
            <span>{{ item.student?.hodem }} {{ item.student?.ten }}</span>
          </template>
          <template #item.status="{ item }">
            <div v-if="item.status == 'pending'" class="d-flex">
              <v-dialog min-width="500" width="50%">
                <template #activator="{ props: activatorProps }">
                  <v-chip color="info" size="small" variant="flat" v-bind="activatorProps">Chờ duyệt</v-chip>
                </template>
                <template #default="{ isActive }">
                  <create-topic :item="item" @cancel="isActive.value = false" @success="onSuccess(item)" />
                </template>
              </v-dialog>
              <v-spacer />
              <v-dialog min-width="500" width="50%">
                <template #activator="{ props: activatorProps }">
                  <v-chip color="error" size="small" variant="flat" v-bind="activatorProps">Từ chối</v-chip>
                </template>
                <template #default="{ isActive }">
                  <reject-recommend-topic :item="item" @cancel="isActive.value = false" @success="refetch" />
                </template>
              </v-dialog>
            </div>
            <div v-else>
              <v-chip :color="topicStatus.statusColor(item.status)" size="small" variant="flat">
                {{ topicStatus.statusType(item.status) }}
              </v-chip>
            </div>
          </template>
        </v-data-table-virtual>
      </div>
    </v-card>
  </div>
</template>
