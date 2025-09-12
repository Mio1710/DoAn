<script setup lang="ts">
import { useQueryClient } from 'vue-query'
import useTeacherGetStudentTopics from '~/composables/teacher/use-teacher-get-student-topic'
import ResultDetail from '~/components/teacher/student/organism/ResultDetail.vue'
import ReportDetail from '~/components/teacher/student/organism/ReportDetail.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['is-admin'],
})
const redirect = (id) => {
  navigateTo(`review-point/${id}`)
}
const headers = [
  {
    title: 'STT',
    align: 'center',
    sortable: false,
    key: 'index',
    width: 50,
  },
  { title: 'Tên sinh viên', key: 'ten', width: '15%', minWidth: 150 },
  { title: 'MSSV', key: 'maso', width: '10%', minWidth: 100 },
  { title: 'Lớp', key: 'lop', width: '15%', minWidth: 150 },
  { title: 'Nhóm', key: 'nhom', width: '5%', minWidth: 50 },
  { title: 'Đề tài', key: 'topic' },
  { title: 'Nhập điểm', key: 'action', width: 150, sortable: false, align: 'center' },
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

const { items, totalItems, isLoading, refetch } = useTeacherGetStudentTopics(queryBuilder)
</script>

<template>
  <div class="d-flex flex-column flex-grow-1 h-full">
    <div class="text-lg font-bold text-uppercase">Sinh viên khóa luận</div>
    <v-card class="pa-3 pt-0 h-full" color="white" variant="flat">
      <div class="mt-2">
        <div class="d-flex">
          <v-spacer />
          <v-btn icon size="x-small" variant="text" @click="refetch()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
        <v-data-table :headers="headers" hide-default-footer :items="items">
          <template #item.index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #item.ten="{ item }">
            <span>{{ item.hodem + ' ' + item.ten }}</span>
          </template>

          <template #item.nhom="{ item }">
            <span>{{ item.studentTopic[0]?.group_id }}</span>
          </template>

          <template #item.topic="{ item }">
            <span>{{ item.studentTopic[0]?.topic.ten }}</span>
          </template>

          <template #item.action="{ item }">
            <v-dialog min-width="800" width="80%">
              <template #activator="{ props: activatorProps }">
                <v-btn rounded variant="text" v-bind="activatorProps">
                  <v-icon color="success">mdi-eye</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <report-detail :item="item" @cancel="isActive.value = false" @success="refetch" />
              </template>
            </v-dialog>
            <v-dialog min-width="800" width="80%">
              <template #activator="{ props: activatorProps }">
                <v-btn rounded variant="text" v-bind="activatorProps">
                  <v-icon color="success">mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template #default="{ isActive }">
                <result-detail :item="item" @cancel="isActive.value = false" @success="refetch" />
              </template>
            </v-dialog>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
